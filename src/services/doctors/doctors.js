import api from '../index';

const getDoctors = async (version) => {
	const response = await api.get(`/${version}/public/team-doctors`);
	return response.data;
};

export default { getDoctors };
