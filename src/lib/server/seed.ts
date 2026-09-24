// In-memory seed data. Everything resets when the server restarts.

export type Role = 'owner' | 'guest';

export interface Account {
	id: string;
	email: string;
	password: string;
	name: string;
	role: Role;
}

export interface Tour {
	slug: string;
	name: string;
	site: string;
	summary: string;
	description: string;
	lowTide: string;
	date: string;
	durationMinutes: number;
	difficulty: 'Easy' | 'Moderate' | 'Rocky';
	priceCents: number;
	capacity: number;
	highlights: string[];
}

export interface Booking {
	id: string;
	tourSlug: string;
	accountId: string;
	guests: number;
	createdAt: string;
	status: 'confirmed' | 'waitlist' | 'cancelled';
}

export const accounts: Account[] = [
	{
		id: 'acc_owner',
		email: 'owner@tidepool.test',
		password: 'tidepool-owner',
		name: 'Marisol Reyes',
		role: 'owner'
	},
	{
		id: 'acc_guest',
		email: 'guest@tidepool.test',
		password: 'tidepool-guest',
		name: 'Jonah Park',
		role: 'guest'
	}
];

export const tours: Tour[] = [
	{
		slug: 'anemone-flats',
		name: 'Anemone Flats at First Light',
		site: 'Pillar Point, Half Moon Bay',
		summary: 'A slow dawn walk across the reef flats, looking for giant green anemones and ochre stars.',
		description:
			'We meet on the bluff forty minutes before the low and walk out as the reef drains. Expect giant green anemones, ochre and bat stars, hermit crabs and, if we are lucky, a nudibranch or two. Boots with grip are a must.',
		lowTide: '−1.2 ft',
		date: '2026-10-11T06:40:00-07:00',
		durationMinutes: 120,
		difficulty: 'Easy',
		priceCents: 3800,
		capacity: 12,
		highlights: ['Giant green anemones', 'Ochre stars', 'Tide-table briefing']
	},
	{
		slug: 'kelp-crab-cove',
		name: 'Kelp Crab Cove',
		site: 'Fitzgerald Marine Reserve',
		summary: 'Surge channels, kelp crabs and the best sculpin pools on the coast.',
		description:
			'A rockier route through the surge channels south of the reserve. We look under ledges for kelp crabs, tidepool sculpins and sea lemons. Some scrambling over wet rock; not suitable for small children.',
		lowTide: '−0.8 ft',
		date: '2026-10-12T07:15:00-07:00',
		durationMinutes: 150,
		difficulty: 'Rocky',
		priceCents: 4600,
		capacity: 8,
		highlights: ['Kelp crabs', 'Tidepool sculpins', 'Sea lemons']
	},
	{
		slug: 'night-pools',
		name: 'Night Pools by Headlamp',
		site: 'Pescadero State Beach',
		summary: 'After-dark low tide with red headlamps: octopus, sleeping fish and glowing brittle stars.',
		description:
			'Winter brings the best lows after dark. With red-filtered headlamps we look for red octopus, sleeping opaleye and the brittle stars that come out at night. Headlamps provided.',
		lowTide: '−1.5 ft',
		date: '2026-11-22T19:30:00-08:00',
		durationMinutes: 105,
		difficulty: 'Moderate',
		priceCents: 5200,
		capacity: 10,
		highlights: ['Red octopus', 'Brittle stars', 'Headlamps included']
	},
	{
		slug: 'family-shore-walk',
		name: 'Family Shore Walk',
		site: 'Natural Bridges, Santa Cruz',
		summary: 'A gentle, stroller-friendly hour for small explorers and their grown-ups.',
		description:
			'An easy hour on the sand and the nearest pools. Kids get a field card to tick off what they find; we bring magnifiers and a touch-tank guide who shows how to look without lifting.',
		lowTide: '+0.3 ft',
		date: '2026-10-18T10:00:00-07:00',
		durationMinutes: 60,
		difficulty: 'Easy',
		priceCents: 2200,
		capacity: 16,
		highlights: ['Field cards for kids', 'Magnifiers provided', 'Stroller friendly']
	}
];

export const bookings: Booking[] = [
	{
		id: 'bk_1001',
		tourSlug: 'anemone-flats',
		accountId: 'acc_guest',
		guests: 2,
		createdAt: '2026-09-02T18:21:00Z',
		status: 'confirmed'
	},
	{
		id: 'bk_1002',
		tourSlug: 'night-pools',
		accountId: 'acc_guest',
		guests: 1,
		createdAt: '2026-09-10T09:05:00Z',
		status: 'waitlist'
	},
	{
		id: 'bk_1003',
		tourSlug: 'kelp-crab-cove',
		accountId: 'acc_owner',
		guests: 3,
		createdAt: '2026-09-12T15:44:00Z',
		status: 'confirmed'
	}
];

export function publicAccount(account: Account): Omit<Account, 'password'> {
	const { password: _password, ...rest } = account;
	return rest;
}

export function findTour(slug: string): Tour | undefined {
	return tours.find((tour) => tour.slug === slug);
}

export function seatsTaken(slug: string): number {
	return bookings
		.filter((b) => b.tourSlug === slug && b.status === 'confirmed')
		.reduce((sum, b) => sum + b.guests, 0);
}

let nextBooking = 1004;
export function createBooking(tourSlug: string, accountId: string, guests: number): Booking {
	const tour = findTour(tourSlug);
	const full = tour ? seatsTaken(tourSlug) + guests > tour.capacity : true;
	const booking: Booking = {
		id: `bk_${nextBooking++}`,
		tourSlug,
		accountId,
		guests,
		createdAt: new Date().toISOString(),
		status: full ? 'waitlist' : 'confirmed'
	};
	bookings.push(booking);
	return booking;
}

export interface PastWalk {
	id: string;
	accountId: string;
	tourName: string;
	site: string;
	date: string;
	guests: number;
	sightings: string[];
}

export const pastWalks: PastWalk[] = [
	{
		id: 'pw_0901',
		accountId: 'acc_guest',
		tourName: 'Anemone Flats at First Light',
		site: 'Pillar Point, Half Moon Bay',
		date: '2026-08-24T06:10:00-07:00',
		guests: 2,
		sightings: ['Giant green anemone', 'Ochre star', 'Opalescent nudibranch']
	},
	{
		id: 'pw_0902',
		accountId: 'acc_guest',
		tourName: 'Family Shore Walk',
		site: 'Natural Bridges, Santa Cruz',
		date: '2026-07-12T09:30:00-07:00',
		guests: 3,
		sightings: ['Hermit crab', 'Black turban snail']
	},
	{
		id: 'pw_0903',
		accountId: 'acc_owner',
		tourName: 'Kelp Crab Cove',
		site: 'Fitzgerald Marine Reserve',
		date: '2026-08-30T07:00:00-07:00',
		guests: 1,
		sightings: ['Kelp crab', 'Tidepool sculpin']
	}
];
