<script lang="ts">
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

	import 'iconify-icon';
</script>

<footer>
	<div class="flex">
		<div class="h-10 flex-grow rounded-tr-md bg-primary bg-noise"></div>
		<div class="flex h-10 w-full max-w-[1200px]">
			<div class="flex flex-col">
				<a href="/" class="flex h-12 w-fit items-end rounded-md bg-background bg-noise p-4">
					<span class="font-title text-lg font-medium leading-6">bear</span>
					<span class="mb-1 mr-0.5 h-1.5 w-1.5 rounded-full bg-primary"></span><span
						class="text-lg leading-[1.35rem]">fyi</span
					>
				</a>
			</div>

			<div
				class="flex h-12 flex-grow items-center justify-between rounded-tl-md bg-primary bg-noise px-4 font-medium"
			>
				<div class="font-semibold">
					<span class="text-secondary">blog of&nbsp;</span><span>@thompsonbear</span>
				</div>
				<div class="flex items-center gap-2">
					{#each sociallinks as link}
						<a
							href={link.href}
							aria-label={link.text}
							class="group relative text-3xl leading-5"
							target={link.new_tab ? '_blank' : ''}
						>
							<iconify-icon class="transition-transform group-hover:scale-110" icon={link.icon}
							></iconify-icon>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="h-10 flex-grow bg-primary bg-noise"></div>
	</div>

	<div class="h-52 w-full bg-primary bg-noise">
		<div class="max-w-[1200px]"></div>
	</div>
</footer>
