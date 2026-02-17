function NewsItem({ article }) {
  return (
    <div style={{ 
      backgroundColor: 'white',
      padding: '20px', 
      borderRadius: '12px',
      marginBottom: '16px',
      border: '1px solid #e2e8f0',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}
    // Adding a subtle hover lift
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    }}
    >
      <div style={{ marginBottom: '8px' }}>
        <a href={article.link} target="_blank" rel="noreferrer" style={{ 
          color: '#1e293b', 
          fontWeight: '700', 
          textDecoration: 'none',
          fontSize: '1.15rem',
          display: 'block'
        }}>
          {article.title}
        </a>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ 
          color: '#3b82f6', 
          fontSize: '13px', 
          fontWeight: 'bold', 
          letterSpacing: '0.5px' 
        }}>
          {article.source.toUpperCase()}
        </span>
        <span style={{ color: '#94a3b8', fontSize: '13px' }}>•</span>
        <span style={{ color: '#64748b', fontSize: '13px' }}>
          {new Date(article.publishedDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default NewsItem;