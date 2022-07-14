import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$scss: path.resolve('./src/scss'),
			$config: path.resolve('./src/config'),
			$types: path.resolve('./src/types')
		}
	}
};

export default config;
