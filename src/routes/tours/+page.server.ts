import { tours, seatsTaken } from '$lib/server/seed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const level = url.searchParams.get('level');
	const list = tours
		.filter((tour) => !level || tour.difficulty === level)
		.sort((a, b) => a.date.localeCompare(b.date))
		.map((tour) => ({ tour, seatsLeft: Math.max(0, tour.capacity - seatsTaken(tour.slug)) }));
	return { list, level };
};
