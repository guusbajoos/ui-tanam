import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';

const domain = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' 
  ? 'https://dev.tanamgigi.id'
  : 'https://tanamgigi.id';

const STATIC_URLS = [
  `${domain}`,
  `${domain}/about-us`,
  `${domain}/before-after`,
  `${domain}/sitemap-promotions.xml`,
  `${domain}/sitemap-videos.xml`,
  `${domain}/sitemap-articles.xml`
];

const sitemapApi = async (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Encoding', 'gzip');

  const sitemapStream = new SitemapStream({ lastmodDateOnly: true, video: true });
  const pipeline = sitemapStream.pipe(createGzip());

  STATIC_URLS.forEach((url) => {
    sitemapStream.write({
      url,
      lastmod: new Date(),
      changefreq: 'daily', 
    });
  });

  sitemapStream.end();

  pipeline.pipe(res).on('error', (err) => {
    throw err;
  });
};

export default sitemapApi;
