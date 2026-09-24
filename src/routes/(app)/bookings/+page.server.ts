import { bookings, findTour } from '$lib/server/seed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const mine = bookings
		.filter((b) => b.accountId === user.id)
		.map((booking) => ({ booking, tour: findTour(booking.tourSlug)! }))
		.sort((a, b) => a.tour.date.localeCompare(b.tour.date));
	return { mine };
};
