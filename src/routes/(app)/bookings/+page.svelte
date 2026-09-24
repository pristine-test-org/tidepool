<script lang="ts">
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { tourDate } from '$lib/format';

	let { data } = $props();
</script>

<svelte:head>
	<title>My bookings · Tidepool</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-5 py-14">
	<SectionHeading
		eyebrow="Signed in as {data.user.name}"
		title="My bookings"
		lede="Your upcoming walks. Arrive fifteen minutes early; the tide will not wait."
	>
		{#snippet actions()}
			<a href="/tours" class="rounded-base bg-ink-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-kelp-700">Book another</a>
		{/snippet}
	</SectionHeading>

	{#if data.mine.length}
		<ul class="mt-10 divide-y divide-sand-200 rounded-card border border-sand-200 bg-white">
			{#each data.mine as { booking, tour } (booking.id)}
				<li>
					<a href="/bookings/{booking.id}" class="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-sand-50">
						<div>
							<p class="font-semibold text-ink-900">{tour.name}</p>
							<p class="mt-1 text-sm text-ink-500">{tourDate(tour.date)} · {tour.site}</p>
						</div>
						<div class="flex items-center gap-4 text-sm">
							<span class="text-ink-700">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
							<StatusBadge status={booking.status} />
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mt-10 rounded-card border border-dashed border-sand-300 p-10 text-center text-ink-500">
			No bookings yet. <a href="/tours" class="font-semibold text-tide-600">Find a low tide</a>.
		</p>
	{/if}
</section>
