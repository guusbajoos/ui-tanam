import { useRef, useState } from 'react';
import Slider from 'react-slick';

import { useResponsive } from '@shared/hooks/hooks';

import { SETTINGS } from '@shared/constants/settings_slides';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButtonArrow from '@shared/components/BaseButton/BaseButtonArrow/BaseButtonArrow';
import BeforeAfterItem from './BeforeAfterItem/BeforeAfterItem';

const BeforeAfter = ({ photos, content }) => {
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

	return (
		<section className='bg-gray-100 py-50 lg:py-70'>
			<BaseContainer>
				<h2 className='mx-auto mb-10 line-clamp-3 w-full max-w-[365px] text-center text-[1.75rem] font-semibold text-primary lg:mx-0 lg:mb-50 lg:line-clamp-2 lg:max-w-[620px] lg:text-left lg:text-5xl'>
					{content.title}
				</h2>

				<div className='grid grid-cols-1 lg:gap-x-100'>
					<div className='relative'>
						{isLargeAbove && photos?.length > 3 && (
							<BaseButtonArrow
								className={`${currentSlide === 0 ? 'hidden' : 'block'}`}
								onClick={prev}
								direction='left'
							/>
						)}
						{!isLargeAbove && photos?.length > 1 && (
							<BaseButtonArrow
								className={`${currentSlide === 0 ? 'hidden' : 'block'}`}
								onClick={prev}
								direction='left'
							/>
						)}
						<div className='mx-auto w-full'>
							<Slider
								ref={(slider) => (sliderRef.current = slider)}
								{...SETTINGS}
								beforeChange={(_, newIndex) => setCurrentSlide(newIndex)}
								afterChange={(index) => setCurrentSlide(index)}
							>
								{photos.map((photo, idx) => (
									<BeforeAfterItem photo={photo} countPhoto={idx + 1} key={photo.id} />
								))}
							</Slider>
						</div>
						{isLargeAbove && photos?.length > 3 && (
							<BaseButtonArrow
								className={`${currentSlide === photos.length - 3 ? 'hidden' : 'block'}`}
								onClick={next}
								direction='right'
							/>
						)}
						{!isLargeAbove && photos?.length > 1 && (
							<BaseButtonArrow
								className={`${currentSlide === photos.length - 1 ? 'hidden' : 'block'}`}
								onClick={next}
								direction='right'
							/>
						)}
					</div>
				</div>
			</BaseContainer>
		</section>
	);
};

export default BeforeAfter;
