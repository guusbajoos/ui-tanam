import api from '../index';

const getGeneralButtons = async (version) => {
	const response = await api.get(`/${version}/public/global-buttons`);
	return response.data;
};

export default { getGeneralButtons };
