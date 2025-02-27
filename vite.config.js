import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000, // Vite-Frontend auf Port 3000
    proxy: {
      "/view": {
        target: "http://localhost:5000", // Backend auf Port 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
