import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPostById, updatePost } from "../../api/postApi";
import MarkdownEditor from "../components/MarkdownEditor";

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

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setServerError("");

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
        console.error("Failed to load post:", err);
        setServerError("Failed to load post. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const validate = () => {
    const err = {};

    if (!form.title.trim()) {
      err.title = "Title is required";
    }

    if (!form.category.trim()) {
      err.category = "Category is required";
    }

    if (!form.content.trim()) {
      err.content = "Content is required";
    }

    if (form.content.trim() && form.content.trim().length < 150) {
      err.content = `Content must be at least 150 characters (currently ${form.content.trim().length})`;
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("excerpt", form.excerpt.trim());
      formData.append("content", form.content.trim());
      formData.append("category", form.category.trim());

      const parsedTags = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (parsedTags.length > 0) {
        formData.append("tags", JSON.stringify(parsedTags));
      }

      if (coverImageFile) {
        formData.append("coverImage", coverImageFile);
      }

      await updatePost(id, formData);

      navigate("/admin/posts");
    } catch (err) {
      console.error("Update post failed:", err);
      setServerError(
        err.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="loading-state" className="flex min-h-[400px] flex-col items-center justify-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="animate-pulse font-medium text-slate-500">
          Loading post details...
        </p>
      </div>
    );
  }

  const baseInputStyles = `w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500`;
  const errorInputStyles = `border-red-300 focus:border-red-500 focus:ring-red-500/20`;

  return (
    <main className="mx-auto max-w-4xl rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <header className="mb-6 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Edit Post
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Modify your post settings, images, and content metadata.
        </p>
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
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            role="alert"
          >
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              <p data-testid="error-title" className="mt-1 text-xs font-medium text-red-600">
                {errors.title}
              </p>
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
              <p data-testid="error-category" className="mt-1 text-xs font-medium text-red-600">
                {errors.category}
              </p>
            )}
          </div>
        </div>

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

        <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <header>
            <h2 className="text-sm font-semibold text-slate-700">
              Cover Image
            </h2>
            <p className="text-xs text-slate-400">
              Accepted resolutions are PNG, JPEG, JPG, and WebP.
            </p>
          </header>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {(coverImagePreview || existingCoverUrl) && (
              <img
                src={coverImagePreview || existingCoverUrl}
                alt="Post cover preview"
                data-testid="image-preview"
                className="h-28 w-44 rounded-lg border border-slate-300 bg-white object-cover shadow-sm"
              />
            )}

            <div className="w-full sm:w-auto">
              <input
                ref={fileInputRef}
                id="coverImage"
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/webp"
                onChange={handleImageChange}
                disabled={saving}
                data-testid="input-file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-300"
              />
            </div>
          </div>
        </section>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              Body Content <span className="text-red-500">*</span>
            </label>

            <span className="text-xs text-slate-400">
              Min 150 chars ({form.content.trim().length})
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <MarkdownEditor
              value={form.content}
              onChange={(content) => {
                setForm((prev) => ({
                  ...prev,
                  content,
                }));

                if (errors.content) {
                  setErrors((prev) => ({
                    ...prev,
                    content: "",
                  }));
                }
              }}
            />
          </div>

          {errors.content && (
            <p data-testid="error-content" className="mt-1 text-xs font-medium text-red-600">
              {errors.content}
            </p>
          )}
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/posts")}
            disabled={saving}
            data-testid="btn-cancel"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition duration-150 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            data-testid="btn-submit"
            className="flex min-w-[120px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {saving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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