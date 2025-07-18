import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';
import ArticleServices from '@services/articles/articles';

const BASE_URL = 'https://tanamgigi.id';

export default async function handler(req, res) {
	try {
		const { slug } = req.query; // Get category slug from the URL
		res.setHeader('Content-Type', 'application/xml');
		res.setHeader('Content-Encoding', 'gzip');

		// Fetch articles for the specific category
		const { data: articles } = await ArticleServices.getSummaryArticles(1, 1000, slug, '');

		const sitemapStream = new SitemapStream({ hostname: BASE_URL });
		const pipeline = createGzip();

		sitemapStream.pipe(pipeline).pipe(res);
		sitemapStream.write({ url: `${BASE_URL}/articles/${slug}`, lastmod: new Date(), changefreq: 'daily' });

		articles.forEach((article) => {
			sitemapStream.write({
				url: `${BASE_URL}/articles/${slug}/${article.slug}`,
				lastmod: new Date(),
				changefreq: 'daily',
			});
		});

		sitemapStream.end();
	} catch (error) {
		console.error(error);
		res.status(500).send('Error generating sitemap');
	}
}
