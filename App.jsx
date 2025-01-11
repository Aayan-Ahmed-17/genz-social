import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import { getUserData } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('feed');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getUserData();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (localStorage.getItem('accessToken')) {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setCurrentPage('login');
  };

  if (!user && currentPage !== 'register') {
    return <Login setUser={setUser} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'feed' && <Feed posts={posts} setPosts={setPosts} user={user} />}
        {currentPage === 'create' && <CreatePost setPosts={setPosts} setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <Register setUser={setUser} setCurrentPage={setCurrentPage} />}
      </main>
    </div>
  );
}

export default App;

