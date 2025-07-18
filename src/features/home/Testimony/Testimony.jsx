import { useState, useRef } from 'react';

import Image from 'next/image';

import { useResponsive } from '@shared/hooks/hooks';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButtonArrow from '@shared/components/BaseButton/BaseButtonArrow/BaseButtonArrow';

import TestimonyDesktop from './TestimonyDesktop/TestimonyDesktop';
import TestimonyMobile from './TestimonyMobile/TestimonyMobile';

const Testimony = ({ testimonials }) => {
	const windowSize = useResponsive();
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);

	const isLargeAbove = windowSize.width >= 1024;

	const prev = () => {
		sliderRef?.current?.slickPrev();
	};

	const next = () => {
		sliderRef?.current?.slickNext();
	};

	return (
		<section className='bg-gray-100 py-50 lg:py-70'>
			<BaseContainer>
				<h2 className='text-center text-[1.75rem] font-semibold text-secondary lg:text-5xl'>Testimoni Pasien</h2>

				<div className='mx-auto mb-50 mt-30 max-w-[12.5rem] overflow-hidden lg:max-w-[15.625rem]'>
					<Image
						src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/images/logo-customers_1687940604579.webp'
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt='rating'
						className='h-full w-full object-contain'
					/>
				</div>

				<div className='relative'>
					{isLargeAbove && testimonials?.length > 3 && (
						<BaseButtonArrow className={`${currentSlide === 0 ? 'hidden' : 'block'}`} onClick={prev} direction='left' />
					)}
					{!isLargeAbove && testimonials?.length > 1 && (
						<BaseButtonArrow className={`${currentSlide === 0 ? 'hidden' : 'block'}`} onClick={prev} direction='left' />
					)}
					{isLargeAbove ? (
						<TestimonyDesktop
							testimonials={testimonials}
							sliderRef={sliderRef}
							beforeChange={(index) => setCurrentSlide(index)}
							afterChange={(index) => setCurrentSlide(index)}
						/>
					) : (
						<TestimonyMobile
							testimonials={testimonials}
							sliderRef={sliderRef}
							beforeChange={(index) => setCurrentSlide(index)}
							afterChange={(index) => setCurrentSlide(index)}
						/>
					)}
					{isLargeAbove && testimonials?.length > 3 && (
						<BaseButtonArrow
							className={`${currentSlide === testimonials.length - 3 ? 'hidden' : 'block'}`}
							onClick={next}
							direction='right'
						/>
					)}
					{!isLargeAbove && testimonials?.length > 1 && (
						<BaseButtonArrow
							className={`${currentSlide === testimonials.length - 1 ? 'hidden' : 'block'}`}
							onClick={next}
							direction='right'
						/>
					)}
				</div>
			</BaseContainer>
		</section>
	);
};

export default Testimony;
