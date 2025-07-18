import React from 'react';
import Slider from 'react-slick';

import Image from 'next/image';

import { SETTINGS } from '../constants';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import HeroPremiumMaterial from '../HeroPremiumMaterial/HeroPremiumMaterial';

const HeroContentMobile = ({ content, usps, onClick }) => {
	return (
		<div className='m-auto w-full max-w-[19.625rem] py-10 md:max-w-none'>
			<h1 className='px-[1.125rem] text-center text-[1.75rem] font-semibold text-secondary md:mx-auto md:my-0 md:w-full md:max-w-[25.875rem] md:p-0 md:text-[2.625rem]'>
				{content.title}
			</h1>

			<div className='mx-auto my-5 overflow-hidden'>
				{usps?.length > 1 ? (
					<Slider {...SETTINGS}>
						{usps.map((usp) => (
							<div key={usp.id}>
								<div className='flex h-24 items-center justify-center'>
									<div className='flex h-50 w-50 items-center justify-center rounded-full bg-primary md:h-[4.125rem] md:w-[4.125rem]'>
										<Image
											src={usp.url_icon}
											width='0'
											height='0'
											sizes='100vw'
											alt={usp.label}
											className='h-30 w-30 object-contain md:h-[2.4375rem] md:w-[2.4375rem]'
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
							<div key={usp.id}>
								<Row align='middle' justify='center' style={{ height: '6rem' }}>
									<div className={styles['usp__circle']}>
										<Image src={usp.url_icon} width='0' height='0' sizes='100vw' alt={usp.label} />
									</div>
									<h2 className='ml-[1.4375rem] line-clamp-2 w-full max-w-[13rem] text-[1.4375rem] font-semibold text-primary'>
										{usp.label}
									</h2>
								</Row>
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
	);
};

export default HeroContentMobile;
