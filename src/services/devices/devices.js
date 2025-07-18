import api from '..';

const getDevices = async (version) => {
	const response = await api.get(`/${version}/public/device-metadata`);
	return response.data;
};

export default { getDevices };
