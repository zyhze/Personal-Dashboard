import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// This connects the React 'App' component to the 'root' div in your index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)