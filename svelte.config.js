import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: 'src/routes/blog/post.svelte'
      }
    })
  ],

  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/personal-site' : '',
    },
    alias: {
      "~": "src",
    },
  },
};

export default config;
