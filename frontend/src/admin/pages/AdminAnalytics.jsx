import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { dashboardData } from "../data/mockDashboardData";

const AdminAnalytics = () => {
  const { topPosts, engagementBreakdown, monthlyActivity } = dashboardData;

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
          <BarChart data={topPosts} />
        </div>

        <div data-testid="admin-analytics-engagement-chart" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-5">Engagement Breakdown</h2>
          <PieChart data={engagementBreakdown} />
        </div>

        <div data-testid="admin-analytics-monthly-chart" className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-5">Monthly Activity</h2>
          <LineChart data={monthlyActivity} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
