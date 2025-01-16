import React, { useEffect, useState } from "react";
import Header from "./components/Header";
// import Login from './components/Login';
// import Register from './components/Register';
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import { API_KEY } from "./utilis/constant";

function App() {
  const [currentPage, setCurrentPage] = useState("feed");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

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

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(API_KEY + "/post")
      const json = await res.json()

      setPosts(json)
      console.log(API_KEY + '/post')
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
  
  // const handleLogout = () => {
  //   localStorage.removeItem('accessToken');
  //   setUser(null);
  //   setCurrentPage('login');
  // };

  // if (!user && currentPage !== 'register') {
  //   return <Login setUser={setUser} setCurrentPage={setCurrentPage} />;
  // }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
    //   <Header setCurrentPage={setCurrentPage} />
    //   <main className="container mx-auto px-4 py-8">
    //     {currentPage === "feed" ? (
    //       <Feed posts={posts} onLike={handleLike} onComment={handleComment} />
    //     ) : (
    //       <CreatePost addPost={addPost} setCurrentPage={setCurrentPage} />
    //     )}
    //   </main>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'feed' && <Feed posts={posts} setPosts={setPosts} user={user} onLike={handleLike}/>}
        {currentPage === 'create' && <CreatePost setPosts={setPosts} setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <Register setUser={setUser} setCurrentPage={setCurrentPage} />}
      </main>
    </div>
  );
}

export default App;
