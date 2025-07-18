import { useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';
import { useResponsive } from '@shared/hooks/hooks';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

import DoctorSpecialistImplantDesktop from './DoctorSpecialistImplanDesktop/DoctorSpecialistImplantDesktop';
import DoctorSpecialistImplanMobile from './DoctorSpecialistImplanMobile/DoctorSpecialistImplanMobile';

const DoctorSpecialistImplan = ({ content }) => {
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
		<section className='py-50 lg:py-[10.4375rem]'>
			<BaseContainer>
				<div className='flex flex-wrap items-center'>
					{isLargeAbove ? (
						<DoctorSpecialistImplantDesktop
							content={content}
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
						<DoctorSpecialistImplanMobile
							content={content}
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
			</BaseContainer>
		</section>
	);
};

export default DoctorSpecialistImplan;
