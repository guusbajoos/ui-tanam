import React from 'react';

import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const JourneyDesktop = (props) => {
	return (
		<React.Fragment>
			<div className='w-1/2'>
				<div className='pr-[5.0625rem] text-center'>
					<h2 className='m-auto mb-30 w-full text-5xl font-semibold text-primary'>{props.title}</h2>
					<BaseHTMLRender
						className='mx-auto mb-0 w-full max-w-[26.875rem] text-xl text-secondary'
						content={props.review}
					/>
				</div>
			</div>
			<div className='w-1/2'>
				<div className='aspect-16/9 w-full rounded-lg'>
					<Image
						src={props.url_image}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt={props.title}
						className='rounded-inherit h-full w-full object-cover'
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default JourneyDesktop;
