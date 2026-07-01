import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: integrate with backend create-post endpoint and Cloudinary image upload
    navigate("/admin/posts");
  };

  return (
    <div data-testid="admin-create-post-page" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Create New Post</h1>
          <p className="text-slate-500 mt-2">
            Add a new blog post for review and publishing. This form will be connected to the backend later.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Post Title</span>
            <input
              data-testid="create-post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <input
              data-testid="create-post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Add a category"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Cover Image URL</span>
            <input
              data-testid="create-post-coverimage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter image URL or upload later"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
            <p className="text-xs text-slate-400">Cover image upload integration with Cloudinary will be added later.</p>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Excerpt</span>
          <textarea
            data-testid="create-post-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a short summary of the post"
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Content</span>
          <textarea
            data-testid="create-post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            rows={10}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">This form is not yet connected to the backend.</p>
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
              Save Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCreatePost;
