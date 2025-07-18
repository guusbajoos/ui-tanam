import { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import SectionImagesTextHorizontal from './SectionImagesTextHorizontal/SectionImagesTextHorizontal';
import SectionImagesTextVertical from './SectionImagesTextVertical/SectionImagesTextVertical';

const SectionImagesText = ({ image, index }) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;
	const isMatchURLWhatsapp = matchWhatsAppURL(image.button_url);

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

	return (
		<div className='grid w-full' id={image.section_tag}>
			<div className='relative overflow-hidden'>
				{['LEFT', 'RIGHT'].includes(image.section_position_image) && (
					<SectionImagesTextHorizontal
						image={image}
						index={index}
						onTracker={(event, url) => handleTracker(event, url)}
					/>
				)}
				{['TOP', 'BOTTOM'].includes(image.section_position_image) && (
					<SectionImagesTextVertical
						image={image}
						index={index}
						onTracker={(event, url) => handleTracker(event, url)}
					/>
				)}
			</div>
		</div>
	);
};

export default SectionImagesText;
