import React, { useState } from 'react';

function Comment({ comment }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-purple-700">{comment.author}</h3>
      </div>
      <p className="text-gray-700 mt-1">{comment.content}</p>
    </div>
  );
}

function CommentSection({ comments, onComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      onComment(trimmedComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button 
          type="submit" 
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default CommentSection;

