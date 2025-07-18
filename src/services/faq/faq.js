import api from '../index';

const getFAQs = async (version) => {
	const response = await api.get(`/${version}/public/faqs`);
	return response.data;
};

const getFAQSolutions = async (version) => {
	const response = await api.get(`/${version}/public/faq-solutions`);
	return response.data;
};

const getFAQCategories = async (version) => {
	const response = await api.get(`/${version}/public/faq-categories`);
	return response.data;
};

export default { getFAQs, getFAQSolutions, getFAQCategories };
