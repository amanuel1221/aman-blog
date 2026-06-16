import React, { useEffect,useState, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mockPosts from '../store/mockPosts';
import mockComments from '../store/mockComments';
import PostReactions from '../components/PostReactions';
import PostComments from '../components/PostComments';
import PostCard from '../components/PostCard';
import { FaUserCircle } from "react-icons/fa";
import ReadingProgressBar from '../components/ReadingProgressBar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ArticleShare from '../components/ArticleShare';
 import CodeBlock from "../components/CodeBlock";
 import TableOfContents from '../components/TableOfContents';
 import ReadingMode from "../components/ReadingMode";

const currentSessionUser = {
  id: "user_amanuel_123",
  name: "Amanuel"
};

const DetailsPage = () => {
  const { id } = useParams();

  const [readingMode, setReadingMode] = useState(false);

  const post = useMemo(() => {
    return mockPosts.find((item) => item.id === parseInt(id)) || null;
  }, [id]);

  const filteredComments = useMemo(() => {
    if (!post) return [];
    return mockComments.filter((comment) => comment.post === post._id);
  }, [post]);

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

  if (!post) {
    return (
      <div className="text-center py-32 bg-white text-gray-400 font-bold tracking-tight">
        Article view scope initialization failure. Resource target not found.
      </div>
    );
  }

  return (
<main
  className={`w-full transition-colors duration-500 ${
    readingMode
      ? "bg-stone-50"
      : "bg-white"
  }`}
>  <ReadingProgressBar />
  <ScrollToTopButton />
  <ReadingMode onToggle={setReadingMode} />

  <article className="max-w-7xl mx-auto px-6 pt-14 pb-24">
       <nav className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 text-center mb-6">
  Home / Blog / {post.category || "General"}
</nav>

<h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center leading-tight max-w-4xl mx-auto mb-6">
  {post.title}
</h1>

<p className="text-gray-500 text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed">
  {post.excerpt}
</p>

        <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-400 mb-14 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <NavLink
              to="/about"
              className="flex items-center gap-2 hover:text-black transition-colors"
            >
              <FaUserCircle className="w-5 h-5 text-gray-300" />
              <span className="font-extrabold text-gray-900 tracking-tight">
                {post.author?.name || post.author || "Amanuel Amare"}
              </span>
            </NavLink>
          </div>
          <span>•</span>
          <span>{post.date || "June 2026"}</span>
          <span>•</span>
          <span className="text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]">
            {post.readTime || "5 min read"}
          </span>

        </div>



        {post.coverImage && (
  <div className="max-w-6xl mx-auto mb-20">
    <div className="aspect-[16/7] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-full object-cover hover:scale-105 transition duration-700"
      />
    </div>
  </div>
)}
<div
  className={
    readingMode
      ? "max-w-3xl mx-auto transition-all duration-500"
      : "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14 max-w-6xl mx-auto transition-all duration-500"
  }
>
<section
  className={
    readingMode
      ? "text-gray-800 text-xl leading-10 font-medium"
      : "text-gray-800 text-lg leading-8 font-medium"
  }
>        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
  <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")} {...props} />
),
h2: ({ ...props }) => (
  <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")} {...props} />
),

              h3: ({ ...props }) => (
                <h3
                  className="text-xl font-bold text-gray-900 mt-8 mb-3"
                  {...props}
                />
              ),

              p: ({ ...props }) => (
                <p
                  className="text-gray-700 leading-8 mb-6"
                  {...props}
                />
              ),

              ul: ({ ...props }) => (
                <ul
                  className="list-disc pl-6 space-y-2 text-gray-700 mb-6"
                  {...props}
                />
              ),

              ol: ({ ...props }) => (
                <ol
                  className="list-decimal pl-6 space-y-2 text-gray-700 mb-6"
                  {...props}
                />
              ),

              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-black pl-5 italic text-gray-600 my-8"
                  {...props}
                />
              ),

              hr: ({ ...props }) => (
                <hr
                  className="my-10 border-gray-200"
                  {...props}
                />
              ),

              a: ({ ...props }) => (
                <a
                  className="text-blue-600 font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),

              table: ({ ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table
                    className="w-full border border-gray-200"
                    {...props}
                  />
                </div>
              ),

              th: ({ ...props }) => (
                <th
                  className="border border-gray-200 bg-gray-50 px-4 py-3 text-left"
                  {...props}
                />
              ),

              td: ({ ...props }) => (
                <td
                  className="border border-gray-200 px-4 py-3"
                  {...props}
                />
              ),

           

code({ inline, children }) {
  return inline ? (
    <code className="bg-gray-100 px-2 py-1 rounded">
      {children}
    </code>
  ) : (
    <CodeBlock>
      {children}
    </CodeBlock>
  );
}
            }}
          >
            {post.content}
          </ReactMarkdown>
     
        </section>
  {!readingMode && (
  <aside className="hidden lg:block">
    <div className="sticky top-24">
      <TableOfContents content={post.content} />
    </div>
  </aside>
)}
        </div>
           </article>

{!readingMode && (
<div className="max-w-3xl mx-auto mt-16"> 
   <ArticleShare title={post.title} />

  {post.tags?.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-6">
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
</div>

)}

{!readingMode && (
<div className="max-w-3xl mx-auto mt-12 space-y-10">
  
  <PostReactions
    postId={post._id}
    initialLikes={post.likes || []}
    initialDislikes={post.dislikes || []}
    currentUserId={currentSessionUser.id}
  />

  <PostComments initialComments={post.comments} />
</div>
  )}
{!readingMode && (
<section className="w-full max-w-6xl mx-auto mt-24 pt-16 border-t border-gray-100 px-6">
          <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">            Related Articles
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Continue exploring articles related to {post.category}.
          </p>
        </div>
      

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((item) => (
            <div
              key={item.id}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
            >
              <PostCard post={item} />
            </div>
          ))}
        </div>
      </section>
)}
  
    </main>
  );
};

export default DetailsPage;