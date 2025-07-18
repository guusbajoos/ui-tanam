import Search from 'antd/es/transfer/search';
import api from '../index';

const getCategoryArticles = async () => {
	const response = await api.get(`/v1/public/category-articles?sort_by=label&sort_dir=ASC`);
	return response.data;
};

const getSummaryArticles = async (page = 1, size = 5, category_slug = "", q = "") => {
	const response = await api.get(`/v1/public/summary-articles`, {
		params: {
			page: page,
			size: size,
			sort_by: 'epochUpdatedAt',
			sort_dir: 'DESC',
			category_slug: category_slug,
			q: q
		},
	});
	return response.data;
};


const getRecentSummaryArticles = async (version = 'v1') => {
	const response = await api.get(`/${version}/public/recent-summary-articles`, {
		params: {
			sort_by: 'epochUpdatedAt',
			sort_dir: 'DESC',
		},
	});
	return response.data;
};

const getSliderSummaryArticles = async (version = 'v1') => {
	const response = await api.get(`/${version}/public/slider-summary-articles`, {
		params: {
			sort_by: 'epochUpdatedAt',
			sort_dir: 'DESC',
		},
	});
	return response.data;
};

const getRelatedSummaryArticles = async (slug = "") => {
	const response = await api.get(`/v1/public/related-summary-articles`, {
		params: {
			current_article_slug: slug,
			sort_by: 'epochUpdatedAt',
			sort_dir: 'DESC',
		},
	});
	return response.data;
};

const getSummaryArticleBySlug = async (slug) => {
	const response = await api.get(`/v1/public/summary-articles/${slug}`);
	return response.data;
};

const getArticleCommentById = async (
	articleId
) => {
	const response = await api.get(`/v1/public/articles/${articleId}/comments?page=1&size=10`);
	return response.data;
}

const createArticleCommentByArticleId = async (
	payload
) => {
	return api.post(
		`/v1/public/articles/${payload.article_id}/comments
		`,
		{
			request: { ...payload },
		},
	);
}


export default { getSliderSummaryArticles, getRelatedSummaryArticles, getCategoryArticles, getSummaryArticles, getRecentSummaryArticles, getSummaryArticleBySlug, getArticleCommentById, createArticleCommentByArticleId };
