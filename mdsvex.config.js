import { defineMDSveXConfig as defineConfig } from "mdsvex";
import prism from 'prismjs';
import 'prism-svelte';
import slug from 'rehype-slug';

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [slug],
});

export default config;
