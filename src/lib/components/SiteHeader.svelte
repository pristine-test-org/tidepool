<script lang="ts">
	import { page } from '$app/state';

	let { user }: { user: App.Locals['user'] } = $props();

	const links = $derived([
		{ href: '/tours', label: 'Tours' },
		...(user ? [{ href: '/bookings', label: 'My bookings' }] : []),
		...(user?.role === 'owner' ? [{ href: '/admin', label: 'Owner desk' }] : [])
	]);
</script>

<header class="border-b border-sand-200 bg-sand-50/90 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
		<a href="/" class="flex items-center gap-2.5 text-ink-900">
			<svg viewBox="0 0 32 32" class="size-8" aria-hidden="true">
				<rect width="32" height="32" rx="8" class="fill-ink-900" />
				<path d="M5 19c3.5-4 7.5-4 11 0s7.5 4 11 0" fill="none" class="stroke-accent-soft" stroke-width="3" stroke-linecap="round" />
				<circle cx="16" cy="11" r="3" class="fill-kelp-100" />
			</svg>
			<span class="font-display text-xl font-semibold">Tidepool</span>
		</a>

		<nav class="flex items-center gap-1 text-sm font-medium">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-pill px-3.5 py-2 transition-colors {page.url.pathname.startsWith(link.href)
						? 'bg-ink-900 text-sand-50'
						: 'text-ink-700 hover:bg-sand-100'}"
				>
					{link.label}
				</a>
			{/each}

			{#if user}
				<form method="POST" action="/logout" class="ml-2 flex items-center gap-3 border-l border-sand-200 pl-4">
					<span class="hidden text-ink-500 sm:inline">{user.name}</span>
					<button class="rounded-pill px-3 py-2 text-ink-700 hover:bg-sand-100">Sign out</button>
				</form>
			{:else}
				<a href="/login" class="ml-2 rounded-pill bg-accent-strong px-4 py-2 text-white hover:bg-ink-900">Sign in</a>
			{/if}
		</nav>
	</div>
</header>
