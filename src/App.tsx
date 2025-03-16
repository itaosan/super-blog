import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogList from "./components/blog/BlogList";
import BlogPostForm from "./pages/blog/BlogPostForm";

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
