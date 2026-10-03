<script lang="ts">
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import { tourDate } from '$lib/format';

	let { data } = $props();

	const species = $derived(new Set(data.walks.flatMap((walk) => walk.sightings)).size);
</script>

<svelte:head>
	<title>Past walks · Tidepool</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-5 py-14">
	<a href="/bookings" class="text-sm font-semibold text-tide-600 hover:text-ink-900">← My bookings</a>
	<div class="mt-6">
		<SectionHeading
			eyebrow="Your logbook"
			title="Past walks"
			lede="Every low tide you have walked with us, and what the group found."
		/>
	</div>

	{#if data.walks.length}
		<dl class="mt-10 grid grid-cols-2 gap-4">
			<div class="rounded-card bg-kelp-100 p-6">
				<dt class="text-sm text-kelp-700">Walks completed</dt>
				<dd class="mt-2 font-display text-4xl font-semibold text-kelp-700">{data.walks.length}</dd>
			</div>
			<div class="rounded-card bg-tide-100 p-6">
				<dt class="text-sm text-tide-600">Species spotted</dt>
				<dd class="mt-2 font-display text-4xl font-semibold text-tide-600">{species}</dd>
			</div>
		</dl>

		<ol class="mt-10 space-y-6 border-l-2 border-sand-200 pl-6">
			{#each data.walks as walk (walk.id)}
				<li class="relative">
					<span class="absolute top-2 -left-[calc(1.5rem+5px)] size-2 rounded-pill bg-kelp-500"></span>
					<p class="text-sm text-ink-500">{tourDate(walk.date)} · {walk.guests} {walk.guests === 1 ? 'guest' : 'guests'}</p>
					<h2 class="mt-1 text-xl font-semibold text-ink-900">{walk.tourName}</h2>
					<p class="text-sm text-ink-500">{walk.site}</p>
					<ul class="mt-3 flex flex-wrap gap-2">
						{#each walk.sightings as sighting}
							<li class="rounded-pill border border-sand-200 bg-white px-3 py-1 text-sm text-ink-700">{sighting}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
	{:else}
		<p class="mt-10 rounded-card border border-dashed border-sand-300 p-10 text-center text-ink-500">
			No past walks yet. Your first low tide will show up here.
		</p>
	{/if}
</section>
