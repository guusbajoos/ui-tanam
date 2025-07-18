import axios from 'axios';

const createAPI = (baseURL = process.env.NEXT_PUBLIC_API_URL, config = {}) => {
	const axiosInstance = axios.create({
		baseURL: baseURL,
		crossDomain: true,
		withCredentials: false,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		...config,
	});

	return axiosInstance;
};

const api = createAPI();

export default api;
