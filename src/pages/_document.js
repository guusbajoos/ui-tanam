import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='id'>
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					httpEquiv="Content-Language"
					content='id'
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="default"
				/>
				<meta
					name="language"
					content='id'
				/>
				<meta name="geo.region" content="ID-JK" />
				<meta name="geo.placename" content="Jakarta" />
				<meta name="robots" content="max-image-preview:large" />

				<meta
					name='robots'
					content={
						process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? 'index, follow, noodp, noydir' : 'noindex, nofollow'
					}
				/>
				<meta
					name='facebook-domain-verification'
					content={
						process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
							? '5m3wm6faxja6yf6w4mtr6t576ie26j'
							: 'yvdqdi89n88x6vnuhl6a9ieyk137is'
					}
				/>
				<meta
					name="msapplication-TileColor"
					content="#1c7c70"
					key="msapplication-TileColor"
				/>
				<meta name="theme-color" content="#1c7c70" key="theme-color" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-tap-highlight" content="no" />

				<link rel='icon' href={`/favicon.ico`} key='favicon' />
				<link rel='icon' type='image/png' sizes='16x16' href={`/assets/16x16.png`} key='icon16' />
				<link rel='icon' type='image/png' sizes='32x32' href={`/assets/32x32.png`} key='icon32' />
				<link rel='icon' type='image/png' sizes='180x180' href={`/assets/180x180.png`} key='icon180' />
				<link rel='icon' type='image/png' sizes='192x192' href={`/assets/192x192.png`} key='icon192' />
				<link rel='icon' type='image/png' sizes='256x256' href={`/assets/256x256.png`} key='icon256' />
				<link rel='icon' type='image/png' sizes='384x384' href={`/assets/384x384.png`} key='icon384' />
				<link rel='icon' type='image/png' sizes='512x512' href={`/assets/512x512.png`} key='icon512' />
				<link rel='apple-touch-icon' href={`/assets/180x180.png`} key='apple' />

				<link rel="manifest" href="/manifest.json" />

				<link rel='preconnect' href='https://fonts.gstatic.com/' />
				<link rel='preconnect' href='https://cdnjs.cloudflare.com/' />
				<link rel='preconnect' href='https://www.google-analytics.com' />
				<link rel='preconnect' href='https://www.googletagmanager.com' />
				<link rel='preconnect' href='https://connect.facebook.net' />

				<link rel='dns-prefetch' href='https://fonts.gstatic.com' />
				<link rel='dns-prefetch' href='https://cdnjs.cloudflare.com/' />
				<link rel='dns-prefetch' href='https://www.google-analytics.com' />
				<link rel='dns-prefetch' href='https://www.googletagmanager.com' />
				<link rel='dns-prefetch' href='https://connect.facebook.net' />

				<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_CODE}`} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_CODE}');`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_CODE}');`,
					}}
				/>
				<script
					id='fb-page-view'
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '1275909966609863');
						fbq('track', 'PageView');`,
					}}
				/>
				<script
					id='tiktok'
					dangerouslySetInnerHTML={{
						__html: `!function (w, d, t) {
						w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
						ttq.load('CNT5VFJC77U7CO3SPNPG');
						ttq.page();
						}(window, document, 'ttq');`
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: `
						{
							"@context": "https://schema.org",
							"@type": "Dentist",
							"name": "Tanam Gigi",
							"description": "Tanam Gigi adalah brand implan nomor 1 di Indonesia yang menghadirkan perawatan implan gigi tanpa bedah*. Dilengkapi dengan teknologi Implant Aligner untuk pemasangan implan yang lebih akurat dan proses pemulihan lebih cepat.",
							"slogan": "Implan Gigi Minim Bedah",
							"email": "hello@tanamgigi.id",
							"image": "https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/icons/logo_tanam_gigi.svg",
							"sameAs": "https://www.instagram.com/tanamgigi/"
						}`,
					}}
				/>
				{process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? (
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:5152801,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `
						}}
					/>
				) : (
					<></>
				)}

<script
      id="tiktok-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_CONVERSION_ADS_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `
      }}
    />
      


			</Head>
			<body>
				<Main />
				<NextScript />
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img
							height='1'
							width='1'
							style='display:none'
							src='https://www.facebook.com/tr?id=1275909966609863&ev=PageView&noscript=1'
						/>`,
					}}
				/>
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_CODE}`}
						height='0'
						width='0'
						style={{ display: 'none', visibility: 'hidden' }}
					></iframe>
				</noscript>
			</body>
		</Html>
	);
}
