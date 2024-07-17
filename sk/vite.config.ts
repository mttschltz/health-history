import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import fs from "fs";

// detect if we're running inside docker and set the backend accordingly
const pocketbase_url = fs.existsSync("/.dockerenv")
  ? "http://0.0.0.0:8090" // docker-to-docker
  : // 'pb' was the default and is probably needed when using docker compose
    // ? "http://pb:8090" // docker-to-docker
    "http://127.0.0.1:8090"; // localhost-to-localhost

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    proxy: {
      // proxy "/api" and "/_" to pocketbase_url
      "/api": pocketbase_url,
      "/_": pocketbase_url,
    },
  },
};

export default config;
