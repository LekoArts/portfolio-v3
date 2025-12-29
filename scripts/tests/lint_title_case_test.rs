use std::collections::HashSet;
use std::fs;
use std::io::Write;
use tempfile::NamedTempFile;

#[test]
fn test_ignore_file_reading() {
    // Create temporary ignore file
    let mut ignore_file = NamedTempFile::new().expect("Failed to create temp file");
    writeln!(ignore_file, "2021-04-05--what-is-a-digital-garden").expect("Failed to write");
    writeln!(ignore_file, "2022-02-10--replacing-ls-with-exa").expect("Failed to write");

    // Read lines into HashSet (the improved approach we'll use in refactoring)
    let lines = fs::read_to_string(ignore_file.path()).expect("Failed to read");
    let ignored: HashSet<&str> = lines.lines().collect();

    assert_eq!(ignored.len(), 2);
    assert!(ignored.contains("2021-04-05--what-is-a-digital-garden"));
    assert!(ignored.contains("2022-02-10--replacing-ls-with-exa"));
    assert!(!ignored.contains("not-in-file"));
}
