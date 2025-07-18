import React from 'react';

import Image from 'next/image';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const HeroMobile = ({ content, onTracker }) => {
	return (
		<React.Fragment>
			<div className='w-full'>
				<div className='h-full w-full'>
					<Image
						src={content.url_image}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt='hero'
						priority
						className='aspect-1/1 h-full w-full object-cover'
					/>
				</div>
			</div>
			<div className='w-full px-4'>
				<div className='m-auto w-full max-w-[20.0625rem] py-10 md:max-w-[25.875rem]'>
					<h1 className='text-center text-[32px] font-semibold text-secondary md:text-[2.5rem]'>{content.title}</h1>

					<BaseHTMLRender
						content={content.description}
						className='mx-auto my-5 w-full max-w-[19.9375rem] text-center text-base text-secondary md:max-w-[25.875rem]'
					/>

					<BaseButton
						wrapperClassName='mx-auto'
						linkClassName='about-tanam'
						buttonType='link'
						isExternal={true}
						href={content.button_url}
						onClick={() => {
							window.fbq('track', 'Lead');
							window.fbq('track', 'Purchase', {
								value: '300000',
								currency: 'IDR',
							});
							onTracker();
						}}
					>
						{content.button_text}
					</BaseButton>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HeroMobile;
