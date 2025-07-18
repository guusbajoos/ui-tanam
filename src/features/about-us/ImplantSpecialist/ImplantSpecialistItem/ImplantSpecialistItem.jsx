import React from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const ImplantSpecialistItem = ({ position, src, alt, title, description }) => {
	return (
		<div className='flex flex-col items-center lg:mb-[7.5rem] lg:flex-row lg:gap-x-[8rem] lg:last:mb-0'>
			<React.Fragment>
				<div
					className={clsx('aspect-16/9 min-h-[224px] w-full lg:aspect-1/1 lg:h-[400px] lg:w-[400px]', {
						'lg:order-1': position === 'LEFt',
						'lg:order-2': position === 'RIGHT',
					})}
				>
					<Image
						src={src}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt={alt || title}
						className='h-full w-full object-cover'
					/>
				</div>
				<div className='w-full px-4 py-5 lg:px-0 lg:py-0'>
					<h3 className='mb-5 line-clamp-4 text-xl font-bold text-secondary lg:mb-8 lg:line-clamp-3 lg:text-[1.625rem]'>
						{title}
					</h3>
					<BaseHTMLRender
						content={description}
						className='line-clamp-5 w-full text-sm font-normal text-secondary lg:line-clamp-4 lg:text-xl'
					/>
				</div>
			</React.Fragment>
		</div>
	);
};

export default ImplantSpecialistItem;
