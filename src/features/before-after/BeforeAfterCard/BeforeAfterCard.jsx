import { useState } from 'react';

import { getCookie } from 'cookies-next';

import clsx from 'clsx';

import PixelServices from '@services/pixel/pixel';
import BeforeAfterServices from '@services/before-after/before-after';

import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';
import { useInfiniteScroll, useResponsive } from '@shared/hooks/hooks';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

import BeforeAfterCardItem from '../BeforeAfterCardItem/BeforeAfterCardItem';

const BeforeAfterCard = ({ content }) => {
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const { isLoading, results, scrollRef } = useInfiniteScroll(
		(page) => BeforeAfterServices.getPhotoBeforeAfter('v1', 'HOME', page, 10),
		{ threshold: 1.0, root: null, rootMargin: '0px' },
	);
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
		<section className='py-50 lg:py-70'>
			<BaseContainer>
				<div className='mx-auto mb-30 w-full max-w-[40.625rem] text-center text-secondary lg:mb-50'>
					<h1 className='mb-2.5 line-clamp-3 text-[1.75rem] font-semibold text-inherit lg:line-clamp-2 lg:text-5xl'>
						{content.title}
					</h1>
					<BaseHTMLRender
						className='line-clamp-4 text-base text-inherit lg:line-clamp-3 lg:text-xl'
						content={content.description}
					/>
				</div>

				<div className='grid grid-cols-r1-max-w-254 justify-center gap-y-30 lg:grid-cols-r2-max-w-364 lg:gap-x-[5rem] lg:gap-y-50'>
					{results.map((photo, idx) => (
						<div key={photo.id}>
							<BeforeAfterCardItem photo={photo} countPhoto={idx + 1} />
						</div>
					))}
				</div>

				{isLoading && (
					<div
						className={clsx(
							'mx-auto flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-center align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]',
							{
								'mx-auto my-50': isLargeAbove,
								'mx-auto my-30': !isLargeAbove,
							},
						)}
						role='status'
					>
						<span className='absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]'>
							Loading...
						</span>
					</div>
				)}

				<div ref={scrollRef} id='ref'></div>

				<BaseButton
					wrapperClassName='mx-auto mt-30 lg:mt-50'
					linkClassName='before-after'
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

export default BeforeAfterCard;
