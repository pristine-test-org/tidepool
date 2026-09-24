<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Sign in · Tidepool</title>
</svelte:head>

<section class="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
	<div>
		<h1 class="text-4xl font-semibold">Welcome back to the shore.</h1>
		<p class="mt-4 text-lg text-ink-500">Sign in to see your bookings, change your party size or join a waitlist.</p>
		<div class="mt-8 rounded-card bg-tide-100 p-5 text-sm text-ink-700">
			<p class="font-semibold text-tide-600">Demo accounts</p>
			<p class="mt-2">Guest: guest@tidepool.test / tidepool-guest</p>
			<p>Owner: owner@tidepool.test / tidepool-owner</p>
		</div>
	</div>

	<form method="POST" class="rounded-card border border-sand-200 bg-white p-8 shadow-card">
		<input type="hidden" name="next" value={data.next} />
		<label class="block text-sm font-medium text-ink-700">
			Email
			<input
				name="email"
				type="email"
				autocomplete="username"
				required
				value={form?.email ?? ''}
				class="mt-1.5 w-full rounded-base border border-sand-300 bg-sand-50 px-3 py-2.5 text-ink-900"
			/>
		</label>
		<label class="mt-5 block text-sm font-medium text-ink-700">
			Password
			<input
				name="password"
				type="password"
				autocomplete="current-password"
				required
				class="mt-1.5 w-full rounded-base border border-sand-300 bg-sand-50 px-3 py-2.5 text-ink-900"
			/>
		</label>
		{#if form?.message}
			<p class="mt-4 rounded-base bg-accent-soft px-3 py-2 text-sm text-danger" role="alert">{form.message}</p>
		{/if}
		<button class="mt-6 w-full rounded-base bg-ink-900 px-5 py-3 font-semibold text-sand-50 hover:bg-kelp-700">Sign in</button>
	</form>
</section>
