import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Auth from './components/Auth';
import { api } from './api';

function App() {
  const [currentPage, setCurrentPage] = useState('feed');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await api.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (newPost) => {
    try {
      const createdPost = await api.createPost(newPost.content);
      setPosts([createdPost, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.likePost(postId);
      fetchPosts(); // Refetch posts to get updated like count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, content) => {
    try {
      await api.commentOnPost(postId, content);
      fetchPosts(); // Refetch posts to get updated comments
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const userData = await api.login(credentials);
      setUser(userData);
      setCurrentPage('feed');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const newUser = await api.register(userData);
      setUser(newUser);
      setCurrentPage('feed');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
      setCurrentPage('auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {!user && currentPage === 'auth' ? (
          <Auth onLogin={handleLogin} onRegister={handleRegister} />
        ) : currentPage === 'feed' ? (
          <Feed posts={posts} onLike={handleLike} onComment={handleComment} />
        ) : (
          <CreatePost addPost={addPost} setCurrentPage={setCurrentPage} />
        )}
      </main>
    </div>
  );
}

export default App;

