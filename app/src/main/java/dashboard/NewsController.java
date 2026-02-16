package dashboard;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class NewsController {

    private final RssService rssService;

    public NewsController(RssService rssService) {
        this.rssService = rssService;
    }

    // Allow React (running on port 5173) to get data
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/news")
    public List<Article> getNews() {
        return rssService.getAllArticles();
    }
}