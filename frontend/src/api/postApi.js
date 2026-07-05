import api from "./axios";


const getPosts = (page = 1, limit = 10, search = "", category = "") =>
  api.get(`/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);

const getPostBySlug = (slug) =>
  api.get(`/posts/${slug}`);

 const createPost = (data) =>
  api.post("/posts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

 const updatePost = (id, data) =>
  api.patch(`/posts/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

 const deletePost = (id) =>
  api.delete(`/posts/${id}`);


 const likePost = (id) =>
  api.post(`/posts/${id}/like`);

 const dislikePost = (id) =>
  api.post(`/posts/${id}/dislike`);

const viewPost = (id) =>
  api.post(`/posts/${id}/view`);

export {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  viewPost,
};