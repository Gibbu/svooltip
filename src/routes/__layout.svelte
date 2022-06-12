<script lang="ts">
	import {tooltip} from '$lib';
	import '$lib/svooltip.css';

	import '../app.css';

	let copied: boolean = false;
	const copy = async() => {
		await navigator.clipboard.writeText('npm install -D svooltip');
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000)
	}
</script>

<div class="p-16">
	<header class="mb-24">
		<h1 class="text-7xl font-semibold text-neutral-50 inline-flex">
			<span class="text-turquoise-500 text-glow">SV</span>ooltip
		</h1>
		<p class="text-lg mt-6">
			A basic
			<span class="text-[#ff3e00] text-glow" style="--glow: 15 100% 50%">Svelte</span>
			tooltip directive. Powered by
			<a href="https://floating-ui.com/" class="text-turquoise-500 underline text-glow" target="_blank" rel="noreferrer noopener">Floating UI</a>.</p>
		<div class="flex gap-4 mt-12">
			<button
				type="button"
				class="border border-neutral-700 hover:border-neutral-500 rounded px-8 py-2 relative flex items-center justify-center select-none"
				on:click={copy}
			>
				<span class="{copied ? 'invisible' : 'visible'}">$ npm install -D svooltip</span>
				<span class="{copied ? 'visible' : 'invisible'} absolute text-xs">(copied)</span>
			</button>
			<a
				href="https://github.com/Gibbu/svooltip"
				class="rounded px-3 py-2 border border-transparent hover:border-neutral-700 flex items-center"
				target="_blank"
				rel="noreferrer noopener"
				use:tooltip={{
					content: `View GitHub`,
					offset: 15,
					target: '#layers'
				}}
			>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current">
				<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
			</svg>
			</a>
		</div>
	</header>

	<article class="prose prose-invert prose-p:text-neutral-400 prose-h2:text-3xl prose-tr:border-neutral-700 prose-th:border-neutral-700 prose-thead:border-neutral-700 prose-th:text-lg prose-td:text-neutral-400 max-w-5xl prose-headings:font-medium">
		<slot />
	</article>

	<footer class="opacity-50 mt-24 flex justify-between gap-16">
		<p>Made by
			<a
				href="https://gibbu.me"
				class="text-turquoise-500 underline"
				target="_blank"
				rel="noreferrer noopener"
			>
				Gibbu
			</a>
		</p>
		<p>Edit this page on
			<a
				href="https://github.com/Gibbu/svooltip/blob/main/src/routes/index.md"
				class="text-turquoise-500 underline"
				target="_blank"
				rel="noreferrer noopener"
			>
				GitHub
			</a>
		</p>
	</footer>
</div>