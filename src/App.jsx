import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import { API_KEY } from "./utilis/constant";

function App() {
  const [currentPage, setCurrentPage] = useState("feed");
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(API_KEY + "/post")
      const json = await res.json()

      setPosts(json)
    }
    fetchPost()
  }, []);

  const addPost = (newPost) => {
    setPosts([
      { id: posts.length + 1, ...newPost, likes: 0, comments: [] },
      ...posts,
    ]);
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes % 2 === 0 ? post.likes + 1 : post.likes - 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId, updatedComments) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: updatedComments } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Header setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === "feed" ? (
          <Feed posts={posts} onLike={handleLike} onComment={handleComment} />
        ) : (
          <CreatePost addPost={addPost} setCurrentPage={setCurrentPage} />
        )}
      </main>
    </div>
  );
}

export default App;
