import api from '../index';

const getPages = async (version, menu_type, section_type) => {
	const filters = [];

	menu_type && filters.push(`menu_type=${menu_type}`);
	section_type && filters.push(`section_type=${section_type}`);

	const queries = filters.length > 0 ? `?${filters.join('&')}` : '';

	const response = await api.get(`/${version}/public/pages${queries}`);
	return response.data;
};

const getPageMetaOptions = async (version, menu_type) => {
	const filters = [];

	menu_type && filters.push(`menu_type=${menu_type}`);

	const queries = filters.length > 0 ? `?${filters.join('&')}` : '';

	const response = await api.get(`/${version}/public/meta-sites${queries}`);
	return response.data;
};

export default { getPages, getPageMetaOptions };
