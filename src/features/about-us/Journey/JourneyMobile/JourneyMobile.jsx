import React from 'react';

import Image from 'next/image';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const JourneyMobile = (props) => {
	return (
		<React.Fragment>
			<div>
				<h2 className='m-auto w-full max-w-[20rem] text-center text-[1.75rem] font-semibold text-primary'>
					{props.title}
				</h2>
			</div>
			<div className='mx-auto my-30 aspect-16/9 w-full rounded-lg md:px-6'>
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
			<div className='text-center'>
				<BaseHTMLRender
					className='mx-auto w-full max-w-[20.375rem] text-base text-secondary md:text-lg'
					content={props.review}
				/>
			</div>
		</React.Fragment>
	);
};

export default JourneyMobile;
