import { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';
import { useResponsive } from '@shared/hooks/hooks';

import HeroMediaMobile from './HeroMediaMobile/HeroMediaMobile';
import HeroMediaDesktop from './HeroMediaDesktop/HeroMediaDesktop';

const Hero = ({ content, usps }) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const windowSize = useResponsive();

	const tt_click_id = getCookie('ttclid') || null;
	const isLargeAbove = windowSize.width >= 1024;
	const isMatchURLWhatsapp = matchWhatsAppURL(content.button_url);

	const handleTracker = (event) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: isMatchURLWhatsapp ? 'EventContact' : 'EventButton',
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: userAgent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);

						PixelServices.trackTiktokBrowserEvent(isMatchURLWhatsapp ? 'Contact' : 'ClickButton');
		

		const metaPayload = {
			...payload,
			event_name: 'Purchase',
			currency: 'IDR',
			value: 300000,
		};

		PixelServices.metaEvent(metaPayload);
	};

	return (
		<section className='relative h-auto overflow-hidden bg-gray-100'>
			<div className='grid lg:flex'>
				{isLargeAbove ? (
					<HeroMediaDesktop
						content={content}
						usps={usps}
						onClick={() => {
							window.fbq('track', 'Lead');
							window.fbq('track', 'Purchase', {
								value: '300000',
								currency: 'IDR',
							});
							handleTracker();
						}}
					/>
				) : (
					<HeroMediaMobile
						content={content}
						usps={usps}
						onClick={() => {
							window.fbq('track', 'Lead');
							window.fbq('track', 'Purchase', {
								value: '300000',
								currency: 'IDR',
							});
							handleTracker();
						}}
					/>
				)}
			</div>
		</section>
	);
};

export default Hero;
