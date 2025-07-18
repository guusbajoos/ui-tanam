import api from '../index';

const getImplantSpecialists = async (version) => {
	const response = await api.get(`/${version}/public/implant-specialists`);
	return response.data;
};

export default { getImplantSpecialists };
