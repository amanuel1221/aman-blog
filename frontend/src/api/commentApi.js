import api from "./axios";

const getComments = (postId) => api.get(`/api/posts/${postId}/comments`);

const createComment = (postId, content, parentCommentId = null) =>
  api.post(`/api/posts/${postId}/comments`, { content, parentCommentId });

const updateComment = (commentId, content) =>
  api.put(`/api/comments/${commentId}`, { content });

const deleteComment = (commentId) => api.delete(`/api/comments/${commentId}`);

const likeComment = (commentId) => api.post(`/api/comments/${commentId}/like`);

const dislikeComment = (commentId) => api.post(`/api/comments/${commentId}/dislike`);

export {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
};