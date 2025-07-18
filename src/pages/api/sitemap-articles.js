import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';
import ArticleServices from '@services/articles/articles';

const BASE_URL =
	process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

const getCategories = async () => {
	const categories = await ArticleServices.getCategoryArticles();

	return categories.data.map((category) => ({
		url: `${BASE_URL}/sitemap-articles-${category.slug}.xml`,
	}));
};

const sitemapApi = async (req, res) => {
	try {
		res.setHeader('Content-Type', 'application/xml');
		res.setHeader('Content-Encoding', 'gzip');

		const categories = await getCategories();

		const pipeline = createGzip();
		const sitemapStream = new SitemapStream({ hostname: BASE_URL });

		sitemapStream.pipe(pipeline).pipe(res);
		sitemapStream.write({
			url: `${BASE_URL}/articles`,
			lastmod: new Date(),
			changefreq: 'daily',
		});
		categories.forEach(({ url }) => {
			sitemapStream.write({ url, lastmod: new Date(), changefreq: 'daily' });
		});

		sitemapStream.end();
	} catch (error) {
		console.error(error);
		res.status(500).send('Error generating sitemap');
	}
};

export default sitemapApi;
