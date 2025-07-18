import Slider from 'react-slick';

import Image from 'next/image';

import { SETTINGS } from '@shared/constants/settings_slides';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const TestimonyDesktop = ({ testimonials, sliderRef, beforeChange, afterChange }) => {
	return (
		<Slider
			ref={(slider) => (sliderRef.current = slider)}
			{...SETTINGS}
			beforeChange={(_, newIndex) => beforeChange(newIndex)}
			afterChange={(index) => afterChange(index)}
		>
			{testimonials.map((testimonial) => (
				<div className='relative' key={testimonial.id}>
					<div className='mx-auto w-full'>
						<div key={testimonial.id}>
							<div className='relative m-auto aspect-1/1 h-[251px] w-full max-w-[251px] overflow-hidden rounded-[1.25rem]'>
								<Image
									src={testimonial.url_photo}
									width={0}
									height={0}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									quality={100}
									alt={`${testimonial.profile_name} Picture`}
									className='h-full w-full rounded-inherit object-cover'
								/>
							</div>
							<div className='mx-auto mt-[2.8125rem] w-full max-w-[19.125rem] text-center'>
								<BaseHTMLRender className='line-clamp-4 h-24 text-base text-secondary' content={testimonial.review} />
								<h3 className='mt-30 text-lg font-semibold text-primary'>{testimonial.profile_name}</h3>
								{testimonial.user_name && <p className='text-base text-secondary'>@{testimonial.user_name}</p>}
							</div>
						</div>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default TestimonyDesktop;
