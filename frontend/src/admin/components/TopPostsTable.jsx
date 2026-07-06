import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const formatNumber = (num) => {
  if (num === undefined || num === null) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toLocaleString();
};

const TopPostsTable = ({ posts = [], onEditPost, onDeletePost, deletingId }) => {
  const showActions = Boolean(onEditPost || onDeletePost);

  return (
    <div data-testid="top-posts-table" className="w-full">
      
      <div data-testid="top-posts-mobile-list" className="divide-y divide-slate-100 md:hidden">
        {posts.map((post) => {
          const isDeleting = deletingId === post._id;
          
          return (
            <article 
              key={post._id} 
              className={`p-5 space-y-4 transition duration-150 bg-white ${
                isDeleting ? "opacity-40 animate-pulse pointer-events-none bg-slate-50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 tracking-tight leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt || "No summary manifest compiled for this article path."}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'short' })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Views</p>
                  <p className="font-extrabold text-slate-800 mt-0.5">{formatNumber(post.views)}</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Likes</p>
                  <p className="font-extrabold text-slate-800 mt-0.5">{formatNumber(post.likes?.length || 0)}</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Comments</p>
                  <p className="font-extrabold text-slate-800 mt-0.5">{formatNumber(post.commentsCount || 0)}</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Indexed</p>
                  <p className="font-extrabold text-slate-800 mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'short' })}
                  </p>
                </div>
              </div>

              {showActions && (
                <div className="flex gap-2 pt-1">
                  {onEditPost && (
                    <button
                      type="button"
                      data-testid={`post-edit-${post._id}`}
                      onClick={(e) => { e.stopPropagation(); onEditPost(post._id); }}
                      className="flex-1 rounded-xl bg-slate-100 border border-slate-200/60 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"
                    >
                      Modify
                    </button>
                  )}

                  {onDeletePost && (
                    <button
                      type="button"
                      data-testid={`post-delete-${post._id}`}
                      onClick={(e) => { e.stopPropagation(); onDeletePost(post._id); }}
                      className="flex-1 rounded-xl bg-red-50 border border-red-100 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-100"
                    >
                      {isDeleting ? "Purging..." : "Remove"}
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div data-testid="top-posts-table-desktop" className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm border-collapse text-left">
          <thead className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold">Article Title</th>
              <th scope="col" className="px-6 py-4 font-bold">Total Impressions</th>
              <th scope="col" className="px-6 py-4 font-bold">Reaction Weight</th>
              <th scope="col" className="px-6 py-4 font-bold">Discussion Count</th>
              <th scope="col" className="px-6 py-4 font-bold">Publish Date</th>
              {showActions && <th scope="col" className="px-6 py-4 text-right font-bold">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {posts.map((post) => {
              const isDeleting = deletingId === post._id;

              return (
                <tr
                  key={post._id}
                  className={`group transition duration-150 select-none ${
                    isDeleting 
                      ? "opacity-35 bg-slate-50 pointer-events-none animate-pulse" 
                      : "hover:bg-slate-50/60"
                  }`}
                >
                  <td className="px-6 py-4 max-w-sm truncate font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    <Link
                      to={`/blogs/${post.slug}`}
                      title={`Open web content for ${post.title}`}
                      aria-label={`Inspect web path deployment details for ${post.title}`}
                      className="inline-flex items-center gap-2 max-w-full"
                    >
                      <span className="truncate">{post.title}</span>
                      <FiArrowRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" size={14} />
                    </Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-600 font-mono">
                    {formatNumber(post.views)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold font-mono">
                      {formatNumber(post.likes?.length || 0)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold font-mono">
                      {formatNumber(post.commentsCount || 0)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                    {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>

                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        {onEditPost && (
                          <button
                            type="button"
                            data-testid={`post-edit-${post._id}`}
                            onClick={(e) => { e.stopPropagation(); onEditPost(post._id); }}
                            className="rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-100 cursor-pointer shadow-3xs"
                          >
                            Edit
                          </button>
                        )}
                        {onDeletePost && (
                          <button
                            type="button"
                            data-testid={`post-delete-${post._id}`}
                            onClick={(e) => { e.stopPropagation(); onDeletePost(post._id); }}
                            className="rounded-lg bg-red-50 border border-red-100/60 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-100 cursor-pointer shadow-3xs"
                          >
                            {isDeleting ? "..." : "Delete"}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}

            {posts.length === 0 && (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="py-16 text-center text-slate-400 font-medium text-xs">
                  No tracking records currently indexed for this layout matrix.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPostsTable;