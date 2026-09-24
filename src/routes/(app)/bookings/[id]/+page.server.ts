import { error, redirect } from '@sveltejs/kit';
import { bookings, findTour } from '$lib/server/seed';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();
	const booking = bookings.find((b) => b.id === params.id);
	if (!booking || (booking.accountId !== user.id && user.role !== 'owner')) error(404, 'Booking not found');
	return { booking, tour: findTour(booking.tourSlug)! };
};

export const actions: Actions = {
	cancel: ({ params, locals }) => {
		const booking = bookings.find((b) => b.id === params.id);
		if (!booking || !locals.user || booking.accountId !== locals.user.id) error(404, 'Booking not found');
		booking.status = 'cancelled';
		redirect(303, `/bookings/${booking.id}`);
	}
};
