import type { CRequest } from '$lib/stores';

export function buildRequest(request: CRequest) {
	const url = new URL(request.url);
	const parameters = request.parameters.filter((p) => p.key !== '');
	parameters.forEach((p) => url.searchParams.append(p.key, p.value));
}
