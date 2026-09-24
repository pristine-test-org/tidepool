import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// The (admin) group is for the owner account only.
export const load: LayoutServerLoad = ({ locals, url }) => {
	if (!locals.user) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
	if (locals.user.role !== 'owner') error(403, 'Owners only');
	return { user: locals.user };
};
