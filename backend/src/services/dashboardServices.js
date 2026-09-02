require('dotenv').config();
const Post = require("../models/Post");
const User = require("../models/User"); 
const Comment = require(("../models/comment"));
const ContactMessage= require("../models/contact");
const mongoose = require("mongoose");


const getDashboardStats = async () => {
  const [totalPosts, totalUsers, totalMessages, unreadMessages] =
    await Promise.all([
      Post.countDocuments(),
      User.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
    ]);

  const posts = await Post.find({}, "views likes commentsCount");

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  const totalLikes = posts.reduce(
    (sum, p) => sum + (p.likes?.length || 0),
    0
  );

  const totalComments = posts.reduce(
    (sum, p) => sum + (p.commentsCount || 0),
    0
  );

  return {
    totalPosts,
    totalUsers,
    totalMessages,
    unreadMessages,
    totalViews,
    totalLikes,
    totalComments,
  };
};

const getTopPosts = async () => {
  return Post.find()
    .sort({ views: -1 })
    .limit(5)
    .select("title slug views likes commentsCount createdAt");
};

const getRecentMessages = async () => {
  return ContactMessage.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("from_name email company message isRead createdAt");
};

const getEngagementBreakdown = async () => {
  const posts = await Post.find({}, "views likes commentsCount");

  const likes = posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
  const comments = posts.reduce(
    (sum, p) => sum + (p.commentsCount || 0),
    0
  );
  const views = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return [
    { name: "Likes", value: likes },
    { name: "Comments", value: comments },
    { name: "Views", value: views },
  ];
};

const getMonthlyActivity = async (year = new Date().getFullYear()) => {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31`);

  const activity = await Post.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        posts: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const monthMap = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // normalize output (fill missing months)
  const result = monthMap.map((name, index) => {
    const found = activity.find((a) => a._id === index + 1);

    return {
      month: name,
      posts: found ? found.posts : 0,
    };
  });

  return result;
};

const getUsers = async () => {
  const users = await User.find({}, "name email createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return users.map((user) => ({
    name: user.name,
    email: user.email,

    //  time
    joinedAt: new Date(user.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
};

module.exports = {
  getDashboardStats,
  getTopPosts,
  getRecentMessages,
  getEngagementBreakdown,
  getMonthlyActivity,
  getUsers,
};
