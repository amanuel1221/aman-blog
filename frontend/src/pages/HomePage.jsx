import React, { useMemo, lazy, Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO"; 
import HomeHero from "../components/HomeHero";
import PostCard from "../components/PostCard";
import { getPosts } from "../api/postApi";

const WhatIWriteAbout = lazy(() => import("../components/WhatAbout"));
const DevelopmentJourney = lazy(() => import("../components/DevelopmentJourney"));
const WhyReadMyBlog = lazy(() => import("../components/WhyReadMyBlog"));

const StructureLoader = () => (
  <div className="w-full h-32 bg-gray-50/50 rounded-2xl animate-pulse flex items-center justify-center text-sm text-gray-400 font-medium">
    Loading content block...
  </div>
);

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Error loading posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const latestPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.date) -
          new Date(a.createdAt || a.date)
      )
      .slice(0, 3);
  }, [posts]);


  return (
    <>
      <SEO 
        title="Amanuel Amare | Full-Stack & AI Engineering Blog"
        description="Explore insightful deep dives into modern web engineering, MERN stack patterns, scalable architecture, automated UI testing, and emergent AI development applications."
        canonicalUrl="https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app"
        ogType="website"
      />

      <main
        className="w-full min-h-screen py-16 md:py-24 flex flex-col gap-16 md:gap-24 bg-theme-light"
        data-testid="home-page"
      >
        <HomeHero />

        <Suspense fallback={<StructureLoader />}>
          <WhatIWriteAbout />
        </Suspense>

        <Suspense fallback={<StructureLoader />}>
  <DevelopmentJourney />
</Suspense>


        <Suspense fallback={<StructureLoader />}>
          <WhyReadMyBlog />
        </Suspense>

        <section
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-testid="home-page-latest-articles"
          aria-labelledby="recent-posts-heading"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Latest Articles
              </p>
              <h2 id="recent-posts-heading" className="text-3xl md:text-4xl font-bold mt-2">
                Recent Blog Posts
              </h2>
            </div>

            <Link
              to="/blogs"
              className="hidden md:flex px-5 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              data-testid="home-page-view-all-articles"
            >
              View All
            </Link>
          </div>


          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading posts...
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No posts available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="home-page-latest-posts">
              {latestPosts.map((post) => (
                <PostCard key={post._id || post.slug} post={post} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10 md:hidden">
            <Link
              to="/blogs"
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              data-testid="home-page-view-all-articles-mobile"
            >
              View All Articles
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;