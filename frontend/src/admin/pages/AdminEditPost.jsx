import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPostById, updatePost } from "../../api/postApi";

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    content: "",
  });

  const [existingCoverUrl, setExistingCoverUrl] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const [errors, setErrors] = useState({});

  // FETCH POST
  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPostById(id);
        const post = res.data.post;

        setForm({
          title: post.title || "",
          excerpt: post.excerpt || "",
          category: post.category || "",
          tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
          content: post.content || "",
        });

        setExistingCoverUrl(post.coverImage?.url || "");
      } catch (err) {
        setServerError("Failed to load post. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // VALIDATION
  const validate = () => {
    const err = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!form.category.trim()) err.category = "Category is required";
    if (!form.content.trim()) err.content = "Content is required";
    if (form.content.trim() && form.content.trim().length < 150) {
      err.content = `Content must be at least 150 characters (currently ${form.content.trim().length})`;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // CHANGE HANDLERS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("excerpt", form.excerpt.trim());
      formData.append("content", form.content.trim());
      formData.append("category", form.category.trim());

      const parsedTags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (parsedTags.length) {
        formData.append("tags", JSON.stringify(parsedTags));
      }

      if (coverImageFile) {
        formData.append("coverImage", coverImageFile);
      }

      await updatePost(id, formData);
      navigate("/admin/posts");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div 
        data-testid="loading-state" 
        className="flex flex-col items-center justify-center min-h-[400px] space-y-3"
      >
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading post details...</p>
      </div>
    );
  }

  // Input styles reusable configurations
  const baseInputStyles = "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500";
  const errorInputStyles = "border-red-300 focus:border-red-500 focus:ring-red-500/20";

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <header className="mb-6 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Edit Post</h1>
        <p className="text-sm text-slate-500 mt-1">Modify your post settings, images, and content metadata.</p>
      </header>

      <form 
        onSubmit={handleSubmit} 
        data-testid="admin-edit-post-form" 
        className="space-y-6"
        noValidate
      >
        {serverError && (
          <div 
            data-testid="server-error"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium"
            role="alert"
          >
            {serverError}
          </div>
        )}

        {/* Title Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              disabled={saving}
              placeholder="e.g., Understanding Modern React Architecture"
              data-testid="input-title"
              className={`${baseInputStyles} ${errors.title ? errorInputStyles : ""}`}
            />
            {errors.title && (
              <p data-testid="error-title" className="text-xs font-medium text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-semibold text-slate-700">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              disabled={saving}
              placeholder="e.g., Development"
              data-testid="input-category"
              className={`${baseInputStyles} ${errors.category ? errorInputStyles : ""}`}
            />
            {errors.category && (
              <p data-testid="error-category" className="text-xs font-medium text-red-600 mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Excerpt Section */}
        <div className="space-y-1.5">
          <label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">
            Excerpt / Summary
          </label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            value={form.excerpt}
            onChange={handleChange}
            disabled={saving}
            placeholder="Provide a short sentence summary for your card feeds..."
            data-testid="input-excerpt"
            className={baseInputStyles}
          />
        </div>

        {/* Tags Section */}
        <div className="space-y-1.5">
          <label htmlFor="tags" className="text-sm font-semibold text-slate-700">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            disabled={saving}
            placeholder="javascript, react, frontend (comma separated)"
            data-testid="input-tags"
            className={baseInputStyles}
          />
        </div>

        {/* Media Layout Segment */}
        <section className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
          <header>
            <h2 className="text-sm font-semibold text-slate-700">Cover Image</h2>
            <p className="text-xs text-slate-400">Accepted resolutions are PNG, JPEG, JPG, and WebP.</p>
          </header>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {(coverImagePreview || existingCoverUrl) && (
              <img
                src={coverImagePreview || existingCoverUrl}
                alt="Post layout visualization"
                data-testid="image-preview"
                className="h-28 w-44 rounded-lg object-cover border border-slate-300 bg-white shadow-sm"
              />
            )}
            <div className="w-full sm:w-auto">
              <input
                ref={fileInputRef}
                id="coverImage"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={saving}
                data-testid="input-file"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-slate-200 file:text-slate-700
                  hover:file:bg-slate-300 file:cursor-pointer transition duration-150"
              />
            </div>
          </div>
        </section>

        {/* Core Rich Content Area */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="content" className="text-sm font-semibold text-slate-700">
              Body Content <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400">
              Min 150 chars ({form.content.trim().length})
            </span>
          </div>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            disabled={saving}
            placeholder="Write your beautiful content right here..."
            rows={12}
            data-testid="input-content"
            className={`${baseInputStyles} font-sans resize-y ${errors.content ? errorInputStyles : ""}`}
          />
          {errors.content && (
            <p data-testid="error-content" className="text-xs font-medium text-red-600 mt-1">{errors.content}</p>
          )}
        </div>

        {/* Submission Management Panel */}
        <footer className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/admin/posts")}
            disabled={saving}
            data-testid="btn-cancel"
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition duration-150 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            data-testid="btn-submit"
            className="flex items-center justify-center min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold rounded-lg transition duration-150 shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Post"
            )}
          </button>
        </footer>
      </form>
    </main>
  );
};

export default AdminEditPost;