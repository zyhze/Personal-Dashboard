package dashboard;

import java.util.Date;

// This 'record' creates a full class automatically.
public record Article(String title, String link, String source, Date publishedDate) {}