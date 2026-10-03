<script lang="ts">
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { price, tourDate } from '$lib/format';

	let { data } = $props();

	const seatsSold = $derived(data.roster.reduce((sum, r) => sum + r.taken, 0));
	const waitlisted = $derived(data.roster.reduce((sum, r) => sum + r.waitlist, 0));
	const capacity = $derived(data.roster.reduce((sum, r) => sum + r.tour.capacity, 0));
	const fillRate = $derived(capacity ? Math.round((seatsSold / capacity) * 100) : 0);
</script>

<svelte:head>
	<title>Owner desk · Tidepool</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5 py-14">
	<SectionHeading eyebrow="Owner" title="Owner desk" lede="Capacity, waitlists and recent bookings across every walk this season." />

	<dl class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-card bg-ink-900 p-6 text-sand-50">
			<dt class="text-sm text-ink-300">Season fill rate</dt>
			<dd class="mt-2 font-display text-4xl font-semibold">{fillRate}%</dd>
			<div class="mt-4 h-1.5 overflow-hidden rounded-pill bg-ink-700">
				<div class="h-full rounded-pill bg-kelp-100" style="width: {fillRate}%"></div>
			</div>
		</div>
		{#each [['Seats sold', String(seatsSold)], ['On waitlists', String(waitlisted)], ['Confirmed revenue', price(data.revenueCents)]] as [label, value]}
			<div class="rounded-card border border-sand-200 bg-white p-6">
				<dt class="text-sm text-ink-500">{label}</dt>
				<dd class="mt-2 font-display text-4xl font-semibold text-ink-900">{value}</dd>
			</div>
		{/each}
	</dl>

	<div class="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
		<div class="rounded-card border border-sand-200 bg-white p-6">
			<h2 class="text-xl font-semibold">Capacity by walk</h2>
			<ul class="mt-6 space-y-5">
				{#each data.roster as { tour, taken, waitlist } (tour.slug)}
					<li>
						<div class="flex items-baseline justify-between gap-4 text-sm">
							<span class="font-medium text-ink-900">{tour.name}</span>
							<span class="text-ink-500">{taken}/{tour.capacity}{waitlist ? ` · ${waitlist} waiting` : ''}</span>
						</div>
						<div class="mt-2 h-2 overflow-hidden rounded-pill bg-sand-100">
							<div
								class="h-full rounded-pill {taken >= tour.capacity
									? 'bg-accent-strong'
									: taken / tour.capacity >= 0.75
										? 'bg-tide-600'
										: 'bg-kelp-500'}"
								style="width: {Math.min(100, (taken / tour.capacity) * 100)}%"
							></div>
						</div>
						<p class="mt-1 text-xs text-ink-500">{tourDate(tour.date)}</p>
					</li>
				{/each}
			</ul>
		</div>

		<div class="rounded-card border border-sand-200 bg-white p-6">
			<h2 class="text-xl font-semibold">Recent bookings</h2>
			<ul class="mt-4 divide-y divide-sand-100">
				{#each data.recent as { booking, tour, guest } (booking.id)}
					<li class="flex items-center justify-between gap-3 py-3 text-sm">
						<div>
							<a href="/bookings/{booking.id}" class="font-medium text-ink-900 hover:text-tide-600">{guest}</a>
							<p class="text-ink-500">{tour.name} · {booking.guests}</p>
						</div>
						<StatusBadge status={booking.status} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
