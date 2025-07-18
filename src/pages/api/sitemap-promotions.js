import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';
import dayjs from 'dayjs';

import PromotionServices from '@services/promotions/promotions';


const BASE_URL =  process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' 
? 'https://dev.tanamgigi.id'
: 'https://tanamgigi.id';

const STATIC_URLS = [ `${BASE_URL}/promotions`];


const getAllPromotion = async () => {
	const { data: promotions } = await PromotionServices.getPromotions('v1');

	const promotions_active = promotions.filter((promotion) => promotion.active === true);

	const promotionsMap = promotions_active.map((promotion) => ({
		url: `${BASE_URL}/promotions/${promotion.slug}`,
		lastmod: dayjs(promotion.epoch_updated_at).format('YYYY-MM-DD'),
	}));

	return promotionsMap;
};

const sitemapApi = async (req, res) => {
	// ensure response is XML & gzip encoded
	res.setHeader('Content-Type', 'application/xml');
	res.setHeader('Content-Encoding', 'gzip');

	// makes necessary API calls to get all the dynamic
	// urls from user-gen content
	const userGenPageUrls = await getAllPromotion();

	const sitemapStream = new SitemapStream({ lastmodDateOnly: true, video: true });
	const pipeline = sitemapStream.pipe(createGzip());

	// write static pages to sitemap
	STATIC_URLS.forEach((url) => {
		sitemapStream.write({ url, lastmod: new Date() });
	});

	// write user-generated pages to sitemap dynamic
	userGenPageUrls.forEach(({ url, lastmod }) => {
		sitemapStream.write({
			url,
			lastmod,
			changefreq: 'daily', 
		});
	});

	sitemapStream.end();

	// stream write the response
	pipeline.pipe(res).on('error', (err) => {
		throw err;
	});
};

export default sitemapApi;
