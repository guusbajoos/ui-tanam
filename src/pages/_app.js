import React from 'react';

import Head from 'next/head';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../shared/styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
				/>
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	);
}
