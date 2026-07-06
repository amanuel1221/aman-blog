import { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import TopPostsTable from "../components/TopPostsTable";
import { getPosts, deletePost } from "../../api/postApi";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await getPosts(1, 1000);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError(err?.response?.data?.message || "We encountered an issue updating your article directory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const stats = useMemo(() => {
    const safePosts = posts || [];

    return {
      totalPosts: safePosts.length,
      totalViews: safePosts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalComments: safePosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0),
    };
  }, [posts]);

  const handleCreateClick = () => {
    navigate("/admin/posts/create");
  };

  const handleEditPost = (postId) => {
    navigate(`/admin/posts/edit/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to permanently delete this article? This action cannot be undone.")) return;

    setDeletingId(postId);
    try {
      await deletePost(postId);
      setPosts((current) => current.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert(err?.response?.data?.message || "Failed to finalize content removal. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Reusable styling parameters
  const skeletonCardBase = "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 animate-pulse";

  return (
    <main data-testid="admin-posts-page" className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-10">

      {/* Dynamic Header Frame */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6">
        <div className="space-y-1.5">
          <h1
            data-testid="admin-posts-heading"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            Content Studio
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            Manage your published articles, refine search optimization settings, and audit metrics from your layout repository.
          </p>
        </div>

        <button
          type="button"
          data-testid="admin-create-post-button"
          aria-label="Create a new blog article write-up"
          onClick={handleCreateClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-blue-700 active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </button>
      </header>

      {/* Platform Activity Metric Section */}
      <section aria-label="Content Directory Benchmarks">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className={skeletonCardBase}><div className="h-3 w-16 bg-slate-200 rounded" /><div className="h-8 w-24 bg-slate-200 rounded" /></div>
            <div className={skeletonCardBase}><div className="h-3 w-16 bg-slate-200 rounded" /><div className="h-8 w-24 bg-slate-200 rounded" /></div>
            <div className={skeletonCardBase}><div className="h-3 w-16 bg-slate-200 rounded" /><div className="h-8 w-24 bg-slate-200 rounded" /></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Published Posts" value={stats.totalPosts} type="posts" />
            <StatCard title="Total Views" value={stats.totalViews} type="views" />
            <StatCard title="Total Comments" value={stats.totalComments} type="comments" />
          </div>
        )}
      </section>

      {/* Primary Repository Data Table Frame */}
      <section aria-label="Published Articles Catalog" className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/40">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Published Articles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review platform exposure indexes or make inline content revisions.
            </p>
          </div>

          {!loading && !error && (
            <span 
              data-testid="posts-count-badge"
              className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs"
            >
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div data-testid="table-loading-state" className="py-24 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Synchronizing catalog parameters...</p>
            </div>
          ) : error ? (
            <div data-testid="table-error-state" className="py-20 text-center max-w-sm mx-auto p-4 space-y-2">
              <div className="text-red-500 bg-red-50 inline-flex p-2.5 rounded-full mb-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <p className="text-sm font-semibold text-slate-800">Failed to pull content library</p>
              <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
            </div>
          ) : posts.length > 0 ? (
            <TopPostsTable
              posts={posts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              deletingId={deletingId}
            />
          ) : (
            <div data-testid="table-empty-state" className="py-24 text-center max-w-md mx-auto p-4 space-y-3">
              <div className="text-slate-300 bg-slate-50 inline-flex p-3 rounded-full border border-slate-100">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Your Content Library is Empty</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  There are no registered posts found on this cluster instance. Let's draft your first publication!
                </p>
              </div>
              <button
                type="button"
                onClick={handleCreateClick}
                className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2 bg-blue-50 hover:bg-blue-100/60 px-3 py-1.5 rounded-lg transition duration-150"
              >
                Draft First Article &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminPosts;