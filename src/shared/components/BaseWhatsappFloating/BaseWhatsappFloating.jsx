import React from 'react';
import { getCookie } from 'cookies-next';
import PixelServices from '@services/pixel/pixel';
import BaseButton from '@shared/components/BaseButton/BaseButton';

const BaseWhatsappFloating = ({ data, devices, floatingButtonClick }) => {
	const tt_click_id = getCookie('ttclid') || null;

	const handleTracker = (event) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: 'EventContact',
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: devices?.user_agent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);

		PixelServices.trackTiktokBrowserEvent("Contact");


		const metaPayload = {
			...payload,
			event_name: 'Purchase',
			currency: 'IDR',
			value: 300000,
		};

		PixelServices.metaEvent(metaPayload);
	};

	const handleOnClick = (e) => {
		const isJotform = data?.url.includes('jotform');
		if (!isJotform) {
			window.fbq('track', 'Lead');
			window.fbq('track', 'Purchase', {
				value: '300000',
				currency: 'IDR',
			});
			handleTracker(`Click - ${data?.text}`);
		}

		if (floatingButtonClick) {
			e.preventDefault();
			floatingButtonClick(e, data?.url);
		}
	};

	return (
		<React.Fragment>
			<BaseButton
				isAnimationPulse
				isWhatsappFloating
				wrapperClassName='fixed bottom-5 right-4 z-10 w-auto lg:bottom-10 lg:right-[85px]'
				linkClassName='floating-whatsapp'
				buttonClassName='bg-floating-whatsapp py-2 px-5 text-base tracking-[1px]'
				buttonType={floatingButtonClick ? 'button' : 'link'}
				isExternal={!floatingButtonClick}
				href={!floatingButtonClick ? data?.url : undefined}
				onClick={handleOnClick}
			>
				<svg
					viewBox='64 64 896 896'
					focusable='false'
					data-icon='whats-app'
					width='1em'
					height='1em'
					fill='currentColor'
					aria-hidden='true'
				>
					<defs>
						<style></style>
					</defs>
					<path d='M713.5 599.9c-10.9-5.6-65.2-32.2-75.3-35.8-10.1-3.8-17.5-5.6-24.8 5.6-7.4 11.1-28.4 35.8-35 43.3-6.4 7.4-12.9 8.3-23.8 2.8-64.8-32.4-107.3-57.8-150-131.1-11.3-19.5 11.3-18.1 32.4-60.2 3.6-7.4 1.8-13.7-1-19.3-2.8-5.6-24.8-59.8-34-81.9-8.9-21.5-18.1-18.5-24.8-18.9-6.4-.4-13.7-.4-21.1-.4-7.4 0-19.3 2.8-29.4 13.7-10.1 11.1-38.6 37.8-38.6 92s39.5 106.7 44.9 114.1c5.6 7.4 77.7 118.6 188.4 166.5 70 30.2 97.4 32.8 132.4 27.6 21.3-3.2 65.2-26.6 74.3-52.5 9.1-25.8 9.1-47.9 6.4-52.5-2.7-4.9-10.1-7.7-21-13z'></path>
					<path d='M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z'></path>
				</svg>
				<p className='scale-100 pl-1.5 text-base'>{data?.text}</p>
			</BaseButton>
		</React.Fragment>
	);
};

export default BaseWhatsappFloating;
