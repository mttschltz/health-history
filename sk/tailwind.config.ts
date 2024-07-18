import { join } from "path";
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin";

// Hack to avoid 'require' error below, despite @types/node being installed.
declare var require: any;

export default {
  // 2. Opt for dark mode to be handled via the class method
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    // 3. Append the path to the Skeleton package
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],

  theme: {
    extend: {},
  },

  plugins: [
    require("@tailwindcss/typography"),
    forms,
    // 4. Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        preset: [
          "skeleton",
          { name: "modern", enhancements: true },
          "crimson",
          "gold-nouveau",
          "hamlindigo",
          "rocket",
          "sahara",
          "seafoam",
          "vintage",
          "wintry",
        ],
      },
    }),
  ],
} as Config;
