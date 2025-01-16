// components/Header.js
import React from 'react';
import { API_KEY } from '../utilis/constant';

const Header = ({ setCurrentPage, user, setUser }) => {
  const handleLogout = async () => {
    try {
      await fetch(`${API_KEY}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      setCurrentPage('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-purple-800 cursor-pointer" 
          onClick={() => setCurrentPage('feed')}
        >
          Your App Name
        </h1>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.firstName}!</span>
              <button
                onClick={() => setCurrentPage('create')}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 flex items-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                Create Post
              </button>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover:text-purple-700"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;