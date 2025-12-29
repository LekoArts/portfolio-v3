use serde::Serialize;

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

#[test]
fn test_frontmatter_serialization() {
    let fm = Frontmatter {
        title: "Test Title".to_string(),
        slug: "test-slug".to_string(),
        description: "Test description".to_string(),
        date: "2024-01-15".to_string(),
        last_updated: "2024-01-15".to_string(),
        r#type: "essay".to_string(),
        icon: "web-development".to_string(),
        tags: vec!["React".to_string(), "Programming".to_string()],
    };

    let yaml = serde_yaml::to_string(&fm).expect("Failed to serialize");

    // Check that camelCase is used (our custom serde config)
    assert!(yaml.contains("lastUpdated"));
    assert!(!yaml.contains("last_updated"));

    // Check that type field is present (r#type raw identifier)
    assert!(yaml.contains("type: essay"));

    // Verify key values are serialized
    assert!(yaml.contains("title: Test Title"));
    assert!(yaml.contains("slug: test-slug"));
    assert!(yaml.contains("description: Test description"));
    assert!(yaml.contains("date:") && yaml.contains("2024-01-15"));
    assert!(yaml.contains("icon: web-development"));
}

#[test]
fn test_frontmatter_with_empty_tags() {
    let fm = Frontmatter {
        title: "Test".to_string(),
        slug: "test".to_string(),
        description: "desc".to_string(),
        date: "2024-01-15".to_string(),
        last_updated: "2024-01-15".to_string(),
        r#type: "note".to_string(),
        icon: "general".to_string(),
        tags: vec![],
    };

    let yaml = serde_yaml::to_string(&fm).expect("Failed to serialize");
    // Ensure empty tags serialize as empty array, not null
    assert!(yaml.contains("tags: []"));
}
