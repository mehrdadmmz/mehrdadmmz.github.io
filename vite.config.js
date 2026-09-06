import { defineConfig } from "vite";
import { cpSync, existsSync } from "node:fs";

// Keep clean, stable public URLs for the identity assets used by social previews.
export default defineConfig({
  base: "./",
  plugins: [
    {
      name: "copy-public-identity",
      closeBundle() {
        for (const file of [
          "favicon.svg",
          "favicon.png",
          "apple-touch-icon.png",
        ]) {
          if (existsSync(file)) cpSync(file, `dist/${file}`);
        }
        if (existsSync("assets/social-preview.png"))
          cpSync("assets/social-preview.png", "dist/assets/social-preview.png");
      },
    },
  ],
});
