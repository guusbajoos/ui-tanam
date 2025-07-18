import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

import PixelServices from '@services/pixel/pixel';

import { capitalize, matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';

const SectionVideo = ({ video, index }) => {
	const baseURL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';
	const tt_click_id = getCookie('ttclid') || null;
	const isForm = video.button_url?.includes('form/');
	const isMatchURLWhatsapp = matchWhatsAppURL(video.button_url);

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

	return (
		<React.Fragment>
			<div className='block bg-[#e4e4e4] px-4 py-[90px] text-left' id={video.section_tag}>
				<BaseContainer>
					<div className='flex flex-wrap items-center justify-center lg:justify-between'>
						<div className='w-full lg:hidden'>
							<ReactPlayer
								url={video.url_video}
								playing={false}
								loop={true}
								width='100%'
								height='360px'
								muted
								controls
							/>
						</div>

						<div className='w-full lg:w-1/2'>
							<div className='mt-30 flex flex-col justify-center break-all lg:mt-0 lg:h-[600px] lg:pr-36 xl:pr-52'>
								<h2 className='mb-2.5 text-[1.75rem] font-semibold lg:text-[2.5rem]'>{video.video_headline}</h2>

								<p className='text-base'>{video.video_description}</p>

								{video.button_is_active && (
									<BaseButton
										style={{
											fontSize: 16,
											letterSpacing: 1,
											borderRadius: 5,
											backgroundColor: video.button_background_color,
											color: video.button_font_color,
											...(video.button_width && {
												width: `${video.button_width}px`,
											}),
											...(video.button_height && {
												height: `${video.button_height}px`,
											}),
										}}
										wrapperClassName='mt-30 !max-w-none'
										linkClassName={`video-${index + 1}`}
										buttonType='link'
										isExternal={true}
										href={isForm ? `${baseURL}/${video.button_url}` : video.button_url}
										onClick={() => {
											// window.fbq('track', 'Lead');
											// window.fbq('track', 'Purchase', {
												// value: '300000',
												// currency: 'IDR',
											// });
											handleTracker(
												`Click Section ${index + 1} - ${capitalize(video.button_text)}`,
												isForm ? `${baseURL}/${video.button_url}` : video.button_url,
											);
										}}
									>
										{video.button_text && video.button_text.toUpperCase()}
									</BaseButton>
								)}
							</div>
						</div>

						<div className='hidden lg:block lg:w-1/2'>
							<ReactPlayer
								url={video.url_video}
								playing={false}
								loop={true}
								width='100%'
								height='405px'
								controls
								muted
							/>
						</div>
					</div>
				</BaseContainer>
			</div>
		</React.Fragment>
	);
};

export default SectionVideo;
