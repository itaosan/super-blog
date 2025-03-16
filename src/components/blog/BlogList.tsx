import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ブログ投稿の型定義
interface BlogPost {
       id: string;
       title: string;
       content: string;
       tags: string[];
       createdAt: Date;
}

const BlogList = () => {
       const [posts, setPosts] = useState<BlogPost[]>([]);

       // コンポーネントのマウント時にローカルストレージから投稿を取得
       useEffect(() => {
               const savedPosts = localStorage.getItem("blogPosts");
               if (savedPosts) {
                       // 日付文字列をDateオブジェクトに変換するための処理
                       const parsedPosts = JSON.parse(savedPosts).map((post: BlogPost) => ({
                               ...post,
                               createdAt: new Date(post.createdAt),
                       }));

                       // 投稿を日付の降順（新しい順）にソート
                       const sortedPosts = parsedPosts.sort(
                               (a: BlogPost, b: BlogPost) =>
                                       b.createdAt.getTime() - a.createdAt.getTime(),
                       );

                       setPosts(sortedPosts);
               }
       }, []);

       // 投稿がない場合のメッセージ
       if (posts.length === 0) {
               return (
                       <div className="blog-list-empty">
                               <h3>まだ投稿がありません</h3>
                               <p>新しい記事を投稿してみましょう！</p>
                               <div className="cta-button">
                                       <Link to="/blog/new">新しい記事を投稿する</Link>
                               </div>
                       </div>
               );
       }

       // 投稿内容を要約する関数（最初の100文字を表示）
       const summarizeContent = (content: string, maxLength = 100) => {
               if (content.length <= maxLength) return content;
               return `${content.substring(0, maxLength)}...`;
       };

       // 日付をフォーマットする関数
       const formatDate = (date: Date) => {
               return date.toLocaleDateString("ja-JP", {
                       year: "numeric",
                       month: "long",
                       day: "numeric",
                       hour: "2-digit",
                       minute: "2-digit",
               });
       };

       return (
               <div className="blog-list">
                       <h2>最新の投稿</h2>

                       <div className="blog-posts">
                               {posts.map((post) => (
                                       <article key={post.id} className="blog-post-card">
                                               <h3 className="post-title">{post.title}</h3>

                                               <div className="post-meta">
                                                       <span className="post-date">{formatDate(post.createdAt)}</span>
                                               </div>

                                               <p className="post-summary">{summarizeContent(post.content)}</p>

                                               {post.tags.length > 0 && (
                                                       <div className="post-tags">
                                                               {post.tags.map((tag) => (
                                                                       <span key={tag} className="tag">
                                                                               #{tag}
                                                                       </span>
                                                               ))}
                                                       </div>
                                               )}

                                               <div className="post-actions">
                                                       <button type="button" className="read-more">
                                                               続きを読む
                                                       </button>
                                                       <button
                                                               type="button"
                                                               className="delete-button"
                                                               onClick={() => {
                                                                       const updatedPosts = posts.filter((p) => p.id !== post.id);
                                                                       setPosts(updatedPosts);
                                                                       localStorage.setItem(
                                                                               "blogPosts",
                                                                               JSON.stringify(updatedPosts),
                                                                       );
                                                               }}
                                                       >
                                                               削除
                                                       </button>
                                               </div>
                                       </article>
                               ))}
                       </div>
               </div>
       );
};

export default BlogList;
