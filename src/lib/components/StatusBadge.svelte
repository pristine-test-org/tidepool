<script lang="ts">
	let { status }: { status: 'confirmed' | 'waitlist' | 'cancelled' } = $props();

	const styles = {
		confirmed: 'bg-kelp-100 text-kelp-700',
		waitlist: 'bg-accent-soft text-accent-strong',
		cancelled: 'bg-sand-200 text-ink-500'
	} as const;
</script>

<span class="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold capitalize {styles[status]}">
	<span class="size-1.5 rounded-pill bg-current"></span>
	{status}
</span>
