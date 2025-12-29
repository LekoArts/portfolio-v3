use color_eyre::Result;
use glob::glob;
use gray_matter::engine::YAML;
use gray_matter::Matter;
use serde::Deserialize;
use std::collections::HashSet;
use std::{env, fs, path::Path};
use titlecase::titlecase;

#[derive(Deserialize, Debug)]
struct FrontMatter {
    // The frontmatter also includes other properties, but I only care about the title
    title: String,
}

struct TitleCaseViolation {
    current_title: String,
    expected_title: String,
    relative_path: String,
}

/// Loads the ignore list from the ignore-title-case.txt file.
fn load_ignored_files(current_dir: &Path) -> Result<HashSet<String>> {
    let ignore_file_path = current_dir.join("scripts").join("ignore-title-case.txt");
    
    // If the file doesn't exist, return empty set
    if !ignore_file_path.exists() {
        return Ok(HashSet::new());
    }
    
    let contents = fs::read_to_string(ignore_file_path)?;
    Ok(contents.lines().map(|s| s.to_string()).collect())
}

/// Checks if a file's title is in correct title case.
/// Returns Some(violation) if the title is incorrect, None if correct.
fn check_file_title(
    path: &Path,
    matter: &Matter<YAML>,
    current_dir: &Path,
) -> Result<Option<TitleCaseViolation>> {
    let contents = fs::read_to_string(path)?;
    
    // Parse frontmatter
    let frontmatter = matter
        .parse_with_struct::<FrontMatter>(&contents)
        .ok_or_else(|| color_eyre::eyre::eyre!("Failed to parse frontmatter for {:?}", path))?;

    let title = frontmatter.data.title;
    let titlecase_title = titlecase(&title);

    // If titles don't match, we have a violation
    if title != titlecase_title {
        let relative_path = path
            .strip_prefix(current_dir)
            .unwrap_or(path)
            .display()
            .to_string();

        Ok(Some(TitleCaseViolation {
            current_title: title,
            expected_title: titlecase_title,
            relative_path,
        }))
    } else {
        Ok(None)
    }
}

fn main() -> Result<()> {
    color_eyre::install()?;
    let matter = Matter::<YAML>::new();

    let current_dir = env::current_dir()?;
    
    // Load ignored files once before the loop
    let ignored_files = load_ignored_files(&current_dir)?;
    
    // Glob pattern on all MDX files inside ./content
    let pattern = current_dir
        .join("src")
        .join("content")
        .join("**/*.mdx")
        .into_os_string()
        .into_string()
        .map_err(|_| color_eyre::eyre::eyre!("Invalid UTF-8 in path"))?;

    let mut violations = Vec::new();

    for entry in glob(&pattern).map_err(|e| color_eyre::eyre::eyre!("Failed to read glob pattern: {}", e))? {
        let path = match entry {
            Ok(p) => p,
            Err(e) => {
                eprintln!("Error processing glob entry: {}", e);
                continue;
            }
        };

        // Get the filename (without extension)
        let filename = match path.file_stem().and_then(|s| s.to_str()) {
            Some(name) => name,
            None => {
                eprintln!("Warning: Could not get filename for {:?}", path);
                continue;
            }
        };

        // Skip ignored files
        if ignored_files.contains(filename) {
            continue;
        }

        // Check the file's title
        match check_file_title(&path, &matter, &current_dir) {
            Ok(Some(violation)) => violations.push(violation),
            Ok(None) => {} // Title is correct
            Err(e) => eprintln!("Error checking file {:?}: {}", path, e),
        }
    }

    // Report violations
    if !violations.is_empty() {
        for violation in &violations {
            println!(
                r#"-----
{}
Path: {}"#,
                colored_diff::PrettyDifference {
                    expected: &violation.expected_title,
                    actual: &violation.current_title,
                },
                violation.relative_path
            );
        }

        println!(
            r#"
-----

Found {} titles that are not in title case"#,
            violations.len()
        );
    } else {
        println!("All titles are in title case");
    }

    Ok(())
}
