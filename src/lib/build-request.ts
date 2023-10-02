import type { CRequest } from '$lib/stores';
import type { AxiosRequestConfig } from 'axios';

export function buildRequest(request: CRequest): AxiosRequestConfig {
	const url = new URL(request.url);
	const parameters = request.parameters.filter((p) => p.key !== '');
	parameters.forEach((p) => url.searchParams.append(p.key, p.value));

	const headers = request.headers
		.filter((p) => p.key !== '')
		.reduce(
			(acc, curr) => ({
				...acc,
				[curr.key]: curr.value
			}),
			{} as Record<string, string>
		);

	if (request.contentType) headers['content-type'] = request.contentType;

	if (request.contentType === 'application/x-www-form-urlencoded' && Array.isArray(request.body)) {
		const encodedParams = new URLSearchParams();
		for (const { key, value } of request.body) {
			encodedParams.set(key, value);
		}
		request.body = encodedParams;
	}

	if (request.authorization && request.authorization.type !== 'None') {
		headers['Authorization'] =
			request.authorization.type === 'Bearer Token'
				? `Bearer ${request.authorization.value}`
				: `Basic ${request.authorization.value}`;
	}

	return {
		headers,
		url: url.toString(),
		data: request.body,
		method: request.method
	};
}
