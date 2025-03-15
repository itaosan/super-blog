import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BlogPostForm from './pages/blog/BlogPostForm';
import BlogDetail from './pages/blog/BlogDetail';
import BlogList from './components/blog/BlogList';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h1>Super Blog</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">ホーム</Link>
              </li>
              <li>
                <Link to="/blog/new">新規投稿</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/new" element={<BlogPostForm />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blog/edit/:id" element={<BlogPostForm isEdit={true} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Super Blog</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// ホームページコンポーネント
function Home() {
  return (
    <div className="home">
      <div className="welcome-section">
        <h2>Welcome to Super Blog!</h2>
        <p>
          ここは最高のブログプラットフォームです。あなたの考えやアイデアを世界に共有しましょう。
        </p>
        <div className="cta-button">
          <Link to="/blog/new">新しい記事を投稿する</Link>
        </div>
      </div>

      <div className="blog-list-section">
        <BlogList />
      </div>
    </div>
  );
}

export default App;
