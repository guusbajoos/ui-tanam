import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useResponsive } from '@shared/hooks/hooks';
import BaseButtonArrow from '@shared/components/BaseButton/BaseButtonArrow/BaseButtonArrow';

import { SETTINGS } from '@shared/constants/settings_slides';
import Link from 'next/link';
import dayjs from 'dayjs';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';
import Image from 'next/image';
import PixelServices from '@services/pixel/pixel';

import { getCookie } from 'cookies-next';


const RelatedArticleSlider = ({ data }) => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);

	const windowSize = useResponsive();

	const isLargeAbove = windowSize.width >= 1024;
	const prev = () => {
		sliderRef?.current?.slickPrev();
	};

	const next = () => {
		sliderRef?.current?.slickNext();
	};

		const tt_click_id = getCookie('ttclid') || null;
	
		const handleTracker = (event_name, url) => {
			const payload = {
				ttclid: tt_click_id,
				event_name: event_name,
				event_source_url: url,
				client_user_agent: null,
				client_ip_address: null,
			};
	
			if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
			if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');
	
			PixelServices.pixelEvent(payload);
			PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : 'ClickButton');
		};

	return (
		<section className='custom-hero-slider relative '>
			{isLargeAbove && data?.length > 3 && (
				<BaseButtonArrow
					className={`${currentSlide === 0 ? 'hidden' : 'block'}`}
					onClick={prev}
					bgNone
					direction='left'
				/>
			)}

			<div className='mx-auto w-full'>
				<Slider
					ref={(slider) => (sliderRef.current = slider)}
					{...SETTINGS}
					beforeChange={(_, newIndex) => {
						setCurrentSlide(newIndex);
					}}
					afterChange={(index) => {
						setCurrentSlide(index);
					}}
					className=' py-10'
				>
					{data.map((props, idx) => (
						<React.Fragment>
							<Link
								className='m-auto  w-fit cursor-pointer  p-4'
								href={`/articles/${props.category_slug}/${props.slug}`}
								onClick={() => handleTracker('EventButton', `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${props.category_slug}/${props.slug}`)}
								>
								<div className=' size-full relative  m-auto flex aspect-1/1 h-[400px] min-h-fit w-full max-w-[350px]  flex-col  bg-white before:absolute'>
									<Image
										src={props.url_banner_desktop}
										width={0}
										height={0}
										sizes='350px, 200px'
										quality={100}
										alt={`Treatment-${idx + 1}`}
										className='aspect-2/1 h-[200px] w-[98%]  rounded-lg object-cover'
									/>

									<div className='relative h-fit w-[98%]  py-3'>
										<div className='flex flex-col gap-y-3'>
											<h1 className='text-[0.8125rem]  text-[#162326]'>
												{dayjs(props.epoch_updated_at).format('dddd, DD MMMM YYYY')}
											</h1>

											{props.title && (
												<BaseHTMLRender
													content={props.title}
													className='line-clamp-2 text-ellipsis text-xl font-bold'
												/>
											)}
											{props.preview && (
												<BaseHTMLRender content={props.preview} className='text-truncate-related-slider' />
											)}
										</div>
									</div>
								</div>
							</Link>
						</React.Fragment>
					))}
				</Slider>
			</div>
			{isLargeAbove && data?.length > 3 && (
				<BaseButtonArrow
					className={`${currentSlide === data.length - 3 ? 'hidden' : 'block'}`}
					onClick={next}
					direction='right'
					bgNone
				/>
			)}
		</section>
	);
};

export default RelatedArticleSlider;
