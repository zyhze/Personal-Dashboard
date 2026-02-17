import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);
  
  // State for the text in the input box
  const [searchQuery, setSearchQuery] = useState("");
  // State for the actual filter being applied (Debounced)
  const [debouncedTerm, setDebouncedTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

  // EFFECT 1: Fetching Data
  useEffect(() => {
    fetch('http://localhost:8080/api/news')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLastFetched(new Date().toLocaleTimeString());
        setLoading(false);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  // EFFECT 2: Debounce Logic (The Resume Builder)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchQuery);
      setCurrentPage(1); // Reset page when search term actually changes
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup function: cancels the timer if user types again
  }, [searchQuery]);

  // Logic
  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / articlesPerPage);
  const currentItems = filtered.slice((currentPage-1)*articlesPerPage, currentPage*articlesPerPage);

  return (
    <div id="root">
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Market <span style={{ color: '#3b82f6' }}>Insight</span></h1>
          <p style={{ color: '#64748b' }}>Enterprise Financial Data Feed</p>
        </div>
        {lastFetched && <div className="status-badge">Live: Updated {lastFetched}</div>}
      </header>

      <input 
        className="search-input"
        placeholder="Search market news..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />

      <div style={{ marginTop: '30px' }}>
        {loading ? (
          // SKELETON STATE: Shows 5 shimmering boxes while loading
          [...Array(5)].map((_, i) => <div key={i} className="skeleton-box" />)
        ) : (
          currentItems.map((item, index) => (
            <NewsItem key={index} article={item} />
          ))
        )}
      </div>

      {!loading && (
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Prev</button>
          <span>PAGE {currentPage} OF {totalPages || 1}</span>
          <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;