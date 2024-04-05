import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://movies-database-seven.vercel.app/",
  plugins: [react()],

  // configuring the development server options using the server property
  build: {
    minify: true,
    target: "es2015",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // proxy: {
    //   "/api/": "http://localhost:3000",
    //   "/uploads": "http://localhost:3000",
    // }, // The proxy configuration redirects requests with specific paths to another server
  },
});
