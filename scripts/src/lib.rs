use chrono::{
    format::{DelayedFormat, StrftimeItems},
    DateTime, Utc,
};
use color_eyre::{Report, Result};
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::path::PathBuf;

pub fn get_current_date<'a>() -> DelayedFormat<StrftimeItems<'a>> {
    let now: DateTime<Utc> = Utc::now();
    now.format("%Y-%m-%d")
}

pub enum ContentType {
    Garden,
    Writing,
}

pub fn get_file_info(
    date: String,
    slug: String,
    content_type: ContentType,
) -> Result<(PathBuf, PathBuf, String), Report> {
    let current_dir = std::env::current_dir()?;
    let content_dir = match content_type {
        ContentType::Garden => String::from("garden"),
        ContentType::Writing => String::from("writing"),
    };

    let filename = format!("{}--{}.mdx", date, slug);
    let directory_path = current_dir.join("src").join("content").join(content_dir);
    let filepath = directory_path.join(&filename);

    Ok((directory_path, filepath, filename))
}

pub fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
