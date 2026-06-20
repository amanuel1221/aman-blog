import React from 'react';
import { NavLink } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const seoData = {
    title:
      "About Amanuel Amare | Software Engineer, React Developer & Technical Writer",
    description:
      "Learn about Amanuel Amare, a software engineer passionate about React, JavaScript, performance optimization, API architecture, Vitest testing, and building scalable full-stack web applications.",

    keywords:
      "Amanuel Amare, Software Engineer, React Developer, JavaScript, TypeScript, Vitest, API Design, Performance Optimization, Full Stack Developer, Web Development, React Performance",

    url: "https://amanuel-portfolio-flame.vercel.app/about",

    image:
      "https://amanuel-portfolio-flame.vercel.app/og-image.png",

    siteName: "Amanuel Amare Engineering Blog",

    author: "Amanuel Amare"
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://amanuel-portfolio-flame.vercel.app/#person",
        name: "Amanuel Amare",
        url: "https://amanuel-portfolio-flame.vercel.app",
        image: seoData.image,
        jobTitle: "Software Engineer",
        description:
          "Software engineer specializing in React, JavaScript, frontend performance optimization, testing, and scalable API architecture.",
        sameAs: [
          "https://github.com/amanuel1221",
          "https://linkedin.com/in/amanuel-amare-684234372"
        ],
        knowsAbout: [
          "React",
          "JavaScript",
          "TypeScript",
          "Vitest",
          "Node.js",
          "API Design",
          "Software Engineering",
          "Performance Optimization"
        ]
      },
      {
        "@type": "AboutPage",
        name: "About Amanuel Amare",
        url: seoData.url,
        description: seoData.description
      },
      {
        "@type": "WebSite",
        url: "https://amanuel-portfolio-flame.vercel.app",
        name: seoData.siteName,
        author: {
          "@type": "Person",
          name: "Amanuel Amare"
        }
      }
    ]
  };
  return (
    <>
      <Helmet>
        <html lang="en" />

        <title>{seoData.title}</title>

        <meta name="description" content={seoData.description} />

        <meta name="keywords" content={seoData.keywords} />

        <meta name="author" content={seoData.author} />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />
        <meta name="theme-color" content="#0b0c10" />
        <link rel="canonical" href={seoData.url} />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content="https://amanuel-portfolio-flame.vercel.app/og-image.png"
        />
        <meta
          name="twitter:creator"
          content="@AmanuelAma66386"
        />
        <meta
          name="twitter:image"
          content="https://amanuel-portfolio-flame.vercel.app/og-image.png"
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="630"
        />

        <meta
          property="og:image:alt"
          content="Amanuel Amare - Software Engineer"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content={seoData.title}
        />
        <meta
          name="twitter:description"
          content={seoData.description}
        />
        <meta
          name="twitter:image"
          content={seoData.image}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <main className="min-h-screen bg-white text-gray-900" data-testid="about-page" aria-labelledby="About Amanuel Amrare">


        <section className="max-w-5xl mx-auto px-6 pt-16 pb-16 text-center flex flex-col items-center" data-testid="about-sections">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400" data-testid="about-this-blog">
            ✍️ ABOUT THIS BLOG
          </span>

          <h1 className="mt-5 text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.15] max-w-4xl" data-testid="about-this-blog-title" aria-label="About title">
            treat every project as a lab — where I test performance, architecture, and reliability before I call it done.
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-gray-500 text-lg md:text-xl leading-relaxed font-medium" data-testid="about-this-blog-description">
            This blog documents my journey through software engineering, web development, and continuous learning.
          </p>

          <div className="mt-8">
            <a
              href="https://amanuel-portfolio-flame.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-black px-6 py-3 font-bold text-black transition-all duration-300"
              data-testid="about-view-portfolio"
              aria-label="Amanuel Portfolio Website"
            >
              <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0"></span>

              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white" data-testid="about-view-portfolio-text">
                View My Portfolio
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </div>
        </section>


        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight" data-testid="about-why-started-title">
                Why I Started<br />This Blog
              </h2>
            </div>


            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="text-gray-500 text-lg leading-relaxed font-medium" data-testid="about-why-started-description">
                started documenting my engineering decisions — especially the mistakes, performance bottlenecks, and testing gaps I discover while building real applications.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed font-medium" data-testid="about-why-started-description-2">
                Writing forces me to validate my understanding through implementation — especially in areas like React performance, Vitest testing, and API design
              </p>


              <div className="mt-4 bg-gray-50/60 rounded-3xl p-8 border border-gray-100 text-center md:text-left shadow-sm max-w-xl">
                <p className="text-2xl font-black text-gray-900 tracking-tight italic" data-testid="about-why-started-quote">
                  "Measure. Break. Optimize. Repeat."
                </p>
              </div>
            </div>

          </div>
        </section>


        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400" data-testid="about-focus">
              🎯 MY FOCUS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-gray-900" data-testid="about-focus-title">
              Topics I Explore and Share
            </h2>
            <p className="mt-3 text-gray-500 text-base font-medium" data-testid="about-focus-description">
              The areas I spend the most time learning, building, testing and writing about.
            </p>
          </div>


          <NotesGrid />
        </section>


        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight text-gray-900" data-testid="about-beyond-blog-title">
              Beyond This Blog
            </h2>
            <p className="mt-2 text-gray-500 text-sm font-medium" data-testid="about-beyond-blog-description">
              Explore my projects, code, and professional journey across different platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            <div className="bg-white border border-gray-200/80 p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid="about-beyond-blog-portfolio-title">Portfolio</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed max-w-xs">
                Explore my projects, experience and professional work.
              </p>
              <a
                href="https://amanuel-portfolio-flame.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-auto inline-flex items-center justify-center overflow-hidden rounded-lg border border-black px-5 py-3 text-sm font-bold text-black transition-all duration-300"
                data-testid="about-beyond-blog-portfolio-link"
                aria-label="Amanuel Portfolio Website"
              >
                <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0"></span>

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white" data-testid="about-beyond-blog-portfolio-link-text">
                  View Portfolio
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </div>


            <div className="bg-white border border-gray-200/80 p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid="about-beyond-blog-linkedin-title">Linkedin</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed max-w-xs">
                Follow my professional journey and connect with me.
              </p>
              <a
                href="https://linkedin.com/in/amanuel-amare-684234372"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-auto inline-flex items-center justify-center overflow-hidden rounded-lg border border-black px-5 py-3 text-sm font-bold text-black transition-all duration-300"
                data-testid="about-beyond-blog-linkedin-link"
                aria-label="Amanuel Linkedin Profile"
              >
                <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0"></span>

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white"
                  data-testid="about-beyond-blog-linkedin-link-text"
                >
                  View LinkedIn
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </div>


            <div className="bg-white border border-gray-200/80 p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid="about-beyond-blog-github-title">GitHub</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed max-w-xs">
                Browse repositories, experiments and open-source work.
              </p>
              <a
                href="https://github.com/amanuel1221"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-auto inline-flex items-center justify-center overflow-hidden rounded-lg border border-black px-5 py-3 text-sm font-bold text-black transition-all duration-300"
                data-testid="about-beyond-blog-github-link"
                aria-label="Amanuel github Profile"
              >
                <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0"></span>

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white" data-testid="about-beyond-blog-github-link-text ">
                  View GitHub
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>


        <section className="max-w-5xl mx-auto px-6 mt-12 mb-16">
          <div className="bg-[#0b0c10] text-white rounded-3xl p-10 md:p-14 text-center flex flex-col items-center shadow-lg">
            <h3 className="text-xl md:text-xl font-extrabold tracking-tight" data-testid="about-beyond-blog-journey-title">
              If you're building real-world apps and care about performance, testing, and scalability — this is where I document my journey.
            </h3>
            <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl font-medium leading-relaxed" data-testid="about-beyond-blog-journey-description">
              Whether you're a student, developer or lifelong learner, I hope these articles help you build something meaningful.
            </p>
            <NavLink
              to="/blogs"
              className="mt-8 bg-white text-black font-bold py-3.5 px-6 rounded-xl transition-transform duration-150 active:scale-[0.98] hover:bg-gray-100 text-sm shadow-sm cursor-pointer"
              data-testid="about-beyond-blog-journey-link"
            >
              Browse Articles &nbsp; →
            </NavLink>
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutPage;