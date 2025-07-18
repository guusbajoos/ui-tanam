import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';
import dayjs from 'dayjs';

import PageServices from '@services/pages/pages';

const domain =
	process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id/' : 'https://tanamgigi.id/';

const getVideos = async () => {
	const { data: pages } = await PageServices.getPages('v2', 'HOME');

	const ABOUT_TANAM = pages.find((page) => page.section_type === 'ABOUT_TANAM');
	const HOW_IT_WORKS = pages.find((page) => page.section_type === 'HOW_IT_WORKS');

	const mergePages = [ABOUT_TANAM, HOW_IT_WORKS];

	const pageMap = mergePages.map((page) => ({
		url: domain,
		video: {
			thumbnail_loc: page?.content?.video_url,
			title: 'Tanam Gigi Video',
			description: 'Tanam Gigi Testimony & Illustration',
		},
		lastmod: dayjs(page.epoch_updated_at).format('YYYY-MM-DD'),
	}));

	return pageMap;
};

const sitemapApi = async (req, res) => {
	res.setHeader('Content-Type', 'application/xml');
	res.setHeader('Content-Encoding', 'gzip');

	const userGenPageUrls = await getVideos();

	const sitemapStream = new SitemapStream({ lastmodDateOnly: true, video: true });
	const pipeline = sitemapStream.pipe(createGzip());

	userGenPageUrls.forEach(({ url, lastmod, video }) => {
		sitemapStream.write({
			url,
			video,
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
