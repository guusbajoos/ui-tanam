import React from 'react';

import Image from 'next/image';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const HeroDesktop = ({ content, onTracker }) => {
	return (
		<React.Fragment>
			<div className='w-1/2'>
				<div className='mx-auto max-w-[29rem] py-[9.375rem] text-left xl:max-w-[35rem]'>
					<h1 className='text-left text-[2.625rem] font-semibold text-secondary xl:text-[3.5rem]'>{content.title}</h1>

					<BaseHTMLRender
						content={content.description}
						className='my-[3.75rem] line-clamp-4 w-full max-w-[28.5625rem] text-left text-2xl text-secondary'
					/>

					<BaseButton
						wrapperClassName='mx-0'
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
			<div className='w-1/2'>
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
		</React.Fragment>
	);
};

export default HeroDesktop;
