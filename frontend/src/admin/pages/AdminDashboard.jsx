import { useEffect, useState } from "react";

// Services
import { getDashboardData } from "../services/dashboardService";

// Components
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import TopPostsTable from "../components/TopPostsTable";
import MessagesTable from "../components/MessagesTable";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard-page" className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 data-testid="admin-dashboard-heading" className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>

        <p className="text-slate-500 mt-2">
          Welcome back 👋 Here's what's happening with your blog today.
        </p>
      </div>

      {/* ===================== */}
      {/* Statistics */}
      {/* ===================== */}

      <section aria-labelledby="admin-dashboard-statistics-heading">
        <h2 id="admin-dashboard-statistics-heading" className="text-xl font-semibold text-slate-700 mb-5">Statistics</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Posts" value={dashboard.stats.totalPosts} type="posts" />
          <StatCard title="Total Users" value={dashboard.stats.totalUsers} type="users" />
          <StatCard title="Total Likes" value={dashboard.stats.totalLikes} type="likes" />
          <StatCard title="Total Comments" value={dashboard.stats.totalComments} type="comments" />
          <StatCard title="Total Views" value={dashboard.stats.totalViews} type="views" />
          <StatCard title="Contact Messages" value={dashboard.stats.totalMessages} type="messages" />
        </div>
      </section>

      {/* ===================== */}
      {/* Charts */}
      {/* ===================== */}

      <section aria-labelledby="admin-dashboard-analytics-heading">
        <h2 id="admin-dashboard-analytics-heading" className="text-xl font-semibold text-slate-700 mb-5">Analytics</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <BarChart data={dashboard.topPosts} />
            <PieChart data={dashboard.engagementBreakdown} />
          </div>

          <div className="space-y-6">
            <LineChart data={dashboard.monthlyActivity} />
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* Tables */}
      {/* ===================== */}

      <section aria-labelledby="admin-dashboard-content-heading" className="space-y-6">
        <h2 id="admin-dashboard-content-heading" className="sr-only">Dashboard content</h2>
        <TopPostsTable posts={dashboard.topPosts} />
        <MessagesTable messages={dashboard.recentMessages} />
      </section>
    </div>
  );
};

export default AdminDashboard;