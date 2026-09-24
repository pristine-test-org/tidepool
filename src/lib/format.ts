export function price(cents: number): string {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function tourDate(iso: string): string {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'America/Los_Angeles'
	}).format(new Date(iso));
}

export function duration(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m ? `${h} h ${m} min` : `${h} h`;
}
