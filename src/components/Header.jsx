import React from 'react';

function Header({ setCurrentPage }) {
  return (
    <header className="bg-yellow-400 text-purple-800 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('feed')}>GenZ Social</h1>
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setCurrentPage('feed')} className="hover:text-purple-600">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('create')} className="hover:text-purple-600">
              Create Post
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

