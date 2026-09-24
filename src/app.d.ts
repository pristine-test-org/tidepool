import type { Account } from '$lib/server/seed';

declare global {
	namespace App {
		interface Locals {
			user: Omit<Account, 'password'> | null;
		}
		interface PageData {
			user?: Omit<Account, 'password'> | null;
		}
	}
}

export {};
