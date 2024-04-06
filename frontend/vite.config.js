// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "https://movies-database-frontend.vercel.app",
//   plugins: [react()],

//   // configuring the development server options using the server property
//   build: {
//     minify: true,
//     target: "es2015",
//     terserOptions: {
//       compress: {
//         drop_console: true,
//       },
//     },
//     // proxy: {
//     //   "/api/": "http://localhost:3000",
//     //   "/uploads": "http://localhost:3000",
//     // }, // The proxy configuration redirects requests with specific paths to another server
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "https://mern-movies-database-backend.onrender.com",

//   server: {
//     proxy: {
//       "/api/": "https://mern-movies-database-backend.onrender.com",
//       "/uploads": "https://mern-movies-database-backend.onrender.com",
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://mern-movies-database-backend.onrender.com",

  server: {
    proxy: {
      // Proxying API requests
      "/api": {
        target: "https://mern-movies-database-backend.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // Serving static files (uploads)
      "/uploads": {
        target: "https://mern-movies-database-backend.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ""),
      },
    },
  },
});
