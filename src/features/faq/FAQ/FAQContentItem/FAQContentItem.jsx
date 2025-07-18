import Image from 'next/image';

import clsx from 'clsx';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const FAQContentItem = ({ content, index }) => {
	return (
		<div
			className={clsx('mb-8 flex flex-col items-center last:mb-0 lg:flex-row lg:gap-x-10', {
				'mt-9': index === 0,
			})}
		>
			<div
				className={clsx('relative aspect-16/9 h-full w-full', {
					'lg:order-1': content.position_image === 'LEFt',
					'lg:order-2': content.position_image === 'RIGHT',
				})}
			>
				<Image
					src={content.url_image}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt={`Image Content - ${index + 1}`}
					className='h-full w-full rounded-2xl object-cover'
				/>
			</div>
			<div className='w-full'>
				{content.sub_title && (
					<h3 className='my-3 line-clamp-3 text-center text-base font-bold text-black lg:mb-3 lg:mt-0 lg:line-clamp-2 lg:text-left'>
						{content.sub_title}
					</h3>
				)}
				<BaseHTMLRender
					className={clsx(
						'line-clamp-6 w-full text-center text-xs text-black md:text-sm lg:line-clamp-5 lg:text-left',
						{
							'mt-5 lg:mt-0': !content.sub_title,
						},
					)}
					content={content.content}
				/>
			</div>
		</div>
	);
};

export default FAQContentItem;
