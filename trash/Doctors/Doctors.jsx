import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

import { useResponsive } from '@shared/hooks/hooks';

import { SETTINGS } from '@shared/constants/settings_slides';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseButtonArrow from '@shared/components/BaseButton/BaseButtonArrow/BaseButtonArrow';
import DoctorItem from './DoctorItem/DoctorItem';

const Doctors = ({ content, doctors }) => {
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
		<section className='py-50 lg:py-70'>
			<BaseContainer>
				<h2 className='mx-auto mb-10 w-full max-w-[320px] text-center text-[1.75rem] font-semibold text-primary lg:mb-50 lg:max-w-[441px] lg:text-5xl'>
					{content.title}
				</h2>

				<div className='grid grid-cols-1 md:gap-50 lg:gap-100'>
					<div className='relative'>
						{isLargeAbove && doctors?.length > 3 && (
							<BaseButtonArrow
								className={`${currentSlide === 0 ? 'hidden' : 'block'}`}
								onClick={prev}
								direction='left'
							/>
						)}
						{!isLargeAbove && doctors?.length > 1 && (
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
								{doctors.map((doctor) => (
									<React.Fragment key={doctor.id}>
										<DoctorItem {...doctor} />
									</React.Fragment>
								))}
							</Slider>
						</div>
						{isLargeAbove && doctors?.length > 3 && (
							<BaseButtonArrow
								className={`${currentSlide === doctors.length - 3 ? 'hidden' : 'block'}`}
								onClick={next}
								direction='right'
							/>
						)}
						{!isLargeAbove && doctors?.length > 1 && (
							<BaseButtonArrow
								className={`${currentSlide === doctors.length - 1 ? 'hidden' : 'block'}`}
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

export default Doctors;
