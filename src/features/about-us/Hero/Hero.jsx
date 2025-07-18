import { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { useResponsive } from '@shared/hooks/hooks';
import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import HeroDesktop from './HeroDesktop/HeroDesktop';
import HeroMobile from './HeroMobile/HeroMobile';

const Hero = ({ content }) => {
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
		<section className='relative h-auto overflow-hidden'>
			<div className='flex flex-wrap'>
				{isLargeAbove ? (
					<HeroDesktop content={content} onTracker={handleTracker} />
				) : (
					<HeroMobile content={content} onTracker={handleTracker} />
				)}
			</div>
		</section>
	);
};

export default Hero;
