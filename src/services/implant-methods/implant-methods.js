import api from '../index';

const getImplantMethods = async (version) => {
	const response = await api.get(`/${version}/public/implant-methods`);
	return response.data;
};

export default { getImplantMethods };
