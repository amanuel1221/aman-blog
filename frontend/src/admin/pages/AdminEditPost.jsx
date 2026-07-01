import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dashboardData } from "../data/mockDashboardData";

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);
  const post = dashboardData.topPosts.find((item) => item.id === postId);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setExcerpt(post.excerpt || "");
      setCategory(post.category || "");
      setCoverImage(post.coverImage || "");
      setContent(post.content || "");
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/admin/posts");
  };

  if (!post) {
    return (
      <div data-testid="admin-edit-post-not-found" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2">We couldn't find a post with this ID. Please return to the posts dashboard.</p>
        <button
          type="button"
          onClick={() => navigate("/admin/posts")}
          className="mt-4 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Back to posts
        </button>
      </div>
    );
  }

  return (
    <div data-testid="admin-edit-post-page" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Edit Post</h1>
          <p className="text-slate-500 mt-2">
            Update post details and metadata before sending changes to the backend.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Post Title</span>
            <input
              data-testid="edit-post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <input
              data-testid="edit-post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Cover Image URL</span>
            <input
              data-testid="edit-post-coverimage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
            <p className="text-xs text-slate-400">Cloudinary integration for image uploads will be added later.</p>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Excerpt</span>
          <textarea
            data-testid="edit-post-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Content</span>
          <textarea
            data-testid="edit-post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">Changes are stored locally in this preview mode.</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700"
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditPost;
