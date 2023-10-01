import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'svelte-codemirror-editor',
			'@codemirror/lang-json',
			'@codemirror/theme-one-dark',
			'@codemirror/lang-html'
		]
	}
});
