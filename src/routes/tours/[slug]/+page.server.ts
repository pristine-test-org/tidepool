import { error, fail, redirect } from '@sveltejs/kit';
import { createBooking, findTour, seatsTaken } from '$lib/server/seed';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const tour = findTour(params.slug);
	if (!tour) error(404, 'Tour not found');
	return { tour, seatsLeft: Math.max(0, tour.capacity - seatsTaken(tour.slug)) };
};

export const actions: Actions = {
	book: async ({ params, request, locals, url }) => {
		if (!locals.user) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
		const tour = findTour(params.slug);
		if (!tour) error(404, 'Tour not found');

		const guests = Number((await request.formData()).get('guests'));
		if (!Number.isInteger(guests) || guests < 1 || guests > 6) {
			return fail(400, { message: 'Choose between 1 and 6 guests.' });
		}

		const booking = createBooking(tour.slug, locals.user.id, guests);
		redirect(303, `/bookings/${booking.id}`);
	}
};
