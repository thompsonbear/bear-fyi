import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/posts/*/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-2);

		if (
			file &&
			typeof file === 'object' &&
			'metadata' in file &&
			slug &&
			path.endsWith(`${slug}.md`) // Directory Name must match File Name
		) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.visible && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.published).getTime() - new Date(first.published).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
