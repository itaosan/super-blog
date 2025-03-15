import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ブログ投稿の型定義
interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

const BlogPostForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // フォームの状態管理
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const post = posts.find((p: BlogPost) => p.id === id);
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          setTags(post.tags.join(', '));
        }
      }
    }
  }, [isEdit, id]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ローカルストレージから既存の投稿を取得する関数
  const getLocalPosts = (): BlogPost[] => {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  };

  // ローカルストレージに投稿を保存する関数
  const saveLocalPost = (post: BlogPost) => {
    const posts = getLocalPosts();
    posts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  };

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 入力バリデーション
    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    if (!content.trim()) {
      setError('内容を入力してください');
      return;
    }

    // エラーをクリア
    setError(null);

    // 新しい投稿を作成
    const newPost: BlogPost = {
      id: Date.now().toString(), // 一意のIDとして現在のタイムスタンプを使用
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
      createdAt: new Date(),
    };

    // ローカルストレージに保存
    saveLocalPost(newPost);

    // 成功メッセージを表示
    setSuccess(true);

    // フォームをリセット
    setTitle('');
    setContent('');
    setTags('');

    // 3秒後にホームページに遷移
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="blog-post-form">
      <h2>新しい記事を投稿</h2>

      {error && <div className="error-message">{error}</div>}

      {success && (
        <div className="success-message">
          記事が投稿されました！ホームページにリダイレクトします...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="記事のタイトルを入力"
            disabled={success}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="記事の内容を入力"
            rows={10}
            disabled={success}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">タグ（カンマ区切り）</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="タグ1, タグ2, タグ3"
            disabled={success}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            disabled={success}
          >
            キャンセル
          </button>
          <button type="submit" disabled={success}>
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;
