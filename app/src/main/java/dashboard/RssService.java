package dashboard;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.io.SyndFeedInput;
import org.xml.sax.InputSource; // [NEW] Standard Java XML class
import org.springframework.stereotype.Service;

import java.net.URL;
import java.io.InputStream;
import java.util.*;

@Service
public class RssService {
    
    private static final Map<String, String> RSS_FEEDS = Map.of(
        "Yahoo Finance", "https://finance.yahoo.com/news/rssindex",
        "Hacker News", "https://news.ycombinator.com/rss",
        "WSJ Markets", "https://feeds.a.dj.com/rss/RSSMarketsMain.xml"
    );

    public List<Article> getAllArticles() {
        List<Article> articles = new ArrayList<>();
        
        for (var entry : RSS_FEEDS.entrySet()) {
            String sourceName = entry.getKey();
            String feedUrl = entry.getValue();
            
            try {
                URL url = new URL(feedUrl);
                
                // [FIX] Open the stream manually and use InputSource
                // This replaces the deprecated new XmlReader(url)
                try (InputStream stream = url.openStream()) {
                    InputSource inputSource = new InputSource(stream);
                    var feed = new SyndFeedInput().build(inputSource);

                    for (SyndEntry e : feed.getEntries()) {
                        // Rome handles null dates gracefully, but good to check
                        Date date = e.getPublishedDate();
                        if (date == null) date = new Date(); // Fallback to "now" if missing

                        articles.add(new Article(
                            e.getTitle(), 
                            e.getLink(), 
                            sourceName, 
                            date
                        ));
                    }
                }
            } catch (Exception e) { 
                System.err.println("Error fetching " + sourceName + ": " + e.getMessage()); 
            }
        }
        
        // Sort by newest first
        articles.sort(Comparator.comparing(Article::publishedDate).reversed());
        return articles;
    }
}