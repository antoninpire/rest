import { createId } from '@paralleldrive/cuid2';
import { writable } from 'svelte/store';

export type CRequest = {
	id: string;
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;
	headers?: Record<string, string>;
	parameters: { key: string; value: string }[];
};

const req: CRequest = {
	id: createId(),
	method: 'GET',
	url: '',
	parameters: [{ key: '', value: '' }]
};

export const requests = writable<CRequest[]>([req]);

export const currentRequest = writable<CRequest | null>(req);

export type ConfigTab = 'Parameters' | 'Body' | 'Headers' | 'Authorization';
export const currentConfigTab = writable<ConfigTab>('Parameters');
