import React from 'react';
import Post from './Post';

function Feed({ posts, onLike, onComment }) {
  return (
    <div className="space-y-8">
      {posts.map(post => (
        <Post 
          key={post._id} 
          post={post} 
          onLike={() => onLike(post._id)}
          onComment={(comment) => onComment(post._id, comment)}
        />
      ))}
    </div>
  );
}

export default Feed;

