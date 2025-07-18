import api from '../index';

const getHomeTestimonials = async (version) => {
	const response = await api.get(`/${version}/public/testimonials`);
	return response.data;
};

export default { getHomeTestimonials };
