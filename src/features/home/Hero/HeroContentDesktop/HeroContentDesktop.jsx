import React from 'react';
import Slider from 'react-slick';

import Image from 'next/image';

import { SETTINGS } from '../constants';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import HeroPremiumMaterial from '../HeroPremiumMaterial/HeroPremiumMaterial';

const HeroContentDesktop = ({ content, usps, onClick }) => {
	return (
		<div className='w-1/2 xl:w-43%'>
			<div className='mx-auto my-0 w-full max-w-[25.875rem] py-10 xl:max-w-[29.6875rem]'>
				<h1 className='mx-auto w-full max-w-[380px] text-[2.625rem] font-semibold xl:text-5xl'>{content.title}</h1>

				<div className='mx-auto my-5 overflow-hidden'>
					{usps?.length > 1 ? (
						<Slider {...SETTINGS} className='mx-auto w-full max-w-[320px]'>
							{usps.map((usp) => (
								<div key={usp.id}>
									<div className='flex h-24 items-center'>
										<div className='flex h-[4.125rem] w-[4.125rem] items-center justify-center rounded-full bg-primary'>
											<Image
												src={usp.url_icon}
												width='0'
												height='0'
												sizes='100vw'
												alt={usp.label}
												className='h-[2.4375rem] w-[2.4375rem] object-contain'
											/>
										</div>
										<h2 className='ml-[1.4375rem] line-clamp-2 w-full max-w-[13rem] text-[1.4375rem] font-semibold text-primary'>
											{usp.label}
										</h2>
									</div>
								</div>
							))}
						</Slider>
					) : (
						<React.Fragment>
							{usps.map((usp) => (
								<div key={usp.id} className='mx-auto w-full max-w-[320px]'>
									<div className='flex h-24 items-center'>
										<div className='flex h-[4.125rem] w-[4.125rem] items-center justify-center rounded-full bg-primary'>
											<Image
												src={usp.url_icon}
												width='0'
												height='0'
												sizes='100vw'
												alt={usp.label}
												className='h-[2.4375rem] w-[2.4375rem] object-contain'
											/>
										</div>
										<h2 className='ml-[1.4375rem] line-clamp-2 w-full max-w-[13rem] text-[1.4375rem] font-semibold text-primary'>
											{usp.label}
										</h2>
									</div>
								</div>
							))}
						</React.Fragment>
					)}
				</div>

				<BaseButton
					wrapperClassName='mx-auto'
					linkClassName='about-tanam'
					buttonType='link'
					isExternal={true}
					href={content.button_url}
					onClick={onClick}
				>
					{content.button_text}
				</BaseButton>

				<HeroPremiumMaterial />
			</div>
		</div>
	);
};

export default HeroContentDesktop;
