import React from 'react';
import CommentSection from './CommentSection';

function Post({ post, onLike, onComment }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-800">{post.title}</h2>
        <span className="text-gray-500 text-sm">2h ago</span>
      </div>
      <p className="text-gray-700">{post.content}</p>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onLike(post._id)}
          className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes}</span>
        </button>
        <span className="text-gray-500">{post.comments.length} Comments</span>
      </div>
      <CommentSection 
        comments={post.comments} 
        onComment={(content) => onComment(post._id, content)} 
      />
    </div>
  );
}

export default Post;

