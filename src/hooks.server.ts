import type { Handle } from '@sveltejs/kit';
import { accounts, publicAccount } from '$lib/server/seed';
import { SESSION_COOKIE } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	const accountId = event.cookies.get(SESSION_COOKIE);
	const account = accountId ? accounts.find((a) => a.id === accountId) : undefined;
	event.locals.user = account ? publicAccount(account) : null;
	return resolve(event);
};
