<script lang="ts">
	import { Separator } from '$lib/comps/ui/separator/index.js';
	import Button from '$lib/comps/ui/button/button.svelte';
	import 'iconify-icon';
	import type { Link } from '$lib/types';
	const { navlinks } = $props();

	let sociallinks: Link[] = [
		{
			text: 'bluesky @thompsonbear.com',
			href: 'https://bsky.app/profile/thompsonbear.com',
			icon: 'mingcute:bluesky-social-fill',
			new_tab: true
		},
		{
			text: 'github @thompsonbear',
			href: 'https://github.com/thompsonbear',
			icon: 'mingcute:github-2-fill',
			new_tab: true
		},
		{
			text: 'linkedin @thompsonbear',
			href: 'https://www.linkedin.com/in/thompsonbear/',
			icon: 'mingcute:linkedin-fill',
			new_tab: true
		}
	];

	let currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="flex">
		<div class="h-10 flex-grow rounded-tr-md bg-primary bg-noise"></div>
		<div class="flex h-10 w-full max-w-[1200px]">
			<div class="flex flex-col">
				<a
					href="/"
					class="flex h-12 w-fit items-end rounded-md bg-background bg-noise p-4 font-title text-lg"
				>
					<span class=" font-medium">bear</span>
					<span class="mb-1.5 mr-0.5 h-1.5 w-1.5 rounded-full bg-primary"></span><span>fyi</span>
				</a>
			</div>

			<div
				class="flex h-10 flex-grow items-center justify-between rounded-tl-md bg-primary bg-noise px-4 pt-2 font-medium"
			>
				<span class="hidden font-marker text-2xl text-primary-foreground md:inline-block"
					>Blog - Thompson Bear</span
				>
				<div class="flex flex-grow items-center justify-between gap-2 xs:justify-end">
					{#each sociallinks as link}
						<a
							href={link.href}
							aria-label={link.text}
							class="group relative text-3xl leading-5"
							target={link.new_tab ? '_blank' : ''}
						>
							<iconify-icon
								class="text-primary-foreground transition-transform group-hover:scale-110"
								icon={link.icon}
							></iconify-icon>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="h-10 flex-grow bg-primary bg-noise"></div>
	</div>

	<div class="flex w-full flex-col items-center bg-primary bg-noise">
		<div class="flex h-12 w-full max-w-[1200px] items-center justify-end">
			{#each navlinks as link}
				<Button href={link.href} variant="link" class="text-base text-primary-foreground">
					<span class="text-primary-foreground">{link.text}</span>
				</Button>
			{/each}
		</div>
		<Separator class="max-w-[1200px] bg-primary-foreground"></Separator>
		<div
			class="flex h-12 w-full max-w-[1200px] items-center justify-between px-4 text-sm text-primary-foreground"
		>
			<span class="">©{currentYear} Thompson Bear</span>
			<Button
				variant="link"
				class="h-fit bg-transparent px-0 py-1 text-primary-foreground"
				href="https://github.com/thompsonbear/bear-fyi"
			>
				<iconify-icon icon="mingcute:code-line"></iconify-icon>
				Source
			</Button>
		</div>
	</div>
</footer>
