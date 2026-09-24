import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Everything in the (app) group needs a signed-in account.
export const load: LayoutServerLoad = ({ locals, url }) => {
	if (!locals.user) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
	return { user: locals.user };
};
