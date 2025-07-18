const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
	openAnalyzer: false,
});

// const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
let nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'implant-web-staging-assets.s3.ap-southeast-1.amazonaws.com',
			'implant-web-production-assets.s3.ap-southeast-1.amazonaws.com',
			'd1vbn70lmn1nqe.cloudfront.net',
		],
	},
	output: 'standalone',
	async headers() {
		return [
			{
				source: '/:all*(svg|jpg|png|webp|woff|woff2|eot|ttf|otf|ico)',
				locale: false,
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=9999999999, must-revalidate',
					},
				],
			},
		];
	},
	async rewrites() {
		return [
			{
                source: '/robots.txt',
                destination: '/api/robots'
            },
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
			{
				source: '/sitemap-videos.xml',
				destination: '/api/sitemap-videos',
			},
			{
				source: '/sitemap-promotions.xml',
				destination: '/api/sitemap-promotions',
			},
			{
				source: '/sitemap-articles.xml',
				destination: '/api/sitemap-articles',
			},
			{
				source: '/sitemap-articles-:slug.xml',
				destination: '/api/sitemap-articles/:slug',
			  },
		];
	},
	transpilePackages: [
		'antd'
	],
};

nextWithPWA = withPWA(nextConfig);

nextConfig = withBundleAnalyzer(nextWithPWA);

module.exports = nextConfig;

// Injected content via Sentry wizard below

// module.exports = withSentryConfig(
// 	nextConfig,
// 	{
// 		// For all available options, see:
// 		// https://github.com/getsentry/sentry-webpack-plugin#options

// 		// Suppresses source map uploading logs during build
// 		silent: true,
// 		org: 'tech-rata',
// 		project: 'rata-ui-implant',
// 		authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
// 		release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
// 	},
// 	{
// 		// For all available options, see:
// 		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// 		// Upload a larger set of source maps for prettier stack traces (increases build time)
// 		widenClientFileUpload: true,

// 		// Transpiles SDK to be compatible with IE11 (increases bundle size)
// 		transpileClientSDK: true,

// 		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
// 		tunnelRoute: '/monitoring',

// 		// Hides source maps from generated client bundles
// 		hideSourceMaps: true,

// 		// Automatically tree-shake Sentry logger statements to reduce bundle size
// 		disableLogger: true,

// 		// Enables automatic instrumentation of Vercel Cron Monitors.
// 		// See the following for more information:
// 		// https://docs.sentry.io/product/crons/
// 		// https://vercel.com/docs/cron-jobs
// 		automaticVercelMonitors: true,
// 	},
// );
