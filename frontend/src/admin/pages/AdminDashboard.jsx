import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/adminApi";

import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import TopPostsTable from "../components/TopPostsTable";
import MessagesTable from "../components/MessagesTable";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({
    stats: {},
    topPosts: [],
    engagementBreakdown: [],
    monthlyActivity: [],
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardData();
        setDashboard(res.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        setError("We ran into trouble parsing today's metric sync. Please try again.");  
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  
  if (error) {
    return (
      <main 
        data-testid="admin-dashboard-error"
        className="flex min-h-[400px] flex-col items-center justify-center text-center p-6"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500 mb-4 shadow-sm">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Connection Interrupted</h2>
        <p className="text-sm text-slate-500 max-w-sm mt-1">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition duration-150"
        >
          Try Reloading
        </button>
      </main>
    );
  }

  if (loading) {
    return (
      <div 
        data-testid="admin-dashboard-loading"
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute w-full h-full border-4 border-slate-100 rounded-full" />
            <div className="absolute w-full h-full border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">Gathering system data</p>
            <p className="text-xs text-slate-400 animate-pulse">Calculating views, interactions, and feeds...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main data-testid="admin-dashboard-page" className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-10">
      {/* Header Panel */}
      <header className="flex flex-col gap-1.5 border-b border-slate-100 pb-5">
        <h1 data-testid="admin-dashboard-heading" className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm">
          Welcome back 👋 Here is a snapshot of your platform performance and active updates today.
        </p>
      </header>

      {/* Core Statistics Grid */}
      <section aria-labelledby="admin-dashboard-statistics-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="admin-dashboard-statistics-heading" className="text-lg font-bold text-slate-800">
            Platform Benchmarks
          </h2>
          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
            Real-time update
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Posts" value={dashboard.stats?.totalPosts || 0} type="posts" />
          <StatCard title="Total Users" value={dashboard.stats?.totalUsers || 0} type="users" />
          <StatCard title="Total Likes" value={dashboard.stats?.totalLikes || 0} type="likes" />
          <StatCard title="Total Comments" value={dashboard.stats?.totalComments || 0} type="comments" />
          <StatCard title="Total Views" value={dashboard.stats?.totalViews || 0} type="views" />
          <StatCard title="Contact Messages" value={dashboard.stats?.totalMessages || 0} type="messages" />
        </div>
      </section>

      {/* Modern Visual Analytics Split Grid */}
      <section aria-labelledby="admin-dashboard-analytics-heading" className="space-y-4">
        <h2 id="admin-dashboard-analytics-heading" className="text-lg font-bold text-slate-800">
          Growth & Engagement Metrics
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Analytics Track */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md/5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Top Performing Articles</h3>
              <BarChart data={dashboard.topPosts || []} />
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md/5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Audience Engagement Share</h3>
              <PieChart data={dashboard.engagementBreakdown || []} />
            </div>
          </div>

          {/* Right Analytics Track */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md/5 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Traffic Trends</h3>
            <div className="flex-1 min-h-[300px]">
              <LineChart data={dashboard.monthlyActivity || []} />
            </div>
          </div>
        </div>
      </section>

      {/* Managed Dynamic Data Tables */}
      <section aria-labelledby="admin-dashboard-content-heading" className="space-y-8">
        <h2 id="admin-dashboard-content-heading" className="text-lg font-bold text-slate-800">
          Recent Activity & Logs
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">High Traction Posts</h3>
            </div>
            <TopPostsTable posts={dashboard.topPosts || []} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">User Inquiries & Messages</h3>
            </div>
            <MessagesTable messages={dashboard.recentMessages || []} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;