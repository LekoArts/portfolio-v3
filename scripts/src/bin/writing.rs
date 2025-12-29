use color_eyre::{eyre::eyre, Result};
use dialoguer::{theme::ColorfulTheme, Confirm, Input, MultiSelect, Select};
use scripts::{get_current_date, get_file_info};
use serde::Serialize;
use slug::slugify;
use std::fs;
use titlecase::titlecase;

const TYPE_CHOICES: [&str; 3] = ["essay", "tutorial", "note"];
const TAGS_CHOICES: [&str; 7] = [
    "Web Development",
    "React",
    "Developer Tools",
    "Programming",
    "Self-Hosting",
    "General",
    "Outdoors",
];
const ICON_CHOICES: [&str; 9] = [
    "web-development",
    "react",
    "developer-tools",
    "programming",
    "self-hosting",
    "general",
    "ai",
    "outdoors",
    "travel",
];

const BODY_TEMPLATE: &str = r#"

Context: What are you talking about?
Relevance: Why should I care about that?
Application: How do I do it?

Learning goals => Assessment => Lesson Plan
"#;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Frontmatter {
    title: String,
    slug: String,
    description: String,
    date: String,
    last_updated: String,
    r#type: String,
    tags: Vec<String>,
    icon: String,
}

fn main() -> Result<()> {
    color_eyre::install()?;

    let theme = ColorfulTheme::default();
    let current_date = get_current_date();

    let title: String = Input::with_theme(&theme)
        .with_prompt("Title")
        .interact_text()?;

    let slug: String = Input::with_theme(&theme)
        .with_prompt("Slug")
        .default(slugify(&title))
        .interact_text()?;

    let description: String = Input::with_theme(&theme)
        .with_prompt("Description")
        .interact_text()?;

    let date: String = Input::with_theme(&theme)
        .with_prompt("Date")
        .default(current_date.to_string())
        .interact_text()?;

    let chosen_type = Select::with_theme(&theme)
        .with_prompt("Pick a type")
        .items(&TYPE_CHOICES)
        .interact()
        .map(|choice| TYPE_CHOICES[choice])?;

    let tags = MultiSelect::with_theme(&theme)
        .with_prompt("Choose your tags")
        .items(&TAGS_CHOICES)
        .interact()?
        .into_iter()
        .map(|tag_index| TAGS_CHOICES[tag_index]);

    let icon = Select::with_theme(&theme)
        .with_prompt("Pick an icon")
        .items(&ICON_CHOICES)
        .interact()
        .map(|choice| ICON_CHOICES[choice])?;

    let file_info = get_file_info(current_date.clone(), slug.clone())?;

    let fm = Frontmatter {
        title: titlecase(&title),
        slug,
        date,
        last_updated: current_date.clone(),
        description,
        r#type: chosen_type.to_string(),
        icon: icon.to_string(),
        tags: tags.map(|s| s.to_string()).collect::<Vec<String>>(),
    };

    let frontmatter = format!("---\n{}---", serde_yaml::to_string(&fm)?);

    println!(
        r#"
The file "{}" will be created with:

{}
    "#,
        file_info.filename, frontmatter
    );

    if !Confirm::with_theme(&theme)
        .with_prompt("Do you want to continue?")
        .interact()?
    {
        return Err(eyre!("Aborting..."));
    }

    let file_content = format!("{}{}", frontmatter, BODY_TEMPLATE);

    fs::write(&file_info.filepath, file_content)?;

    println!("Successfully created {}", file_info.filepath.display());

    Ok(())
}
