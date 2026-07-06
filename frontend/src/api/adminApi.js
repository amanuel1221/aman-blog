import api from "./axios";

const getDashboardData = () =>
  api.get("api/admin/dashboard");

const getDashboardStats = () =>
  api.get("api/admin/dashboard/stats");

const getTopPosts = () =>
  api.get("api/admin/dashboard/top-posts");

const getDashboardEngagement = () =>
  api.get("api/admin/dashboard/engagement");  

const getDashboardActivity = (year) =>
  api.get(`api/admin/dashboard/activity${year ? `?year=${year}` : ""}`);

const getUsers=()=>
    api.get("api/admin/getusers");

const getContactMessages = () =>
    api.get("api/admin/contact/messages");

const markMessageAsRead = (id) =>
    api.put(`api/admin/contact/messages/${id}/read`);

const markMessageAsUnread = (id) =>
    api.put(`api/admin/contact/messages/${id}/unread`);

const deleteMessage = (id) =>
    api.delete(`api/admin/contact/messages/${id}`);



export {
  getDashboardData,
  getDashboardStats,
  getTopPosts,
  getDashboardEngagement,
  getDashboardActivity,
  getUsers,
  getContactMessages,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage
};