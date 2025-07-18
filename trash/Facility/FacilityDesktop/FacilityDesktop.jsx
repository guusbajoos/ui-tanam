import React from 'react';

import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const FacilityDesktop = (props) => {
	return (
		<React.Fragment>
			<div className='w-1/2'>
				<div className='mx-auto w-full max-w-[29rem] p-0 text-left xl:max-w-[35rem]'>
					<h1 className='text-left text-[2.625rem] font-semibold text-secondary xl:text-5xl'>{props.title}</h1>
					<BaseHTMLRender
						content={props.description}
						className='mt-30 line-clamp-4 w-full text-left text-xl text-secondary'
					/>
				</div>
			</div>
			<div className='w-1/2'>
				<div className='h-full w-full'>
					<Image
						src={props.url_image}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt='facility'
						priority
						className='aspect-1/1 h-full w-full object-cover'
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FacilityDesktop;
