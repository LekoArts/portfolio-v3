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

pub fn get_file_info(date: String, slug: String) -> Result<(PathBuf, PathBuf, String), Report> {
    let current_dir = std::env::current_dir()?;

    let filename = format!("{}--{}.mdx", date, slug);
    let directory_path = current_dir.join("src").join("content").join("writing");
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
