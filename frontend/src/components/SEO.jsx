import React from "react";
import { Helmet } from "react-helmet-async";

// Prevents raw string evaluation issues inside HTML script tags
const cleanJsonLd = (obj) => {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
};

const SEO = ({
  title = "Aman Blog",
  description = "Aman Blog shares modern frontend engineering and fullstack development tutorials focused on React, Node.js, performance optimization, testing, and scalable web applications.",
  canonicalUrl = "https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app",
  ogType = "website",
  ogImage = "https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app/og-image.png",
  articleData,
  breadcrumbs = [],
}) => {
  const siteName = "Aman Blog";
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  // Website Author / Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app/#person",
    name: "Amanuel Amare",
    url: "https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app",
    image: "https://aman-blog-q9sde5ao0-amanuel-amares-projects.vercel.app/og-image.png",
    jobTitle: "Fullstack Developer",
    description: "Software engineer writing about React architecture, Node.js APIs, performance optimization, testing strategies, and scalable web applications.",
    sameAs: [
      "https://x.com/AmanuelAma66386",
      "https://github.com/amanuel1221",
      "https://web.facebook.com/manuelll211",
      "https://linkedin.com/in/amanuel-amare-684234372",
      "https://amanuel-portfolio-flame.vercel.app/",
    ],
    knowsAbout: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vitest",
      "Frontend Engineering",
      "Fullstack Development",
      "Web Performance Optimization",
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      }
    : null;

  // Blog Article Schema
  const articleSchema = articleData
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}/#article`,
        headline: articleData.title || title,
        description: articleData.excerpt || description,
        image: [articleData.coverImage?.url || ogImage],
        datePublished: articleData.createdAt,
        dateModified: articleData.updatedAt || articleData.createdAt,
        author: {
          "@type": "Person",
          name: articleData.author?.name || "Amanuel Amare",
          url: "https://amanuel-portfolio-flame.vercel.app/",
        },
        publisher: {
          "@type": "Person",
          name: "Amanuel Amare",
          url: "https://amanuel-portfolio-flame.vercel.app/",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        keywords: articleData.tags?.join(", ") || "React, Node.js, Fullstack Development",
        articleSection: articleData.category || "Web Development",
      }
    : null;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Amanuel Amare" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@AmanuelAma66386" />

      {/* Mobile styling */}
      <meta name="theme-color" content="#111827" />

      {/* Structured Data Scripts with Sanitization */}
      <script type="application/ld+json">{cleanJsonLd(personSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{cleanJsonLd(breadcrumbSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{cleanJsonLd(articleSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;