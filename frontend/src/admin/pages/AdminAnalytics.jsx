import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { getDashboardData } from "../../api/adminApi";


const AdminAnalytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();

      setDashboardData(res.data); // ✅ correct
    } catch (err) {
      console.error("Failed to load dashboard analytics:", err);
      setError(err?.response?.data?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

  if (loading) {
    return (
      <div data-testid="admin-analytics-page" className="py-20 text-center text-slate-400">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="admin-analytics-page" className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  const { topPosts = [], engagementBreakdown = [], monthlyActivity = [] } = dashboardData || {};


  return (
    <div data-testid="admin-analytics-page" className="space-y-6">
      <div>
        <h1 data-testid="admin-analytics-heading" className="text-3xl font-bold text-slate-800">Analytics & Trends</h1>
        <p className="text-slate-500 mt-2">
          Monitor performance across posts, engagement, and monthly growth.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div data-testid="admin-analytics-posts-chart" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-5">Top Performing Posts</h2>
          {topPosts.length > 0 ? (
            <BarChart data={topPosts} />
          ) : (
            <p className="text-sm text-slate-400">No post data yet.</p>
          )}
        </div>

        <div data-testid="admin-analytics-engagement-chart" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-5">Engagement Breakdown</h2>
          {engagementBreakdown.length > 0 ? (
            <PieChart data={engagementBreakdown} />
          ) : (
            <p className="text-sm text-slate-400">No engagement data yet.</p>
          )}
        </div>

        <div data-testid="admin-analytics-monthly-chart" className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-5">Monthly Activity</h2>
          {monthlyActivity.length > 0 ? (
            <LineChart data={monthlyActivity} />
          ) : (
            <p className="text-sm text-slate-400">No activity data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
