import { useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([
    { title: "Frontend is working! (Loading backend...)", link: "#", source: "System", publishedDate: new Date() }
  ]);

  useEffect(() => {
    fetch('http://localhost:8080/api/news')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => console.log("Backend not reached, using local fallback."));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2c3e50' }}>Market Dashboard</h1>
      <hr />
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <a href={article.link} target="_blank" style={{ fontSize: '1.2rem', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
            {article.title}
          </a>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '5px' }}>
            {article.source} • {new Date(article.publishedDate).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;