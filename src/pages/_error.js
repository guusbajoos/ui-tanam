import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import Image from 'next/image';

import PixelServices from '@services/pixel/pixel';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';

const NotFound = () => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const handleTracker = (event_name, event, url) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: event_name,
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: userAgent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : 'ClickButton');

		if (event_name === 'EventButton' || event_name === 'EventContact') {
			const metaPayload = {
				...payload,
				event_name: 'Purchase',
				currency: 'IDR',
				value: 300000,
			};

			PixelServices.metaEvent(metaPayload);
		}
	};

	useEffect(() => {
		handleTracker('EventPage', 'View - 404', `${BASE_URL}/404`);
	}, []);

	return (
		<BaseMain>
			<div className='py-[68px]'>
				<BaseContainer>
					<div className='flex flex-col items-center justify-center lg:flex-row'>
						<div className='md:h-[333px] md:w-[408px] lg:h-[533px] lg:w-[608px]'>
							<Image
								src='https://implant-web-staging-assets.s3.ap-southeast-1.amazonaws.com/images/tanamgigi_404-image_1681103134564.webp'
								alt='404'
								width={608}
								height={533}
								priority
								className='h-full w-full object-contain'
							/>
						</div>
						<div className='p-4 text-center lg:px-[2rem] lg:py-[90px] lg:text-left'>
							<h1 className='mb-2 text-5xl font-semibold text-primary lg:mb-2 lg:text-6xl'>Oops..</h1>
							<div className='mx-auto mb-50 mt-2.5 rounded-[4px] py-2 text-lg lg:mx-auto lg:w-max'>
								Halaman yang anda cari tidak ditemukan
							</div>
							<BaseButton
								wrapperClassName='mx-auto lg:mx-0'
								linkClassName='not-found'
								buttonType='link'
								isExternal={true}
								href='promotions'
								onClick={() => {
									handleTracker('EventButton', 'Click - Cek Promo Disini', BASE_URL);
									window.fbq('track', 'LinkClick');
								}}
							>
								Cek Promo Disini
							</BaseButton>
						</div>
					</div>
				</BaseContainer>
			</div>
		</BaseMain>
	);
};

export default NotFound;
