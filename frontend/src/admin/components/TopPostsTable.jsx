import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

const TopPostsTable = ({ posts, onEditPost, onDeletePost }) => {
  const showActions = Boolean(onEditPost || onDeletePost);

  return (
    <div data-testid="top-posts-table" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Top Performing Posts
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Posts ranked by engagement and views.
        </p>
      </div>

      <div data-testid="top-posts-mobile-list" className="space-y-4 md:hidden">
        {posts.map((post) => (
          <div key={post.id} className="rounded-3xl border border-gray-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{post.title}</p>
                <p className="text-sm text-gray-500 overflow-hidden text-ellipsis max-h-12">{post.excerpt || "No excerpt available."}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Views</p>
                <p className="font-semibold text-slate-800">{formatNumber(post.views)}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Likes</p>
                <p className="font-semibold text-slate-800">{formatNumber(post.likes)}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Comments</p>
                <p className="font-semibold text-slate-800">{formatNumber(post.comments)}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Created</p>
                <p className="font-semibold text-slate-800">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {showActions && (
              <div className="mt-4 flex flex-wrap gap-3">
                {onEditPost && (
                  <button
                    type="button"
                    data-testid={`post-edit-${post.id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onEditPost(post.id);
                    }}
                    className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Edit
                  </button>
                )}

                {onDeletePost && (
                  <button
                    type="button"
                    data-testid={`post-delete-${post.id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeletePost(post.id);
                    }}
                    className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div data-testid="top-posts-table-desktop" className="overflow-x-auto hidden md:block">
        <table className="w-full min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Views</th>
              <th className="py-3 px-4">Likes</th>
              <th className="py-3 px-4">Comments</th>
              <th className="py-3 px-4">Created</th>
              {showActions && <th className="py-3 px-4">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  <Link
                    to={`/blogs/${post.id}`}
                    title={`View details for ${post.title}`}
                    aria-label={`View details for post ${post.title}`}
                    className="inline-flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <span>{post.title}</span>
                    <FiArrowRight className="text-blue-500" />
                  </Link>
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {formatNumber(post.views)}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    {formatNumber(post.likes)}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-600">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {formatNumber(post.comments)}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                {showActions && (
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {onEditPost && (
                        <button
                          type="button"
                          data-testid={`post-edit-${post.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            onEditPost(post.id);
                          }}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          Edit
                        </button>
                      )}
                      {onDeletePost && (
                        <button
                          type="button"
                          data-testid={`post-delete-${post.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            onDeletePost(post.id);
                          }}
                          className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No posts available
        </div>
      )}
    </div>
  );
};

export default TopPostsTable;