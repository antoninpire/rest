import { createId } from '@paralleldrive/cuid2';
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { writable } from 'svelte/store';

export type ContentType =
	| 'None'
	| 'application/json'
	| 'application/ld+json'
	| 'application/hal+json'
	| 'application/vnd.api+json'
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/html'
	| 'text/plain';

export type AuthorizationType = 'None' | 'Basic Auth' | 'Bearer Token';

export type CResponse = {
	status: number;
	statusText: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	size: number;
	time: number;
	headers: AxiosResponseHeaders | Partial<RawAxiosResponseHeaders>;
};

export type CRequest = {
	id: string;
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;
	parameters: { key: string; value: string }[];
	headers: { key: string; value: string }[];
	contentType: ContentType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response?: CResponse;
	authorization?: {
		type: AuthorizationType;
		value: string;
	};
};

export function createDefaultRequest(): CRequest {
	return {
		id: createId(),
		url: '',
		method: 'GET',
		parameters: [{ key: '', value: '' }],
		headers: [{ key: '', value: '' }],
		contentType: 'None'
	};
}

const req = createDefaultRequest();

export const requests = writable<CRequest[]>([req]);

export const currentRequest = writable<CRequest | null>(req);

export type ConfigTab = 'Parameters' | 'Body' | 'Headers' | 'Authorization';
export const currentConfigTab = writable<ConfigTab>('Parameters');

export const leftPaneSize = writable(20);
export const requestPaneSize = writable(50);
export const resultPaneSize = writable(50);

export const collectionDialogOpen = writable(false);
