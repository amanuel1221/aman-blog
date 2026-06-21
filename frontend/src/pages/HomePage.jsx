import React, { useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HomeHero from "../components/HomeHero";
import PostCard from "../components/PostCard";
import mockPosts from "../store/mockPosts";

const WhatIWriteAbout = lazy(() => import("../components/WhatAbout"));
const DevelopmentJourney = lazy(() => import("../components/DevelopmentJourney"));
const WhyReadMyBlog = lazy(() => import("../components/WhyReadMyBlog"));

const StructureLoader = () => (
  <div className="w-full h-32 bg-gray-50/50 rounded-2xl animate-pulse flex items-center justify-center text-sm text-gray-400 font-medium">
    Loading content block...
  </div>
);

const HomePage = () => {
  const latestPosts = useMemo(() => {
    if (!Array.isArray(mockPosts)) return [];
    
    return [...mockPosts]
      .sort((a, b) => {
        const dateA = a.dateIso ? new Date(a.dateIso) : new Date(a.date);
        const dateB = b.dateIso ? new Date(b.dateIso) : new Date(b.date);
        return dateB - dateA;
      })
      .slice(0, 3);
  }, []);

  return (
    <>
      <Helmet>
        <title>Amanuel Amare | Full-Stack & AI Engineering Blog</title>
        <meta name="description" content="Explore insightful deep dives into modern web engineering, MERN stack patterns, scalable architecture, automated UI testing, and emergent AI development applications." />
        <meta name="keywords" content="Software Engineering, React, Node.js, Vitest, MERN Stack, AI Engineering, Full-Stack Developer Portfolio" />
        <link rel="canonical" href="https://amanuel-portfolio-flame.vercel.app/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Amanuel Amare | Full-Stack & AI Engineering Blog" />
        <meta property="og:description" content="Explore insightful deep dives into modern web engineering, MERN stack patterns, scalable architecture, and emergent AI development applications." />
        <meta property="og:url" content="https://amanuel-portfolio-flame.vercel.app/" />
        <meta property="og:image" content="https://amanuel-portfolio-flame.vercel.app/og-image.png" />

       
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amanuel Amare | Full-Stack & AI Engineering Blog" />
        <meta name="twitter:description" content="Explore insightful deep dives into modern web engineering, MERN stack patterns, scalable architecture, and emergent AI development applications." />
        <meta name="twitter:image" content="https://amanuel-portfolio-flame.vercel.app/og-image.png" />
      </Helmet>

      <main 
        className="w-full min-h-screen py-16 md:py-24 flex flex-col gap-16 md:gap-24 bg-theme-light" 
        data-testid="home-page"
      >
        <HomeHero />

        <Suspense fallback={<StructureLoader />}>
          <WhatIWriteAbout />
        </Suspense>

      <WhyReadMyBlog />
     

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

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            data-testid="home-page-latest-posts"
          >
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

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