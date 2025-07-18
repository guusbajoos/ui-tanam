import api from '../index';

const getPhotoBeforeAfter = async (version, menu_type, page, size) => {
	const filters = [];

	menu_type && filters.push(`menu_type=${menu_type}`);
	page && filters.push(`page=${page}`);
	size && filters.push(`size=${size}`);

	const queries = filters.length > 0 ? `?${filters.join('&')}` : '';

	const response = await api.get(`/${version}/public/photos/before-afters${queries}`);
	return response.data;
};
const getPhotoBeforeAfterByNumber = async (version, menu_type) => {
	const filters = [];

	menu_type && filters.push(`menu_type=${menu_type}`);

	const queries = filters.length > 0 ? `?${filters.join('&')}` : '';

	const response = await api.get(`/${version}/public/homes/before-afters${queries}`);
	return response.data;
};

export default { getPhotoBeforeAfter, getPhotoBeforeAfterByNumber };
