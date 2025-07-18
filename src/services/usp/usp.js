import api from '../index';

const getUSPs = async (version) => {
	const response = await api.get(`/${version}/public/unique-selling-points`);
	return response.data;
};

export default { getUSPs };
