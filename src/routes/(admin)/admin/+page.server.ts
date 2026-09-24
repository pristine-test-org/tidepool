import { accounts, bookings, seatsTaken, tours } from '$lib/server/seed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const roster = [...tours]
		.sort((a, b) => a.date.localeCompare(b.date))
		.map((tour) => ({
			tour,
			taken: seatsTaken(tour.slug),
			waitlist: bookings.filter((b) => b.tourSlug === tour.slug && b.status === 'waitlist').length
		}));
	const recent = [...bookings]
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.slice(0, 6)
		.map((booking) => ({
			booking,
			tour: tours.find((t) => t.slug === booking.tourSlug)!,
			guest: accounts.find((a) => a.id === booking.accountId)?.name ?? 'Unknown'
		}));
	const revenueCents = bookings
		.filter((b) => b.status === 'confirmed')
		.reduce((sum, b) => sum + b.guests * (tours.find((t) => t.slug === b.tourSlug)?.priceCents ?? 0), 0);
	return { roster, recent, revenueCents };
};
