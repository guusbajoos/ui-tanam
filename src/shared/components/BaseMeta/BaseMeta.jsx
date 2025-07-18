import Head from 'next/head';

const BaseMeta = (props) => {
	return (
		<Head>
			<meta charSet='UTF-8' key='charset' />

			<title>{props.title}</title>

			<meta name='application-name' content={props.title} />
			<meta name='apple-mobile-web-app-title' content={props.title} />

			<meta name='description' content={props.description} key='description' />
			<meta property='og:url' content={props.canonical} key='og:url' />
			<meta property='og:title' content={props.title} key='og:title' />
			<meta property='og:description' content={props.description} key='og:description' />
			<meta property='og:locale' content='id' key='og:locale' />
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content='Tanam Gigi' />

			<link rel='canonical' href={props.canonical} key='canonical' />

			{/* <meta
					name='google-site-verification'
					content={
						process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
							? 'xba5CZL63e8c6B3yAD0NwMcBfyR3sjyBOPEcWhQsMKs'
							: 'r8zUWraGJqOXlke4MrewsjNZcFKk7KtCcePw_pXZz4A'
					}
				/> */}
			{props.keywords && <meta name='keywords' content={props.keywords} />}
		</Head>
	);
};

export default BaseMeta;
