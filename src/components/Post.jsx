import React from "react";
import CommentSection from "./CommentSection";

function Post({ post, onLike, onComment }) {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const updatedDate = new Date(dateString);
    const diffInHours = Math.floor((now - updatedDate) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-800">{post.title}</h2>
        <span className="text-gray-500 text-sm">
          {formatTimeAgo(post.updatedAt)}
        </span>
      </div>
      <p className="text-gray-700">{post.description}</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={onLike}
          className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
        >
          {post.likes % 2 === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
          <span>{post.likes}</span>
        </button>
        <span className="text-gray-500">
          {Array.isArray(post.comments) ? post.comments.length : 0} Comments
        </span>
      </div>
      <CommentSection
        comments={Array.isArray(post.comments) ? post.comments : []}
        onComment={(updatedComments) => onComment(post.id, updatedComments)}
      />
    </div>
  );
}

export default Post;
