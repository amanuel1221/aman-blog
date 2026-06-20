import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaUserCircle } from "react-icons/fa";
import mockPosts from '../store/mockPosts';

// Core Critical Components
import ReadingProgressBar from '../components/ReadingProgressBar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ReadingMode from "../components/ReadingMode";
import PostCard from '../components/PostCard';

// Heavy interactive or non-critical structures remain lazily loaded
const TableOfContents = lazy(() => import('../components/TableOfContents'));
const ArticleShare = lazy(() => import('../components/ArticleShare'));
const PostReactions = lazy(() => import('../components/PostReactions'));
const PostComments = lazy(() => import('../components/PostComments'));

// Safe string normalization helper for element id indexing
const generateSlug = (children) => {
  const content = React.Children.toArray(children).join("");
  return content ? content.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") : "";
};

// 🚀 Isolating Markdown & Plugins into a single asynchronously loaded chunk to preserve performance safely
const MarkdownRenderer = lazy(() => {
  return Promise.all([
    import('react-markdown'),
    import('remark-gfm'),
    import('../components/CodeBlock')
  ]).then(([ReactMarkdownModule, remarkGfmModule, CodeBlockModule]) => {
    const ReactMarkdown = ReactMarkdownModule.default;
    const remarkGfm = remarkGfmModule.default;
    const CodeBlock = CodeBlockModule.default;

    // Return a unified functional rendering wrapper component
    return {
      default: ({ content }) => (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 id={generateSlug(children)} className="text-3xl font-black text-gray-900 mt-10 mb-4" {...props}>{children}</h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 id={generateSlug(children)} className="text-2xl font-extrabold text-gray-900 mt-8 mb-4" {...props}>{children}</h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 id={generateSlug(children)} className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props}>{children}</h3>
            ),
            p: ({ ...props }) => <p className="text-gray-700 leading-8 mb-6" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6" {...props} />,
            blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-900 pl-5 italic text-gray-600 my-8" {...props} />,
            hr: ({ ...props }) => <hr className="my-10 border-gray-200" {...props} />,
            a: ({ ...props }) => <a className="text-blue-600 font-semibold hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-8 shadow-sm rounded-xl border border-gray-100">
                <table className="w-full border-collapse border border-gray-200" {...props} />
              </div>
            ),
            th: ({ ...props }) => <th className="border border-gray-200 bg-gray-50 px-4 py-3 text-left font-bold text-gray-900" {...props} />,
            td: ({ ...props }) => <td className="border border-gray-200 px-4 py-3 text-gray-700" {...props} />,
            code({ inline, children, ...props }) {
              return inline ? (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-pink-600" {...props}>{children}</code>
              ) : (
                <CodeBlock {...props}>{children}</CodeBlock>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      )
    };
  });
});

const currentSessionUser = {
  id: "user_amanuel_123",
  name: "Amanuel"
};

const ComponentLoader = () => (
  <div className="w-full h-12 flex items-center justify-center text-sm text-gray-400 animate-pulse">
    Loading section...
  </div>
);

