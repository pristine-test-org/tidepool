<script lang="ts">
	import { duration, price, tourDate } from '$lib/format';

	let { data, form } = $props();
	const tour = $derived(data.tour);
</script>

<svelte:head>
	<title>{tour.name} · Tidepool</title>
</svelte:head>

<article class="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_22rem]">
	<div>
		<a href="/tours" class="text-sm font-semibold text-tide-600 hover:text-ink-900">← All tours</a>
		<p class="mt-6 text-sm font-semibold tracking-wide text-kelp-700 uppercase">{tour.site}</p>
		<h1 class="mt-2 text-4xl font-semibold sm:text-5xl">{tour.name}</h1>
		<p class="mt-5 text-lg text-ink-700">{tour.description}</p>

		<dl class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
			{#each [['Date', tourDate(tour.date)], ['Low tide', tour.lowTide], ['Length', duration(tour.durationMinutes)], ['Terrain', tour.difficulty]] as [label, value]}
				<div class="rounded-base border border-sand-200 bg-white p-4">
					<dt class="text-xs font-semibold tracking-wide text-ink-500 uppercase">{label}</dt>
					<dd class="mt-1 font-semibold text-ink-900">{value}</dd>
				</div>
			{/each}
		</dl>

		<h2 class="mt-12 text-2xl font-semibold">What we usually find</h2>
		<ul class="mt-4 space-y-3">
			{#each tour.highlights as item}
				<li class="flex items-center gap-3 text-ink-700">
					<span class="size-2 rounded-pill bg-kelp-500"></span>{item}
				</li>
			{/each}
		</ul>
	</div>

	<aside class="h-fit rounded-card border border-sand-200 bg-white p-6 shadow-card lg:sticky lg:top-6">
		<p class="font-display text-3xl font-semibold">{price(tour.priceCents)}<span class="text-base font-normal text-ink-500"> / person</span></p>
		<p class="mt-2 text-sm {data.seatsLeft > 0 ? 'text-kelp-700' : 'text-accent-strong'}">
			{data.seatsLeft > 0 ? `${data.seatsLeft} of ${tour.capacity} spots left` : 'Full. New bookings join the waitlist.'}
		</p>

		<form method="POST" action="?/book" class="mt-6 space-y-4">
			<label class="block text-sm font-medium text-ink-700">
				Guests
				<select name="guests" class="mt-1.5 w-full rounded-base border border-sand-300 bg-sand-50 px-3 py-2.5 text-ink-900">
					{#each [1, 2, 3, 4, 5, 6] as n}
						<option value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
					{/each}
				</select>
			</label>
			{#if form?.message}
				<p class="text-sm text-danger">{form.message}</p>
			{/if}
			<button class="w-full rounded-base bg-ink-900 px-5 py-3 font-semibold text-sand-50 hover:bg-kelp-700">
				{data.user ? 'Book this walk' : 'Sign in to book'}
			</button>
		</form>
		<p class="mt-4 text-xs text-ink-500">Free cancellation until 48 hours before the low.</p>
	</aside>
</article>
