import api from '../index';

const getSteps = async (version) => {
	const response = await api.get(`/${version}/public/implant-steps`);
	return response.data;
};

export default { getSteps };
