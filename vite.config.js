import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Codespaces serves forwarded ports from *.app.github.dev; Vite rejects unknown hosts by default.
    allowedHosts: [".app.github.dev"],
  },
});
