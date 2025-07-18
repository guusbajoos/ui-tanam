import api from '../index';

const getComparisons = async (version) => {
	const response = await api.get(`/${version}/public/comparisons`);
	return response.data;
};

export default { getComparisons };
