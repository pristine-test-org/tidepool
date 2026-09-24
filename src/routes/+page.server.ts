import { tours, seatsTaken } from '$lib/server/seed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const next = [...tours].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
	return {
		featured: next.map((tour) => ({ tour, seatsLeft: Math.max(0, tour.capacity - seatsTaken(tour.slug)) }))
	};
};
