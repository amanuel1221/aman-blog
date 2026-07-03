const adminDashboardService = require("../services/dashboardServices");

const getDashboard = async (req, res) => {
  try {
    const [stats, topPosts, recentMessages, engagementBreakdown, monthlyActivity] =
      await Promise.all([
        adminDashboardService.getDashboardStats(),
        adminDashboardService.getTopPosts(),
        adminDashboardService.getRecentMessages(),
        adminDashboardService.getEngagementBreakdown(),
        adminDashboardService.getMonthlyActivity(),
      ]);

    res.status(200).json({
      stats,
      topPosts,
      recentMessages,
      engagementBreakdown,
      monthlyActivity,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await adminDashboardService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopPosts = async (req, res) => {
  try {
    const posts = await adminDashboardService.getTopPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentMessages = async (req, res) => {
  try {
    const messages = await adminDashboardService.getRecentMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEngagement = async (req, res) => {
  try {
    const data = await adminDashboardService.getEngagementBreakdown();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyActivity = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();

    const data = await adminDashboardService.getMonthlyActivity(year);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await adminDashboardService.getUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


module.exports = {
  getDashboard,
  getStats,
  getTopPosts,
  getRecentMessages,
  getEngagement,
  getMonthlyActivity,
  getUsers,
};