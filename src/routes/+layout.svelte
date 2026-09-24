<script lang="ts">
	import '../app.css';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<title>Tidepool · Guided tide-pool walks</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<SiteHeader user={data.user} />
	<main class="flex-1">
		{@render children()}
	</main>
</div>
