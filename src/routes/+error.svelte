<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="mx-auto max-w-xl px-5 py-24 text-center">
	<p class="text-sm font-semibold tracking-wide text-accent-strong uppercase">{page.status}</p>
	<h1 class="mt-3 text-4xl font-semibold">{page.error?.message ?? 'Something went wrong'}</h1>
	<p class="mt-4 text-ink-500">The tide went out on this page.</p>
	<a href="/tours" class="mt-8 inline-block rounded-base bg-ink-900 px-5 py-3 font-medium text-sand-50">Browse tours</a>
</section>