const DetailsPage = () => {
  const { id } = useParams();
  const [readingMode, setReadingMode] = useState(false);

  const post = useMemo(() => {
    return mockPosts.find((item) => item.id === parseInt(id, 10)) || null;
  }, [id]);

  const relatedArticles = useMemo(() => {
    if (!post) return [];

    const sameCategoryPosts = mockPosts.filter(
      (item) => item.category === post.category && item.id !== post.id
    );

    if (sameCategoryPosts.length < 3) {
      const remainingCountNeeded = 3 - sameCategoryPosts.length;
      const fallbackPosts = mockPosts.filter(
        (item) => item.category !== post.category && item.id !== post.id
      );
      return [...sameCategoryPosts, ...fallbackPosts.slice(0, remainingCountNeeded)];
    }

    return sameCategoryPosts.slice(0, 3);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!post) {
    return (
      <div className="text-center py-32 bg-white text-gray-400 font-bold tracking-tight" role="alert">
        Article view scope initialization failure. Resource target not found.
      </div>
    );
  }

  const structuredArticleData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage || "https://amanuel-portfolio-flame.vercel.app/og-image.png",
    "datePublished": post.dateIso || "2026-06-19",
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Amanuel Amare",
      "url": "https://amanuel-portfolio-flame.vercel.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amanuel Amare Engineering Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amanuel-portfolio-flame.vercel.app/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://amanuel-portfolio-flame.vercel.app/blogs/${id}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Amanuel Amare`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category || 'Software'}, Web Development, Full Stack Engineering`} />
        <link rel="canonical" href={`https://amanuel-portfolio-flame.vercel.app/blogs/${id}`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://amanuel-portfolio-flame.vercel.app/blogs/${id}`} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta property="article:published_time" content={post.dateIso || "2026-06-19"} />
        <meta property="article:author" content="Amanuel Amare" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.coverImage && <meta name="twitter:image" content={post.coverImage} />}

        <script type="application/ld+json">
          {JSON.stringify(structuredArticleData)}
        </script>
      </Helmet>

      <main
        className={`w-full transition-colors duration-500 ${readingMode ? "bg-stone-50" : "bg-white"}`}
        data-testid="details-page"
      >
        <ReadingProgressBar />
        <ScrollToTopButton />
        <ReadingMode onToggle={setReadingMode} />

        <article className="max-w-7xl mx-auto px-6 pt-14 pb-24" data-testid="details-page-article">
          <nav className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 text-center mb-6" aria-label="Breadcrumb" data-testid="details-page-breadcrumb">
            <NavLink to="/" className="hover:text-black">Home</NavLink> / <NavLink to="/blogs" className="hover:text-black">Blog</NavLink> / {post.category || "General"}
          </nav>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center leading-tight max-w-4xl mx-auto mb-6" data-testid="details-page-title">
            {post.title}
          </h1>

          <p className="text-gray-500 text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed" data-testid="details-page-excerpt">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-400 mb-14 uppercase tracking-wider" data-testid="details-page-meta">
            <div className="flex items-center gap-2" data-testid="details-page-author">
              <NavLink
                to="/about"
                className="flex items-center gap-2 hover:text-black transition-colors"
                data-testid="details-page-author-link"
              >
                <FaUserCircle className="w-5 h-5 text-gray-300" aria-hidden="true" />
                <span className="font-extrabold text-gray-900 tracking-tight" data-testid="details-page-author-name">
                  {post.author?.name || post.author || "Amanuel Amare"}
                </span>
              </NavLink>
            </div>
            <span aria-hidden="true">•</span>
            <time dateTime={post.dateIso || "2026-06-19"}>{post.date || "June 2026"}</time>
            <span aria-hidden="true">•</span>
            <span className="text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]" data-testid="details-page-read-time">
              {post.readTime || "5 min read"}
            </span>
          </div>

          {post.coverImage && (
            <div className="max-w-6xl mx-auto mb-20">
              <div className="aspect-[16/7] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src={post.coverImage}
                  alt={`Cover graphic for ${post.title}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  data-testid="details-page-cover-image"
                />
              </div>
            </div>
          )}

          <div
            className={readingMode ? "max-w-3xl mx-auto transition-all duration-500" : "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14 max-w-6xl mx-auto transition-all duration-500"}
            data-testid="details-page-content"
          >
            <section
              className={readingMode ? "text-gray-800 text-xl leading-10 font-medium" : "text-gray-800 text-lg leading-8 font-medium"}
              data-testid="details-page-section"
              aria-label="Article Body"
            >
              <Suspense fallback={<div className="text-center py-10 text-gray-400">Parsing content module...</div>}>
                <MarkdownRenderer content={post.content} />
              </Suspense>
            </section>

            {!readingMode && (
              <aside className="hidden lg:block" data-testid="details-page-toc" role="doc-toc" aria-label="Table of contents side rail">
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
          <footer className="max-w-3xl mx-auto mt-16 px-6">
            <Suspense fallback={<ComponentLoader />}>
              <ArticleShare title={post.title} />
            </Suspense>

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6" aria-label="Article Tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600"
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
                  currentUserId={currentSessionUser.id}
                />
              </Suspense>

              <Suspense fallback={<ComponentLoader />}>
                <PostComments initialComments={post.comments} />
              </Suspense>
            </div>
          </footer>
        )}

        {!readingMode && (
          <section className="w-full max-w-6xl mx-auto mt-24 pt-16 border-t border-gray-100 px-6 pb-12" data-testid="details-page-related-articles" aria-label="Recommended Reading">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Related Articles</h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Continue exploring articles related to {post.category || "General"}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="details-page-related-articles-grid">
              {relatedArticles.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 rounded-3xl outline-none"
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