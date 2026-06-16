import React, { useState, useMemo } from "react";
import mockPosts from "../store/mockPosts";
import PostCard from "../components/PostCard";
import SearchModal from "../components/SearchModal";

const BlogsPage = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;


  const categories = useMemo(() => {
    const values = new Set(
      mockPosts.map((post) => post.category).filter(Boolean)
    );
    return ["All", ...Array.from(values)];
  }, []);


  const filteredPosts = useMemo(() => {
    const basePosts = activeCategory === "All"
      ? [...mockPosts]
      : mockPosts.filter((post) => post.category === activeCategory);


    return basePosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeCategory]);


  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;


  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);


      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className=" bg-white">

      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />


      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400"
          data-testid="blog-page-header"
        >
          🌾 Blog & Resources
        </span>

        <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight" data-testid="blog-page-title">
          Insights for Modern
          <br />
          Developers
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed" data-testid="blog-page-description">
          Practical tutorials, software engineering insights, and lessons learned while building real-world applications.
        </p>

        <div className="mt-10 max-w-2xl mx-auto">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex items-center justify-between cursor-pointer"
            data-testid="blog-page-search-button"
            >
            <span className="text-gray-400">Search articles, tutorials, resources...</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>


        <div className="flex justify-center gap-10 mt-8 text-sm text-gray-600" data-testid="blog-page-stats">
          <div><span className="font-bold text-black" data-testid="blog-page-article-count">
            {mockPosts.length}
          </span> Articles</div>
          <div><span className="font-bold text-black" data-testid="blog-page-category-count">
            {categories.length - 1}
          </span> Categories</div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3" data-testid="blog-page-categories">
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);

                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${selected
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                  data-testid={`blog-page-category-${category}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pt-10 border-t border-gray-100">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black tracking-tight text-gray-900" data-testid="blog-page-featured-articles-title">
            Featured Articles
          </h2>
          <p className="mt-3 text-gray-500">
            Showing <span className="font-semibold text-black" data-testid="blog-page-filtered-article-count">
              {filteredPosts.length}
            </span> articles
          </p>
        </div>

        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-page-featured-articles">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-200 rounded-3xl" data-testid="blog-page-no-articles">
            <p className="text-gray-400 " data-testid="blog-page-no-articles-text">
              No posts found in this category.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-3" data-testid="blog-page-pagination">


            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
        flex items-center gap-2
        px-4 py-2.5
        rounded-xl
        cursor-pointer
        border border-gray-200
        bg-white
        text-gray-700
        font-medium
        shadow-sm
        hover:shadow-md
        hover:bg-gray-50
        transition-all duration-300
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
      data-testid="blog-page-pagination-prev"
            >
              ← Prev
            </button>


            <div className="flex items-center gap-2">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`
            cursor-pointer
            w-11 h-11
            rounded-xl
            font-semibold
            transition-all duration-300
            ${currentPage === page
                      ? "bg-black text-white shadow-lg scale-105"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                    }
          `}
                  data-testid={`blog-page-pagination-page-${page}`}
                >
                  {page}
                </button>
              ))}
            </div>


            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
        flex items-center gap-2
        cursor-pointer
        px-4 py-2.5
        rounded-xl
        border border-gray-200
        bg-white
        text-gray-700
        font-medium
        shadow-sm
        hover:shadow-md
        hover:bg-gray-50
        transition-all duration-300
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
      data-testid="blog-page-pagination-next"
            >
              Next →
            </button>

          </div>
        )}
      </section>


    </main>
  );
};

export default BlogsPage;