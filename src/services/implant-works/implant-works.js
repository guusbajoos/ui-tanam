import api from '../index';

const getImplantWorks = async (version) => {
	const response = await api.get(`/${version}/public/implant-works`);
	return response.data;
};

export default { getImplantWorks };
