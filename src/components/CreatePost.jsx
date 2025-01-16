// import React, { useState } from 'react';

// function CreatePost({ addPost, setCurrentPage }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const trimmedTitle = title.trim();
//     const trimmedDescription = description.trim();
//     if (!trimmedTitle || !trimmedDescription) {
//       console.log("Title and Description is required")
//     }
//       {
//       addPost({ firstName: 'CurrentUser', title: trimmedTitle, description: trimmedDescription });
//       setTitle('');
//       setDescription('');
//       setCurrentPage('feed');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
//       <h2 className="text-2xl font-bold mb-6 text-purple-800">Create a New Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder='Title is required'/>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full py-4 px-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           rows="6"
//           placeholder="What's on your mind?"
//         />
//         <button
//           type="submit"
//           className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={!title.trim()}
//         >
//           Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreatePost;

// components/CreatePost.js
import React, { useState } from "react";
import { API_KEY } from "../utilis/constant";

const CreatePost = ({ setPosts, posts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_KEY}/createpost`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to create post. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Create New Post
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
