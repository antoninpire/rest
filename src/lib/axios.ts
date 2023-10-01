import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use((config) => {
	config.headers['request-startTime'] = new Date().getTime();
	return config;
});

instance.interceptors.response.use(
	(response) => {
		const start = response.config.headers['request-startTime'];
		const end = new Date().getTime() - start;
		response.headers['request-duration'] = end;
		return response;
	},
	(error) => {
		const start = error.response.config.headers['request-startTime'];
		const end = new Date().getTime() - start;
		error.response.headers['request-duration'] = end;
		throw error;
	}
);

export { instance as axios };
