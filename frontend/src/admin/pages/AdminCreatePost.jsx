import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPost } from "../../api/postApi";
import MarkdownEditor from "../../admin/components/MarkdownEditor";

const AdminCreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const err = {};

    if (!title.trim() || title.trim().length < 5 || title.trim().length > 80) {
      err.title = "Title must be between 5 and 80 characters";
    }

    if (!excerpt.trim() || excerpt.trim().length > 170) {
      err.excerpt = "Excerpt is required and must be under 170 characters";
    }

    if (!content.trim() || content.trim().length < 150) {
      err.content = "Content is required and must be at least 150 characters";
    }

    if (!category.trim()) {
      err.category = "Category is required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleContentChange = (markdown) => {
    setContent(markdown);

    if (errors.content) {
      setErrors((prev) => ({
        ...prev,
        content: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("category", category.trim());

      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (parsedTags.length) {
        formData.append("tags", JSON.stringify(parsedTags));
      }

      if (coverImageFile) {
        formData.append("coverImage", coverImageFile);
      }

      await createPost(formData);

      navigate("/admin/posts");
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputBaseStyles = `w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-150 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60`;
  const inputErrorStyles = `border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10`;

  return (
    <main
      data-testid="admin-create-post-page"
      className="mx-auto max-w-4xl space-y-6 p-1"
    >
      <header className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Create New Post
        </h1>

        <p className="text-sm text-slate-500">
          Add a new blog post for review and publishing.
        </p>
      </header>

      {serverError && (
        <div
          data-testid="create-post-server-error"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        noValidate
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="post-title"
              className="text-sm font-semibold text-slate-700"
            >
              Post Title <span className="text-red-500">*</span>
            </label>

            <input
              id="post-title"
              type="text"
              disabled={saving}
              data-testid="create-post-title"
              value={title}
              onChange={handleInputChange(setTitle, "title")}
              placeholder="Enter post title (5-80 characters)"
              className={`${inputBaseStyles} ${
                errors.title ? inputErrorStyles : ""
              }`}
            />

            {errors.title && (
              <p
                data-testid="error-title"
                className="text-xs font-medium text-red-500"
              >
                {errors.title}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="post-category"
              className="text-sm font-semibold text-slate-700"
            >
              Category <span className="text-red-500">*</span>
            </label>

            <input
              id="post-category"
              type="text"
              disabled={saving}
              data-testid="create-post-category"
              value={category}
              onChange={handleInputChange(setCategory, "category")}
              placeholder="e.g., Engineering, Tutorials"
              className={`${inputBaseStyles} ${
                errors.category ? inputErrorStyles : ""
              }`}
            />

            {errors.category && (
              <p
                data-testid="error-category"
                className="text-xs font-medium text-red-500"
              >
                {errors.category}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 p-4 md:col-span-2">
            <label
              htmlFor="post-coverimage"
              className="text-sm font-semibold text-slate-700"
            >
              Cover Image
            </label>

            <input
              ref={fileInputRef}
              id="post-coverimage"
              type="file"
              disabled={saving}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              data-testid="create-post-coverimage"
              className="w-full text-sm text-slate-500 transition duration-150 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />

            {coverImagePreview && (
              <div className="relative mt-2 inline-block">
                <img
                  src={coverImagePreview}
                  alt="Cover layout visual preview"
                  data-testid="create-post-image-preview"
                  className="h-40 w-full max-w-sm rounded-xl border border-slate-200 object-cover shadow-sm"
                />
              </div>
            )}

            <p className="mt-1 text-xs text-slate-400">
              JPEG, PNG or WEBP up to 5MB. Optimizes via CDN on save.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="post-tags"
              className="text-sm font-semibold text-slate-700"
            >
              Tags{" "}
              <span className="text-xs font-normal text-slate-400">
                (comma separated)
              </span>
            </label>

            <input
              id="post-tags"
              type="text"
              disabled={saving}
              data-testid="create-post-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., react, javascript, architecture"
              className={inputBaseStyles}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="post-excerpt"
              className="text-sm font-semibold text-slate-700"
            >
              Excerpt <span className="text-red-500">*</span>
            </label>

            <span
              className={`text-xs ${
                excerpt.trim().length > 170
                  ? "font-medium text-red-500"
                  : "text-slate-400"
              }`}
            >
              {excerpt.trim().length}/170 max chars
            </span>
          </div>

          <textarea
            id="post-excerpt"
            disabled={saving}
            data-testid="create-post-excerpt"
            value={excerpt}
            onChange={handleInputChange(setExcerpt, "excerpt")}
            placeholder="Write a clear summary of the post for card listings..."
            rows={3}
            className={`${inputBaseStyles} resize-y ${
              errors.excerpt ? inputErrorStyles : ""
            }`}
          />

          {errors.excerpt && (
            <p
              data-testid="error-excerpt"
              className="text-xs font-medium text-red-500"
            >
              {errors.excerpt}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="post-content"
            className="text-sm font-semibold text-slate-700"
          >
            Body Content <span className="text-red-500">*</span>
          </label>

          <div
            className={`overflow-hidden rounded-xl border bg-white ${
              errors.content ? "border-red-300" : "border-slate-200"
            }`}
          >
            <MarkdownEditor value={content} onChange={handleContentChange} />
          </div>

          {errors.content && (
            <p
              data-testid="error-content"
              className="text-xs font-medium text-red-500"
            >
              {errors.content}
            </p>
          )}
        </div>

        <footer className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            data-testid="content-char-counter"
            className={`text-sm ${
              content.trim().length >= 150
                ? "font-medium text-emerald-600"
                : "text-slate-500"
            }`}
          >
            {content.trim().length} / 150 min characters required
          </p>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => navigate("/admin/posts")}
              data-testid="create-post-cancel"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition duration-150 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              data-testid="create-post-submit"
              className="inline-flex min-w-[110px] items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {saving ? (
                <>
                  <svg
                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>

                  Saving...
                </>
              ) : (
                "Save Post"
              )}
            </button>
          </div>
        </footer>
      </form>
    </main>
  );
};

export default AdminCreatePost;