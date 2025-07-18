import ArticleServices from '@services/articles/articles';

const BASE_URL = 'https://tanamgigi.id';

const getCategoriesSitemapUrls = async () => {
  const categories = await ArticleServices.getCategoryArticles();
  return categories.data.map(
    (category) => `${BASE_URL}/sitemap-articles-${category.slug}.xml`
  );
};

const robotsApi = async (req, res) => {
  try {
    const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';

    // If in development environment, block all crawlers
    if (isDevelopment) {
      const robotsContent = `
User-agent: *
Disallow: /
      `.trim();

      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(robotsContent);
      return;
    }

    // For other environments, generate dynamic robots.txt with sitemaps
    const categorySitemaps = await getCategoriesSitemapUrls();

    // Base sitemaps
    const baseSitemaps = [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-videos.xml`,
      `${BASE_URL}/sitemap-promotions.xml`,
      `${BASE_URL}/sitemap-articles.xml`,
    ];

    const allSitemaps = [...baseSitemaps, ...categorySitemaps];

    const robotsContent = `
User-agent: *
Allow: /

${allSitemaps.map((sitemap) => `Sitemap: ${sitemap}`).join('\n')}
    `.trim();

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(robotsContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating robots.txt');
  }
};

export default robotsApi;
