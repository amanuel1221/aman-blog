import { useState, useEffect, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { getPosts } from "../api/postApi";
import CategoryFilter from "./categoryFilter";

const SearchModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setSearchTerm("");
      setDebouncedTerm("");
      setSelectedCategory("All");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Debounce raw input -> debouncedTerm
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      try {
        const res = await getPosts(1, 1000);
        const values = new Set((res.data.posts || []).map((p) => p.category).filter(Boolean));
        setCategories(["All", ...Array.from(values)]);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategories(["All"]);
      }
    };

    fetchCategories();
  }, [open]);

  // Fetch results whenever the debounced term or category changes
  useEffect(() => {
    if (!open) return;

    const currentRequestId = ++requestIdRef.current;
    setLoading(true);

    const fetchResults = async () => {
      try {
        const res = await getPosts(
          1,
          20,
          debouncedTerm,
          selectedCategory !== "All" ? selectedCategory : ""
        );
        if (currentRequestId !== requestIdRef.current) return;

        setResults(res.data.posts || []);
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) return;
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        if (currentRequestId === requestIdRef.current) setLoading(false);
      }
    };

    fetchResults();
  }, [open, debouncedTerm, selectedCategory]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!open) return null;




  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      data-testid="search-modal"
    >
      <div
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl mt-10 mb-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="search-modal-content"
      >

        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              id="search-modal-title"
              className="text-2xl font-bold text-gray-800"
              data-testid="search-modal-title"
            >
              Search Articles
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close search modal"
              data-testid="search-modal-close-button"
            >
              <FaTimes className="text-xl text-gray-500 hover:text-gray-700" />
            </button>
          </div>


          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="search"
                type="search"
                name="search"
                autoComplete="off"
                enterKeyHint="search"
                placeholder="Search by title, author, category, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 transition-all"
                data-testid="search-modal-input"
              />
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <p className="mt-3 text-sm text-gray-500 font-medium" aria-live="polite">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"} found
          </p>
        </div>



        <div className="p-6 bg-gray-50/30 min-h-[350px]" data-testid="search-modal-results">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={`${post.title} - ${post.category} article`}

                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-col flex-grow p-5">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                      <FaUserCircle className="text-gray-400" />
                      <span>{post.author?.name || post.author}</span>
                      <span>•</span>
                      <time dateTime={post.date}>{post.date}</time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <NavLink
                      to={`/blogs/${post.slug}`}
                      onClick={onClose}
                    >
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </NavLink>

                    <p className="text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4">
                      <NavLink
                        to={`/blogs/${post.slug}`}
                        onClick={onClose}
                        className="inline-block text-center border-2 border-black text-black hover:bg-black hover:text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 text-sm"
                      >
                        Read Article
                      </NavLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-700" data-testid="search-modal-no-results">
                No articles found
              </h3>

              <p className="text-gray-500 mt-2" data-testid="search-modal-no-results-description">
                Try a different keyword or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchModal;