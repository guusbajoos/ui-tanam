import api from '../index';

const getPromotionBySlug = async (version, slug) => {
	const response = await api.get(`/${version}/public/promotions?slug=${slug}`);
	return response.data;
};

const getPromotions = async (version) => {
	const response = await api.get(`/${version}/public/promotions`);
	return response.data;
};

const getPromotionLatest = async (version) => {
	const response = await api.get(`/${version}/public/promotions?latest=true`);
	return response.data;
};

const getPromotionDeals = async (version) => {
	const response = await api.get(`/${version}/public/promotion-deals`);
	return response.data;
};

export default { getPromotionBySlug, getPromotions, getPromotionLatest, getPromotionDeals };
