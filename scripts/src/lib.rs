use chrono::Utc;
use color_eyre::Result;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::path::PathBuf;

/// Returns the current date formatted as YYYY-MM-DD.
pub fn get_current_date() -> String {
    Utc::now().format("%Y-%m-%d").to_string()
}

/// Information about a file to be created in the content directory.
pub struct FileInfo {
    /// The directory where the file will be created (src/content/writing)
    pub directory_path: PathBuf,
    /// The full path to the file
    pub filepath: PathBuf,
    /// The filename only
    pub filename: String,
}

/// Constructs file information for a blog post based on date and slug.
///
/// # Arguments
/// * `date` - The date in YYYY-MM-DD format
/// * `slug` - The URL-friendly slug for the post
///
/// # Returns
/// A `FileInfo` struct containing the directory path, full filepath, and filename.
pub fn get_file_info(date: String, slug: String) -> Result<FileInfo> {
    let current_dir = std::env::current_dir()?;

    let filename = format!("{}--{}.mdx", date, slug);
    let directory_path = current_dir.join("src").join("content").join("writing");
    let filepath = directory_path.join(&filename);

    Ok(FileInfo {
        directory_path,
        filepath,
        filename,
    })
}

/// Reads a file line by line.
///
/// # Arguments
/// * `filename` - Path to the file to read
///
/// # Returns
/// An iterator over the lines of the file, or an IO error if the file cannot be opened.
pub fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;

    #[test]
    fn test_get_current_date_format() {
        let date = get_current_date();

        // Check length (YYYY-MM-DD = 10 characters)
        assert_eq!(date.len(), 10);

        // Check format using regex-like pattern
        let parts: Vec<&str> = date.split('-').collect();
        assert_eq!(parts.len(), 3);
        assert_eq!(parts[0].len(), 4); // Year
        assert_eq!(parts[1].len(), 2); // Month
        assert_eq!(parts[2].len(), 2); // Day

        // Ensure all parts are numeric
        assert!(parts[0].parse::<u32>().is_ok());
        assert!(parts[1].parse::<u32>().is_ok());
        assert!(parts[2].parse::<u32>().is_ok());
    }

    #[test]
    fn test_get_file_info_path_construction() {
        let date = "2024-01-15".to_string();
        let slug = "test-post".to_string();

        let result = get_file_info(date.clone(), slug.clone());
        assert!(result.is_ok());

        let file_info = result.unwrap();

        // Check filename format
        assert_eq!(file_info.filename, "2024-01-15--test-post.mdx");

        // Check that directory path ends with src/content/writing
        assert!(file_info.directory_path.ends_with("src/content/writing"));

        // Check that filepath is directory + filename
        assert_eq!(file_info.filepath, file_info.directory_path.join(&file_info.filename));

        // Check filepath ends with the expected filename
        assert!(file_info.filepath.ends_with("2024-01-15--test-post.mdx"));
    }

    #[test]
    fn test_get_file_info_with_special_characters() {
        let date = "2024-12-31".to_string();
        let slug = "hello-world-123".to_string();

        let result = get_file_info(date, slug);
        assert!(result.is_ok());

        let file_info = result.unwrap();
        assert_eq!(file_info.filename, "2024-12-31--hello-world-123.mdx");
    }

    #[test]
    fn test_read_lines_success() {
        // Create a temporary file with test content
        let mut temp_file = NamedTempFile::new().expect("Failed to create temp file");
        writeln!(temp_file, "line 1").expect("Failed to write");
        writeln!(temp_file, "line 2").expect("Failed to write");
        writeln!(temp_file, "line 3").expect("Failed to write");

        let path = temp_file.path();
        let result = read_lines(path);

        assert!(result.is_ok());

        let lines: Vec<String> = result
            .unwrap()
            .map(|l| l.expect("Failed to read line"))
            .collect();

        assert_eq!(lines.len(), 3);
        assert_eq!(lines[0], "line 1");
        assert_eq!(lines[1], "line 2");
        assert_eq!(lines[2], "line 3");
    }

    #[test]
    fn test_read_lines_empty_file() {
        let temp_file = NamedTempFile::new().expect("Failed to create temp file");
        let path = temp_file.path();

        let result = read_lines(path);
        assert!(result.is_ok());

        let lines: Vec<String> = result
            .unwrap()
            .map(|l| l.expect("Failed to read line"))
            .collect();

        assert_eq!(lines.len(), 0);
    }

    #[test]
    fn test_read_lines_nonexistent_file() {
        let result = read_lines("/path/that/does/not/exist.txt");
        assert!(result.is_err());

        let err = result.unwrap_err();
        assert_eq!(err.kind(), io::ErrorKind::NotFound);
    }

    #[test]
    fn test_read_lines_with_unicode() {
        let mut temp_file = NamedTempFile::new().expect("Failed to create temp file");
        writeln!(temp_file, "Hello 世界").expect("Failed to write");
        writeln!(temp_file, "Café ☕").expect("Failed to write");

        let path = temp_file.path();
        let result = read_lines(path);

        assert!(result.is_ok());

        let lines: Vec<String> = result
            .unwrap()
            .map(|l| l.expect("Failed to read line"))
            .collect();

        assert_eq!(lines.len(), 2);
        assert_eq!(lines[0], "Hello 世界");
        assert_eq!(lines[1], "Café ☕");
    }
}
