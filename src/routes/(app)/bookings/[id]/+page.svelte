<script lang="ts">
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { duration, price, tourDate } from '$lib/format';

	let { data } = $props();
	const booking = $derived(data.booking);
	const tour = $derived(data.tour);
</script>

<svelte:head>
	<title>Booking {booking.id} · Tidepool</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-5 py-14">
	<a href="/bookings" class="text-sm font-semibold text-tide-600 hover:text-ink-900">← My bookings</a>

	<div class="mt-6 rounded-card border border-sand-200 bg-white shadow-card">
		<div class="flex flex-wrap items-start justify-between gap-4 border-b border-sand-200 p-8">
			<div>
				<p class="text-sm text-ink-500">Booking {booking.id}</p>
				<h1 class="mt-1 text-3xl font-semibold">{tour.name}</h1>
			</div>
			<StatusBadge status={booking.status} />
		</div>

		<dl class="grid gap-6 p-8 sm:grid-cols-2">
			{#each [['When', tourDate(tour.date)], ['Where', tour.site], ['Party', `${booking.guests} ${booking.guests === 1 ? 'guest' : 'guests'}`], ['Length', duration(tour.durationMinutes)], ['Low tide', tour.lowTide], ['Total', price(tour.priceCents * booking.guests)]] as [label, value]}
				<div>
					<dt class="text-xs font-semibold tracking-wide text-ink-500 uppercase">{label}</dt>
					<dd class="mt-1 text-lg text-ink-900">{value}</dd>
				</div>
			{/each}
		</dl>

		{#if booking.status !== 'cancelled' && booking.accountId === data.user.id}
			<form method="POST" action="?/cancel" class="flex items-center justify-between gap-4 rounded-b-card bg-sand-100 p-6">
				<p class="text-sm text-ink-700">Plans changed? Cancel up to 48 hours before the low for a full refund.</p>
				<button class="rounded-base border border-danger px-4 py-2 text-sm font-semibold text-danger hover:bg-accent-soft">Cancel booking</button>
			</form>
		{/if}
	</div>
</section>
