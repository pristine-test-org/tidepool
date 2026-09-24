<script lang="ts">
	import TourCard from '$lib/components/TourCard.svelte';

	let { data } = $props();
</script>

<section class="relative overflow-hidden bg-ink-900 text-sand-50">
	<svg class="absolute inset-x-0 bottom-0 h-24 w-full" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0 48c180-40 360-40 540 0s360 40 540 0 270-30 360-10v58H0z" class="fill-sand-50" />
	</svg>
	<div class="relative mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-36 md:grid-cols-[1.3fr_1fr] md:items-center">
		<div>
			<p class="text-sm font-semibold tracking-widest text-accent-soft uppercase">Small groups · Low tides only</p>
			<h1 class="mt-5 text-5xl leading-[1.05] font-semibold sm:text-6xl">
				Walk the reef while the ocean steps back.
			</h1>
			<p class="mt-6 max-w-xl text-lg text-ink-300">
				Tidepool runs guided walks on the Northern California coast, timed to the lowest tides of the
				month. Twelve people at most, one naturalist, no lifting the wildlife.
			</p>
			<div class="mt-9 flex flex-wrap gap-3">
				<a href="/tours" class="rounded-base bg-accent-strong px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-accent-strong">
					See upcoming tides
				</a>
				<a href="/login" class="rounded-base border border-ink-500 px-6 py-3.5 font-semibold text-sand-50 hover:border-sand-50">
					Manage a booking
				</a>
			</div>
		</div>
		<dl class="grid grid-cols-2 gap-4">
			{#each [['−1.5 ft', 'Lowest tide this season'], ['12', 'Guests per walk, max'], ['4', 'Reef sites'], ['0', 'Animals lifted']] as [value, label]}
				<div class="rounded-card bg-sand-50 p-5">
					<dt class="text-sm text-ink-500">{label}</dt>
					<dd class="mt-2 font-display text-3xl font-semibold text-ink-900">{value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-16">
	<div class="flex items-end justify-between gap-4">
		<h2 class="text-3xl font-semibold">Next low tides</h2>
		<a href="/tours" class="text-sm font-semibold text-tide-600 hover:text-ink-900">All tours →</a>
	</div>
	<div class="mt-8 grid gap-6 md:grid-cols-3">
		{#each data.featured as { tour, seatsLeft } (tour.slug)}
			<TourCard {tour} {seatsLeft} />
		{/each}
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 pb-20">
	<div class="grid gap-8 rounded-card bg-kelp-100 p-8 md:grid-cols-3 md:p-12">
		{#each [['Check the tide', 'Every walk is scheduled around a negative or near-zero low.'], ['Meet the naturalist', 'A short briefing on the bluff: where to step, what to look for.'], ['Look, don’t lift', 'We use magnifiers and mirrors so the pools stay as we found them.']] as [title, body], i}
			<div>
				<p class="font-display text-4xl font-semibold text-kelp-500">0{i + 1}</p>
				<h3 class="mt-3 text-xl font-semibold text-kelp-700">{title}</h3>
				<p class="mt-2 text-ink-700">{body}</p>
			</div>
		{/each}
	</div>
</section>
