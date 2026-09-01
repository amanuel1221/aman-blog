import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_URL = env.VITE_API_URL;

  if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
  }

  // Get only the API origin
  // Example:
  // http://localhost:5000
  // https://api.amanblog.com
  const API_ORIGIN = new URL(API_URL).origin;

  // Escape special regex characters
  const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const API = escapeRegex(API_ORIGIN);

  return {
    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          id: "/",
          name: "Aman Blog",
          short_name: "Aman Blog",

          description:
            "A personal blog for sharing articles, ideas, and knowledge.",

          start_url: "/",
          scope: "/",
          display: "standalone",

          theme_color: "#111827",
          background_color: "#ffffff",

          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },

        workbox: {
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}",
          ],

          runtimeCaching: [
            // ==========================================
            // ALL BLOG POSTS
            // GET /posts
            // ==========================================
            {
              urlPattern: new RegExp(
                `^${API}/posts(?:\\?.*)?$`
              ),

              handler: "NetworkFirst",

              options: {
                cacheName: "aman-blog-posts",

                networkTimeoutSeconds: 5,

                cacheableResponse: {
                  statuses: [200],
                },

                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24,
                },
              },
            },

            // ==========================================
            // SINGLE POST
            // GET /posts/:slug
            // ==========================================
            {
              urlPattern: new RegExp(
                `^${API}/posts/[^/]+(?:\\?.*)?$`
              ),

              handler: "NetworkFirst",

              options: {
                cacheName: "aman-blog-single-posts",

                networkTimeoutSeconds: 5,

                cacheableResponse: {
                  statuses: [200],
                },

                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
              },
            },

            // ==========================================
            // COMMENTS
            // GET /api/posts/:postId/comments
            // ==========================================
            {
              urlPattern: new RegExp(
                `^${API}/api/posts/[^/]+/comments(?:\\?.*)?$`
              ),

              handler: "NetworkFirst",

              options: {
                cacheName: "aman-blog-comments",

                networkTimeoutSeconds: 5,

                cacheableResponse: {
                  statuses: [200],
                },

                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 6,
                },
              },
            },

            // ==========================================
            // BLOG IMAGES
            // ==========================================
            {
              urlPattern:
                /\.(?:png|jpg|jpeg|svg|webp|gif)$/i,

              handler: "CacheFirst",

              options: {
                cacheName: "aman-blog-images",

                cacheableResponse: {
                  statuses: [0, 200],
                },

                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
    ],

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.js",
    },
  };
});