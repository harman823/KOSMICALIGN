import { defineConfig, loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const frontendRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(frontendRoot, "../backend");
  const env = loadEnv(mode, envDir, "");

  return {
    envDir,
    define: {
      "import.meta.env.VITE_RAZORPAY_KEY_ID": JSON.stringify(
        env.RAZORPAY_KEY_ID,
      ),
    },
    server: {
      proxy: {
        "/api": "http://localhost:3000",
      },
    },
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        "@": path.resolve(frontendRoot, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 650,
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ["**/*.svg", "**/*.csv"],
  };
});
