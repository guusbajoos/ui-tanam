import { useState } from 'react';

import { getCookie } from 'cookies-next';

import Image from 'next/image';

import PixelServices from '@services/pixel/pixel';
import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import BaseButton from '@shared/components/BaseButton/BaseButton';

const PromotionItem = (props) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const handleTracker = ( url) => {
		const isMatchURLWhatsapp = matchWhatsAppURL(url);

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
		<div className='relative flex rounded-[1.25rem] border border-solid border-[#9a9a9a] before:absolute before:-right-[1px] before:top-[50%] before:h-50 before:w-[25px] before:-translate-y-1/2 before:rounded-bl-[110px] before:rounded-tl-[110px] before:border before:border-r-0 before:border-solid before:border-[#9a9a9a] before:bg-white before:content-[""] md:mx-0'>
			<div className='w-[40%] border-r border-dashed border-[#9a9a9a] p-2.5'>
				<Image
					src={props.url_image}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt={`Promoion Image ${props.title}`}
					className='aspect-1/1 h-full w-full rounded-[1.25rem] object-cover md:aspect-3/2'
				/>
			</div>
			<div className='w-[60%] p-2.5 md:p-4 lg:p-5'>
				<a
					href={props.url_promo}
					target='_blank'
					rel='noopener noreferrer'
					onClick={() => handleTracker(  props.url_promo)}
					className='cta-button-lead title-promo no-underline'
					aria-label='cta-button-lead title-promo'
				>
					<h2
						className='mb-4 text-xl font-semibold text-secondary lg:text-2xl'
						onClick={() => window.fbq('track', 'LinkClick')}
					>
						{props.title}
					</h2>
				</a>

				<p className='mb-4 pr-5 text-sm font-normal text-secondary md:pr-[0.875rem] lg:pr-2.5 lg:text-base'>
					{props.description}
				</p>

				<BaseButton
					wrapperClassName='max-w-none'
					linkClassName='button-promo'
					buttonClassName='text-[0.8125rem] md:text-base !w-auto !py-2.5 !px-5 lg:text-lg'
					buttonType='link'
					isExternal
					href={props?.button_url}
					onClick={() => {
						window.fbq('track', 'Lead');
						window.fbq('track', 'Purchase', {
							value: '300000',
							currency: 'IDR',
						});
						handleTracker(  props?.button_url);
					}}
				>
					{props?.button_text}
				</BaseButton>
			</div>
		</div>
	);
};

export default PromotionItem;
