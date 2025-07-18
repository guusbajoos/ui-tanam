import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';

import { SETTINGS } from '@shared/constants/settings_slides';
import { matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';
import { useResponsive } from '@shared/hooks/hooks';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseButtonArrow from '@shared/components/BaseButton/BaseButtonArrow/BaseButtonArrow';

import HowDentalWorksItem from './HowDentalWorksItem/HowDentalWorksItem';

const reSettingSlider = {
	...SETTINGS,
	dots: false,
};

const HowDentalWorks = ({ content, works }) => {
	const windowSize = useResponsive();
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;
	const isLargeAbove = windowSize.width >= 1024;
	const isMatchURLWhatsapp = matchWhatsAppURL(content.button_url);

	const prev = () => {
		sliderRef?.current?.slickPrev();
	};

	const next = () => {
		sliderRef?.current?.slickNext();
	};

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
		<section className='bg-gray-100 py-50 lg:py-70'>
			<BaseContainer>
				<h2 className='mb-30 text-[1.75rem] font-semibold text-primary lg:mb-50 lg:text-5xl'>Cara Kerja Tanam Gigi</h2>

				<div className='relative'>
					{isLargeAbove && works?.length > 3 && (
						<BaseButtonArrow className={`${currentSlide === 0 ? 'hidden' : 'block'}`} onClick={prev} direction='left' />
					)}
					{!isLargeAbove && works?.length > 1 && (
						<BaseButtonArrow className={`${currentSlide === 0 ? 'hidden' : 'block'}`} onClick={prev} direction='left' />
					)}
					<Slider
						ref={(slider) => (sliderRef.current = slider)}
						{...reSettingSlider}
						beforeChange={(_, newIndex) => setCurrentSlide(newIndex)}
						afterChange={(index) => setCurrentSlide(index)}
					>
						{works.map((work) => (
							<React.Fragment key={work.id}>
								<HowDentalWorksItem {...work} />
							</React.Fragment>
						))}
					</Slider>
					{isLargeAbove && works?.length > 3 && (
						<BaseButtonArrow
							className={`${currentSlide === works.length - 3 ? 'hidden' : 'block'}`}
							onClick={next}
							direction='right'
						/>
					)}
					{!isLargeAbove && works?.length > 1 && (
						<BaseButtonArrow
							className={`${currentSlide === works.length - 1 ? 'hidden' : 'block'}`}
							onClick={next}
							direction='right'
						/>
					)}
				</div>

				<BaseButton
					wrapperClassName='mx-auto mt-30 lg:mt-10'
					linkClassName='how-dental-works'
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

export default HowDentalWorks;
