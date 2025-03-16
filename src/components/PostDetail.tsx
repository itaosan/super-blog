import React from 'react';

interface PostDetailProps {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  };
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p className="timestamp">{new Date(post.createdAt).toLocaleString()}</p>
      <div className="content">{post.content}</div>
    </div>
  );
};

export default PostDetail;
