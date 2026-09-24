import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useParams, NavLink } from "react-router-dom";

import SEO from "../components/SEO";
import { FaUserCircle } from "react-icons/fa";

import { getPostBySlug, getPosts, viewPost } from "../api/postApi";

import { useAuth } from "../context/AuthContext";

import ReadingProgressBar from "../components/ReadingProgressBar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ReadingMode from "../components/ReadingMode";
import PostCard from "../components/PostCard";

import { slugify } from "../utils/slugify";

const TableOfContents = lazy(() => import("../components/TableOfContents"));
const ArticleShare = lazy(() => import("../components/ArticleShare"));
const PostReactions = lazy(() => import("../components/PostReactions"));
const PostComments = lazy(() => import("../components/PostComments"));

const MarkdownRenderer = lazy(() => {
  return Promise.all([
    import("react-markdown"),
    import("remark-gfm"),
    import("../components/CodeBlock"),
  ]).then(([ReactMarkdownModule, remarkGfmModule, CodeBlockModule]) => {
    const ReactMarkdown = ReactMarkdownModule.default;
    const remarkGfm = remarkGfmModule.default;
    const CodeBlock = CodeBlockModule.default;

    const generateSlug = (children) => {
      const content = React.Children.toArray(children).join("");
      return slugify(content);
    };

    return {
      default: ({ content }) => (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 id={generateSlug(children)} className="mt-10 mb-4 text-3xl font-black text-gray-900" {...props}>
                {children}
              </h1>
            ),

            h2: ({ children, ...props }) => (
              <h2 id={generateSlug(children)} className="mt-8 mb-4 text-2xl font-extrabold text-gray-900" {...props}>
                {children}
              </h2>
            ),

            h3: ({ children, ...props }) => (
              <h3 id={generateSlug(children)} className="mt-6 mb-3 text-xl font-bold text-gray-900" {...props}>
                {children}
              </h3>
            ),

            p: ({ ...props }) => (
              <p className="mb-6 leading-8 text-gray-700" {...props} />
            ),

            ul: ({ ...props }) => (
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700" {...props} />
            ),

            ol: ({ ...props }) => (
              <ol className="mb-6 list-decimal space-y-2 pl-6 text-gray-700" {...props} />
            ),

            blockquote: ({ ...props }) => (
              <blockquote className="my-8 border-l-4 border-gray-900 pl-5 italic text-gray-600" {...props} />
            ),

            hr: ({ ...props }) => (
              <hr className="my-10 border-gray-200" {...props} />
            ),

            a: ({ ...props }) => (
              <a className="font-semibold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
            ),

            img: ({ src, alt, title, ...props }) => (
              <figure className="my-8 w-full">
                <img
                  src={src}
                  alt={alt || "Article image"}
                  title={title || undefined}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto max-h-[700px] w-auto max-w-full rounded-2xl object-contain shadow-sm"
                  {...props}
                />
                {title && (
                  <figcaption className="mt-3 text-center text-sm italic leading-6 text-gray-500">
                    {title}
                  </figcaption>
                )}
              </figure>
            ),

            table: ({ ...props }) => (
              <div className="my-8 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full border-collapse border border-gray-200" {...props} />
              </div>
            ),

            th: ({ ...props }) => (
              <th className="border border-gray-200 bg-gray-50 px-4 py-3 text-left font-bold text-gray-900" {...props} />
            ),

            td: ({ ...props }) => (
              <td className="border border-gray-200 px-4 py-3 text-gray-700" {...props} />
            ),

            code({ inline, children, ...props }) {
              if (inline) {
                return (
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-pink-600" {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock {...props}>
                  {children}
                </CodeBlock>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      ),
    };
  });
});

const ComponentLoader = () => (
  <div className="flex h-12 w-full items-center justify-center text-sm text-gray-400 animate-pulse">
    Loading section...
  </div>
);

const DetailsPage = () => {
  const { id: slug } = useParams();

  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  const [loading, setLoading] = useState(true);

  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await getPostBySlug(slug);

        setPost(res.data.post);
      } catch (err) {
        console.error("Failed to load post", err);

        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await getPosts();

        setRelated(res.data.posts || []);
      } catch (err) {
        console.error("Failed to load related posts", err);

        setRelated([]);
      }
    };

    fetchRelated();
  }, []);

  const relatedArticles = useMemo(() => {
    if (!post) {
      return [];
    }

    return related
      .filter((p) => p.category === post.category && p._id !== post._id)
      .slice(0, 3);
  }, [post, related]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 text-center text-red-500">
        Post not found
      </div>
    );
  }

  const targetImageUrl = post.coverImage?.url || "https://aman-blog-seven.vercel.app/og-image.png";

  const postAbsoluteUrl = `https://aman-blog-seven.vercel.app/blogs/${slug}`;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || "Read this full technical article on Aman Blog."}
        canonicalUrl={postAbsoluteUrl}
        ogType="article"
        ogImage={targetImageUrl}
        articleData={{
          title: post.title,
          excerpt: post.excerpt,

          coverImage: {
            url: targetImageUrl,
          },

          createdAt: post.dateIso || "2026-06-19",

          updatedAt: post.updatedAt || post.dateIso || "2026-06-19",

          category: post.category,

          tags: post.tags,

          author: {
            name: post.author?.name || post.author || "Amanuel Amare",
          },
        }}
        breadcrumbs={[
          {
            name: "Home",
            url: "https://aman-blog-seven.vercel.app",
          },
          {
            name: "Blog",
            url: "https://aman-blog-seven.vercel.app/blogs",
          },
          {
            name: post.title,
            url: postAbsoluteUrl,
          },
        ]}
      />

      <main
        className={`w-full transition-colors duration-500 ${readingMode ? "bg-stone-50" : "bg-white"}`}
        data-testid="details-page"
      >
        <ReadingProgressBar />

        <ScrollToTopButton />

        <ReadingMode onToggle={setReadingMode} />

        <article className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-14 sm:pb-24" data-testid="details-page-article">
          <nav
            className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gray-400"
            aria-label="Breadcrumb"
            data-testid="details-page-breadcrumb"
          >
            <NavLink to="/" className="hover:text-black">
              Home
            </NavLink>

            {" / "}

            <NavLink to="/blogs" className="hover:text-black">
              Blog
            </NavLink>

            {" / "}

            {post.category || "General"}
          </nav>

          <h1
            className="mx-auto mb-6 max-w-4xl text-center text-4xl font-black leading-tight text-gray-900 md:text-5xl"
            data-testid="details-page-title"
          >
            {post.title}
          </h1>

          <p
            className="mx-auto mb-6 max-w-2xl text-center text-base leading-relaxed text-gray-500 sm:mb-10 sm:text-lg"
            data-testid="details-page-excerpt"
          >
            {post.excerpt}
          </p>

          <div
            className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-gray-400 sm:mb-14"
            data-testid="details-page-meta"
          >
            <div className="flex items-center gap-2" data-testid="details-page-author">
              <NavLink
                to="/about"
                className="flex items-center gap-2 transition-colors hover:text-black"
                data-testid="details-page-author-link"
              >
                <FaUserCircle className="h-5 w-5 text-gray-300" aria-hidden="true" />

                <span className="font-extrabold tracking-tight text-gray-900" data-testid="details-page-author-name">
                  {post.author?.name || post.author || "Amanuel Amare"}
                </span>
              </NavLink>
            </div>

            <span aria-hidden="true">•</span>

            <time dateTime={post.dateIso || "2026-06-19"}>
              {post.date || "June 2026"}
            </time>

            <span aria-hidden="true">•</span>

            <span
              className="rounded-md bg-gray-100 px-2.5 py-0.5 text-[10px] font-extrabold text-gray-900"
              data-testid="details-page-read-time"
            >
              {post.readTime || "5 min read"}
            </span>
          </div>

          {post.coverImage?.url && (
            <div className="mx-auto mb-10 max-w-6xl sm:mb-20">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-100 shadow-xl sm:aspect-[16/7] sm:rounded-3xl">
                <img
                  src={post.coverImage.url}
                  alt={`Cover graphic for ${post.title}`}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  data-testid="details-page-cover-image"
                />
              </div>
            </div>
          )}

          <div
            className={
              readingMode
                ? "mx-auto max-w-3xl transition-all duration-500"
                : "mx-auto grid max-w-6xl grid-cols-1 gap-8 transition-all duration-500 lg:grid-cols-[1fr_280px] lg:gap-14"
            }
            data-testid="details-page-content"
          >
            <section
              className={
                readingMode
                  ? "text-lg font-medium leading-9 text-gray-800 sm:text-xl sm:leading-10"
                  : "text-base font-medium leading-7 text-gray-800 sm:text-lg sm:leading-8"
              }
              data-testid="details-page-section"
              aria-label="Article Body"
            >
              <Suspense
                fallback={
                  <div className="py-10 text-center text-gray-400">
                    Parsing content module...
                  </div>
                }
              >
                <MarkdownRenderer content={post.content} />
              </Suspense>
            </section>

            {!readingMode && (
              <aside
                className="hidden lg:block"
                data-testid="details-page-toc"
                role="doc-toc"
                aria-label="Table of contents side rail"
              >
                <div className="sticky top-24">
                  <Suspense fallback={<ComponentLoader />}>
                    <TableOfContents content={post.content} />
                  </Suspense>
                </div>
              </aside>
            )}
          </div>
        </article>

        {!readingMode && (
          <footer className="mx-auto mt-16 max-w-3xl px-6">
            <Suspense fallback={<ComponentLoader />}>
              <ArticleShare title={post.title} />
            </Suspense>

            {post.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Article Tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-12 space-y-10">
              <Suspense fallback={<ComponentLoader />}>
                <PostReactions
                  postId={post._id}
                  initialLikes={post.likes || []}
                  initialDislikes={post.dislikes || []}
                />
              </Suspense>

              <Suspense fallback={<ComponentLoader />}>
                <PostComments postId={post._id} />
              </Suspense>
            </div>
          </footer>
        )}

        {!readingMode && (
          <section
            className="mx-auto mt-16 w-full max-w-6xl border-t border-gray-100 px-4 pb-12 pt-10 sm:mt-24 sm:px-6 sm:pt-16"
            data-testid="details-page-related-articles"
            aria-label="Recommended Reading"
          >
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                Related Articles
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Continue exploring articles related to {post.category || "General"}.
              </p>
            </div>

            <div
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
              data-testid="details-page-related-articles-grid"
            >
              {relatedArticles.map((item) => (
                <div
                  key={item._id || item.slug}
                  className="cursor-pointer rounded-3xl outline-none focus-within:ring-2 focus-within:ring-blue-500"
                  data-testid="details-page-related-article"
                >
                  <PostCard post={item} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default DetailsPage;