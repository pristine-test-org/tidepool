<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		lede,
		actions
	}: { eyebrow?: string; title: string; lede?: string; actions?: Snippet } = $props();
</script>

<div class="flex flex-wrap items-end justify-between gap-4">
	<div class="max-w-2xl">
		{#if eyebrow}
			<p class="mb-3 inline-block rounded-[3px] bg-kelp-100 px-2 py-1 text-xs font-semibold tracking-wide text-kelp-700 uppercase">
				{eyebrow}
			</p>
		{/if}
		<h1 class="text-4xl font-semibold text-ink-900 sm:text-5xl">{title}</h1>
		{#if lede}
			<p class="mt-3 text-lg text-[#9aa0a6]">{lede}</p>
		{/if}
	</div>
	{#if actions}
		<div class="flex gap-3">{@render actions()}</div>
	{/if}
</div>
