<script lang="ts">
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import TourCard from '$lib/components/TourCard.svelte';

	let { data } = $props();

	const levels = ['Easy', 'Moderate', 'Rocky'];
</script>

<svelte:head>
	<title>Tours · Tidepool</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5 py-14">
	<SectionHeading
		eyebrow="Autumn season"
		title="Upcoming tours"
		lede="Every date below is set by the tide table. Book early for the negative lows; they fill first."
	/>

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
		<a
			href="/tours"
			class="rounded-pill border px-4 py-2 text-sm font-medium {data.level
				? 'border-sand-200 text-ink-700 hover:border-sand-300'
				: 'border-ink-900 bg-ink-900 text-sand-50'}">All</a
		>
		{#each levels as level}
			<a
				href="/tours?level={level}"
				class="rounded-pill border px-4 py-2 text-sm font-medium {data.level === level
					? 'border-ink-900 bg-ink-900 text-sand-50'
					: 'border-sand-200 text-ink-700 hover:border-sand-300'}">{level}</a
			>
		{/each}
	</div>

	{#if data.list.length}
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.list as { tour, seatsLeft } (tour.slug)}
				<TourCard {tour} {seatsLeft} />
			{/each}
		</div>
	{:else}
		<p class="mt-10 rounded-card border border-dashed border-sand-300 p-10 text-center text-ink-500">
			No {data.level?.toLowerCase()} tours this season.
		</p>
	{/if}
</section>
