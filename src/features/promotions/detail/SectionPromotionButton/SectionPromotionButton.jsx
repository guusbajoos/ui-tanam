import { getCookie } from 'cookies-next';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import { useState } from 'react';

import { secureUrlToHttps, matchWhatsAppURL, capitalize } from '@shared/helpers/fuctions.helpers';

const SectionPromotionButton = ({ button, imageButtonClick }) => {
	const tt_click_id = getCookie('ttclid') || null;
	const isMatchURLWhatsapp = matchWhatsAppURL(button.button_url);

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const handleTracker = (event, url) => {
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
		// PixelServices.tiktokNonPixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent(isMatchURLWhatsapp ? 'Contact' : 'ClickButton');

		if (event_name === 'EventButton' || event_name === 'EventContact') {
			const metaPayload = {
				...payload,
				event_name: 'Purchase',
				currency: 'IDR',
				value: 300000,
			};

			// PixelServices.metaEvent(metaPayload);
		}
	};

	const handleClick = (e) => {
		if (imageButtonClick) {
			e.preventDefault();
			imageButtonClick(e, secureUrlToHttps(button?.button_url));
		} else {
			// window.fbq('track', 'Lead');
			// window.fbq('track', 'Purchase', {
				// value: '300000',
				// currency: 'IDR',
			// });
			handleTracker();
		}
	};

	return (
		<div className='bg-primary py-30'>
			<BaseContainer>
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<BaseButton
							isWhiteBackground
							wrapperClassName='!max-w-none'
							linkClassName='promotion-button'
							buttonClassName='text-base !rounded-[3px] !text-primary'
							buttonType={imageButtonClick ? 'button' : 'link'}
							isExternal={!imageButtonClick}
							href={secureUrlToHttps(button?.button_url)}
							onClick={handleClick}
						>
							{button?.button_text}
						</BaseButton>
					</div>
				</div>
			</BaseContainer>
		</div>
	);
};

export default SectionPromotionButton;
