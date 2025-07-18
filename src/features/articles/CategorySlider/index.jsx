import React, { useRef, useState, useEffect } from 'react';
import BaseButton from '@shared/components/BaseButton/BaseButton';

function CategorySlider({ categories, setCategory_slug, category_slug }) {
	const scrollContainerRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const handleStart = (e) => {
		setIsDragging(true);
		setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
	};

	const handleEnd = () => {
		setIsDragging(false);
	};

	const handleMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
		const walk = (x - startX) * 2; // Adjust scrolling speed
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('mousedown', handleStart);
			container.addEventListener('touchstart', handleStart);
			container.addEventListener('mouseup', handleEnd);
			container.addEventListener('touchend', handleEnd);
			container.addEventListener('mousemove', handleMove);
			container.addEventListener('touchmove', handleMove);
			container.addEventListener('mouseleave', handleEnd);

			return () => {
				container.removeEventListener('mousedown', handleStart);
				container.removeEventListener('touchstart', handleStart);
				container.removeEventListener('mouseup', handleEnd);
				container.removeEventListener('touchend', handleEnd);
				container.removeEventListener('mousemove', handleMove);
				container.removeEventListener('touchmove', handleMove);
				container.removeEventListener('mouseleave', handleEnd);
			};
		}
	}, [isDragging, startX, scrollLeft]);

	const handleCategoryButton = (buttonCategorySlug) => {
		if (buttonCategorySlug === category_slug) {
			return 'bg-primary text-white ';
		} else {
			return 'bg-white text-[#3D7E77] text-primary';
		}
	};

	return (
		<div
			className='no-scrollbar flex cursor-grab gap-5 overflow-x-scroll active:cursor-grabbing'
			style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			ref={scrollContainerRef}
		>
			<div className=' w-fit flex-shrink-0 lg:w-[200px]'>
				<BaseButton
					wrapperClassName='max-w-none border-primary border rounded-[3rem] border-2'
					linkClassName='button-promo'
					buttonClassName={`font-semibold text-[0.8125rem] md:text-base !py-2.5 !px-5 lg:text-lg ${handleCategoryButton(
						'',
					)}`}
					onClick={() => setCategory_slug('')}
				>
					All
				</BaseButton>
			</div>

			{categories.map((category) => (
				<div key={category.slug} className='w-min-[200px] flex-shrink-0'>
					<BaseButton
						wrapperClassName='inline-block min-w-max border-primary border rounded-[3rem] border-2'
						linkClassName='button-promo'
						buttonClassName={`font-semibold text-[0.8125rem] md:text-base !py-2.5 !px-5 lg:text-lg text-[#3D7E77] ${handleCategoryButton(
							category.slug,
						)}`}
						onClick={() => setCategory_slug(category.slug)}
					>
						{category.label}
					</BaseButton>
				</div>
			))}
		</div>
	);
}

export default CategorySlider;
