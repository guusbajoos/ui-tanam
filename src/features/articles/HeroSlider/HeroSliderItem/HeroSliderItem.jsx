import React from 'react';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import Image from 'next/image';
import Link from 'next/link';
const HeroSliderItem = ({ photo, countPhoto, isLargeAbove }) => {
	return (
		<React.Fragment>
			<div className='relative m-auto  w-full '>
				<div className='font-extraBold  absolute bottom-[56px] left-[6%] z-30  w-3/4 text-[30px] font-bold    text-white sm:left-[40px] md:text-[40px] lg:bottom-[130px] lg:left-[5%] lg:w-6/12  lg:text-[60px] xl:left-[5%] xl:w-[40%] xl:text-[65px]'>
					<Link href={`/articles/${photo.category_slug}/${photo.slug}`}>
						<BaseButton
							linkClassName='header'
							buttonClassName='flex justify-center items-center h-[23px] lg:h-10 max-w-[130px] lg:max-w-[300px] text-xs sm:text-base tracking-[1px] bg-white font-extraBold text-xl text-[#3D7E77]'
							style={{
								padding: '0px',
							}}
						>
							<div className='mt-[3px] lg:mt-0'>READ MORE</div>
						</BaseButton>
					</Link>
				</div>
				{photo.url_slider_desktop && photo.url_slider_mobile && (
					<Image
						src={isLargeAbove ? photo.url_slider_desktop : photo.url_slider_mobile}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt={isLargeAbove ? photo.url_slider_desktop_alt : photo.url_slider_mobile_alt}
						priority={true}
						unoptimized
						className='  h-auto w-screen rounded-inherit lg:h-auto '
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default HeroSliderItem;
