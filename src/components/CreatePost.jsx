import React, { useState } from 'react';

function CreatePost({ addPost, setCurrentPage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle || !trimmedDescription) {
      console.log("Title and Description is required")
    }
      {
      addPost({ firstName: 'CurrentUser', title: trimmedTitle, description: trimmedDescription });
      setTitle('');
      setDescription('');
      setCurrentPage('feed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder='Title is required'/>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-4 px-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="6"
          placeholder="What's on your mind?"
        />
        <button 
          type="submit" 
          className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim()}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

