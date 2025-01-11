import React, { useState } from 'react';

function CreatePost({ addPost, setCurrentPage }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (trimmedContent) {
      addPost({ content: trimmedContent });
      setContent('');
      setCurrentPage('feed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="6"
          placeholder="What's on your mind?"
        />
        <button 
          type="submit" 
          className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!content.trim()}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

