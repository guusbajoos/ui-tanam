import React, { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';

import WhyImplanItem from './WhyImplanItem/WhyImplanItem';

const WhyImplan = ({ content, methods }) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;
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
		<section className='py-50 lg:py-70'>
			<BaseContainer>
				<div className='flex flex-wrap justify-center'>
					<div className='w-full lg:w-1/2'>
						<h2 className='mb-30 text-center text-[1.75rem] font-semibold text-primary lg:mb-0 lg:max-w-[409px] lg:text-left lg:text-5xl'>
							{content.title}
						</h2>
					</div>
					<div className='w-full lg:w-1/2'>
						<div className='flex flex-wrap gap-y-50'>
							{methods.map((method) => (
								<React.Fragment key={method.id}>
									<WhyImplanItem {...method} />
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
				<BaseButton
					wrapperClassName='mx-auto mt-30 lg:mt-50'
					linkClassName='why-implant'
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

export default WhyImplan;
