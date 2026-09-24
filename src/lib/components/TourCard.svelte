<script lang="ts">
	import type { Tour } from '$lib/server/seed';
	import { duration, price, tourDate } from '$lib/format';

	let { tour, seatsLeft }: { tour: Tour; seatsLeft: number } = $props();
</script>

<a
	href="/tours/{tour.slug}"
	class="group flex flex-col overflow-hidden rounded-card border border-sand-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:border-sand-300"
>
	<div class="relative aspect-[2/1] bg-tide-100">
		<img src="/tours/{tour.slug}.svg" alt="" class="size-full object-cover transition group-hover:scale-105" loading="lazy" />
		<span class="absolute top-3 left-3 rounded-pill bg-ink-900/85 px-2.5 py-1 text-xs font-semibold text-sand-50">{tour.difficulty}</span>
	</div>
	<div class="flex flex-1 flex-col p-6">
		<div class="flex items-center justify-between text-sm">
			<span class="font-medium text-tide-600">{tourDate(tour.date)}</span>
			<span class="rounded-pill bg-tide-100 px-2.5 py-0.5 font-semibold text-tide-600">Low {tour.lowTide}</span>
		</div>

		<h2 class="mt-4 text-2xl font-semibold text-ink-900 group-hover:text-accent-strong">{tour.name}</h2>
		<p class="mt-1 text-sm text-ink-500">{tour.site}</p>
		<p class="mt-4 flex-1 text-ink-700">{tour.summary}</p>

		<div class="mt-6 flex items-center justify-between border-t border-sand-100 pt-4 text-sm">
			<span class="text-ink-500">{duration(tour.durationMinutes)}</span>
			<span class="font-semibold text-ink-900">{price(tour.priceCents)}</span>
		</div>
		<p class="mt-2 text-xs font-medium {seatsLeft > 0 ? 'text-kelp-700' : 'text-accent-strong'}">
			{seatsLeft > 0 ? `${seatsLeft} spots left` : 'Waitlist only'}
		</p>
	</div>
</a>
