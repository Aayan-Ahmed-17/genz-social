import React, { useState } from 'react';

function Comment({ comment, onReply, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = (e) => {
    e.preventDefault();
    const trimmedReply = replyContent.trim();
    if (trimmedReply) {
      onReply({ author: 'CurrentUser', content: trimmedReply, replies: [] });
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`mt-4 ${depth > 0 ? 'border-l-2 border-purple-200 pl-4' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-purple-700">{comment.author}</h3>
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Reply
        </button>
      </div>
      <p className="text-gray-700 mt-1">{comment.content}</p>
      {showReplyForm && (
        <form onSubmit={handleSubmitReply} className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a reply..."
          />
          <button 
            type="submit" 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!replyContent.trim()}
          >
            Submit Reply
          </button>
        </form>
      )}
      {comment.replies && comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} onReply={(newReply) => onReply(newReply, index)} depth={depth + 1} />
      ))}
    </div>
  );
}

function CommentSection({ comments, onComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      const newCommentObj = { author: 'CurrentUser', content: trimmedComment, replies: [] };
      const updatedComments = [...(Array.isArray(comments) ? comments : []), newCommentObj];
      onComment(updatedComments);
      console.log('New comment added:', newCommentObj);
      console.log('Updated comments:', updatedComments);
      setNewComment('');
    }
  };

  const handleReply = (commentIndex, reply) => {
    const updatedComments = Array.isArray(comments) ? [...comments] : [];
    if (updatedComments[commentIndex]) {
      updatedComments[commentIndex].replies = [...(updatedComments[commentIndex].replies || []), reply];
    }
    onComment(updatedComments);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment 
            key={index} 
            comment={comment} 
            onReply={(reply) => handleReply(index, reply)}
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button 
          type="submit" 
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default CommentSection;

