import api from '../index';

const getClinics = async (version) => {
	const response = await api.get(`/${version}/public/location-clinics`);
	return response.data;
};

export default { getClinics };
