import { fail, redirect } from '@sveltejs/kit';
import { accounts } from '$lib/server/seed';
import { SESSION_COOKIE } from '$lib/server/session';
import type { Actions, PageServerLoad } from './$types';

function safeNext(value: string | null): string {
	return value && value.startsWith('/') && !value.startsWith('//') ? value : '/bookings';
}

export const load: PageServerLoad = ({ locals, url }) => {
	if (locals.user) redirect(303, safeNext(url.searchParams.get('next')));
	return { next: url.searchParams.get('next') ?? '' };
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();
		const password = String(form.get('password') ?? '');
		const account = accounts.find((a) => a.email === email && a.password === password);

		if (!account) return fail(400, { email, message: 'That email and password do not match an account.' });

		cookies.set(SESSION_COOKIE, account.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 24 * 7
		});
		redirect(303, safeNext(String(form.get('next') ?? '') || null));
	}
};
