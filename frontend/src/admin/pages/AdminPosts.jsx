import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import TopPostsTable from "../components/TopPostsTable";
import { dashboardData } from "../data/mockDashboardData";

const AdminPosts = () => {
  const { topPosts: initialTopPosts } = dashboardData;
  const [posts, setPosts] = useState(initialTopPosts);
  const navigate = useNavigate();

  const stats = useMemo(
    () => ({
      totalPosts: posts.length,
      totalViews: posts.reduce((total, post) => total + post.views, 0),
      totalComments: posts.reduce((total, post) => total + post.comments, 0),
    }),
    [posts]
  );

  const handleCreateClick = () => {
    navigate("/admin/posts/create");
  };

  const handleEditPost = (postId) => {
    navigate(`/admin/posts/edit/${postId}`);
  };

  const handleDeletePost = (postId) => {
    setPosts((current) => current.filter((post) => post.id !== postId));
  };

  return (
    <div data-testid="admin-posts-page" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 data-testid="admin-posts-heading" className="text-3xl font-bold text-slate-800">Posts Management</h1>
          <p className="text-slate-500 mt-2">
            Review, edit, and manage your published content from a single place.
          </p>
        </div>

        <button
          type="button"
          data-testid="admin-create-post-button"
          aria-label="Create new admin post"
          onClick={handleCreateClick}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700"
        >
          Create New Post
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Published Posts" value={stats.totalPosts} type="posts" />
        <StatCard title="Total Views" value={stats.totalViews} type="views" />
        <StatCard title="Total Comments" value={stats.totalComments} type="comments" />
      </div>

      <div className="overflow-x-auto">
        <TopPostsTable posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} />
      </div>
    </div>
  );
};

export default AdminPosts;
