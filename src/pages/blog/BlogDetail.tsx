import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const foundPost = posts.find((p: BlogPost) => p.id === id);
      if (foundPost) {
        setPost({
          ...foundPost,
          createdAt: new Date(foundPost.createdAt)
        });
      }
    }
  }, [id]);

  if (!post) return <div>投稿が見つかりませんでした</div>;

  return (
    <div className="blog-detail">
      <Link to="/" className="back-button">← 一覧に戻る</Link>

      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
        </div>
        <div className="post-content">{post.content}</div>

        <div className="post-actions">
          <Link to={`/blog/edit/${post.id}`} className="edit-button">
            編集する
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
