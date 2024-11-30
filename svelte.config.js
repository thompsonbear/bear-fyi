import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';

import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [[remarkToc, { tight: true }]],
			rehypePlugins: [rehypeSlug],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const highlighter = await createHighlighter({
						themes: ['vesper'],
						langs: ['javascript', 'typescript']
					});
					await highlighter.loadLanguage('javascript', 'typescript');
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'vesper' }));
					return `{@html \`${html}\` }`;
				}
			}
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: azure()
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
