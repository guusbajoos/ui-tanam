import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useResponsive } from '@shared/hooks/hooks';

import { SETTINGS } from '@shared/constants/settings_hero_slides';

import HeroSliderItem from './HeroSliderItem/HeroSliderItem';

const HeroSlider = ({ photos, content }) => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const autoplayTimerRef = useRef(null);

	const windowSize = useResponsive();

	const isLargeAbove = windowSize.width >= 1024;

	const startAutoplay = () => {
		if (autoplayTimerRef.current) {
			clearInterval(autoplayTimerRef.current);
		}
		autoplayTimerRef.current = setInterval(() => {
			if (sliderRef.current) {
				sliderRef.current.slickNext();
			}
		}, 5000);
	};

	useEffect(() => {
		startAutoplay();

		return () => {
			if (autoplayTimerRef.current) {
				clearInterval(autoplayTimerRef.current);
			}
		};
	}, []);

	const handleMouseEnter = () => {
		if (autoplayTimerRef.current) {
			clearInterval(autoplayTimerRef.current);
		}
	};

	const handleMouseLeave = () => {
		startAutoplay();
	};

	return (
		<section
			className='custom-hero-slider relative bg-gray-100'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Slider
				ref={(slider) => (sliderRef.current = slider)}
				{...SETTINGS}
				autoplay={false}
				beforeChange={(_, newIndex) => setCurrentSlide(newIndex)}
				afterChange={(index) => setCurrentSlide(index)}
			>
				{photos.map((photo, idx) => (
					<HeroSliderItem photo={photo} countPhoto={idx + 1} key={photo.id} isLargeAbove={isLargeAbove} />
				))}
			</Slider>
		</section>
	);
};

export default HeroSlider;
