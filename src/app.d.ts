declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/lucia').Auth;
		type DatabaseUserAttributes = {
			email: string;
		};
		type DatabaseSessionAttributes = {
			email: string;
		};
	}
}

// THIS IS IMPORTANT!!!
export {};
