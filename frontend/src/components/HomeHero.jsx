import React from "react";
import { NavLink } from "react-router-dom";

const HomeHero = () => {
    return (
        <section className="relative w-full bg-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden" data-testid="home-hero"  aria-labelledby="hero-title">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">


                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 uppercase mb-4" data-testid="home-hero-tag" aria-label="Site tagline">
                Building Fast, Tested & Scalable Web Applications
                </span>


                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-[1.15]" data-testid="home-hero-title"  id="hero-title">
                    Amanuel Blogs Collection
                </h1>

                <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed" data-testid="home-hero-description">
                  A collection of engineering notes and blog posts covering React, Node.js, performance optimization, Vitest testing, and real-world fullstack development.
                </p>

                <NavLink to="/blogs" aria-label="Read blog posts"> 
                <div className="mt-8" data-testid="home-hero-button-container">
                   <button
                      
                     
                      data-testid="home-hero-button"
                      className="group inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-sm hover:bg-gray-800 active:scale-98 transition-all duration-200 cursor-pointer"
                    >
                        Read Blogs
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" data-testid="home-hero-button-arrow">
                            →
                        </span>
                    </button>
                   
                </div>
 </NavLink>

                <div className="mt-12 md:mt-16 w-full max-w-2xl px-4 transition-all duration-300 hover:scale-[1.01]">
                    <img
                        src="/undraw_building-a-website_1wrp.svg"
                        alt="Developer working on coding projects illustration"
                        className="w-full h-auto object-contain mx-auto rounded-2xl drop-shadow-sm"
                        loading="eager"
                        data-testid="home-hero-image"
                    />
                </div>

            </div>
        </section>
    );
}
export default HomeHero;