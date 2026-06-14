import React from "react";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import HomeHero from "../components/HomeHero";
import WhatIWriteAbout from "../components/WhatAbout";
import DevelopmentJourney from "../components/DevelopmentJourney";
import WhyReadMyBlog from "../components/WhyReadMyBlog";

import mockPosts from "../store/mockPosts";

const HomePage = () => {
  const latestPosts = [...mockPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="w-full min-h-screen py-16 md:py-24 flex flex-col gap-16 md:gap-24 bg-theme-light">

      <HomeHero />

      <WhatIWriteAbout />

      <DevelopmentJourney />

      <WhyReadMyBlog />

      {/* Latest Articles */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Latest Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Recent Blog Posts
            </h2>
          </div>

          <Link
            to="/blogs"
            className="hidden md:flex px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-10 md:hidden">
          <Link
            to="/blogs"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            View All Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;