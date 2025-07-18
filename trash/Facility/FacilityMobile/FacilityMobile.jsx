import React from 'react';

import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const FacilityMobile = (props) => {
	return (
		<React.Fragment>
			<div className='w-full'>
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
			<div className='w-full px-4'>
				<div className='m-auto w-full py-10'>
					<h1 className='text-left text-[1.75rem] font-semibold text-secondary'>{props.title}</h1>
					<BaseHTMLRender content={props.description} className='mt-5 w-full text-left text-base text-secondary' />
				</div>
			</div>
		</React.Fragment>
	);
};

export default FacilityMobile;
