import { pastWalks } from '$lib/server/seed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const walks = pastWalks
		.filter((walk) => walk.accountId === user.id)
		.sort((a, b) => b.date.localeCompare(a.date));
	return { walks };
};
