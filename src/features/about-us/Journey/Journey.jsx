import { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { useResponsive } from '@shared/hooks/hooks';
import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';

import JourneyDesktop from './JourneyDesktop/JourneyDesktop';
import JourneyMobile from './JourneyMobile/JourneyMobile';

const Journey = ({ content }) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);
	const windowSize = useResponsive();

	const tt_click_id = getCookie('ttclid') || null;
	const isLargeAbove = windowSize.width >= 1024;
	const isMatchURLWhatsapp = matchWhatsAppURL(content.button_url);

	const handleTracker = () => {
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
		<section className='bg-[#e1f5f2] py-50 lg:py-70'>
			<BaseContainer>
				<div className='flex flex-col flex-wrap items-center justify-center lg:flex-row lg:justify-start'>
					{isLargeAbove ? <JourneyDesktop {...content} /> : <JourneyMobile {...content} />}
				</div>
				<BaseButton
					wrapperClassName='mx-auto mt-30 lg:mt-50'
					linkClassName='testimonial'
					buttonType='link'
					isExternal={true}
					href={content.button_url}
					onClick={() => {
						window.fbq('track', 'Lead');
						window.fbq('track', 'Purchase', {
							value: '300000',
							currency: 'IDR',
						});
						handleTracker();
					}}
				>
					{content.button_text}
				</BaseButton>
			</BaseContainer>
		</section>
	);
};

export default Journey;
