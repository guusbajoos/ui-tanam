import Image from 'next/image';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const WhatIsImplan = ({ content }) => {
	return (
		<section className='bg-gray-100 py-50 lg:py-70'>
			<BaseContainer>
				<div className='flex flex-wrap items-center'>
					<div className='w-full lg:w-1/2'>
						<div className='aspect-4/3 rounded-lg'>
							<Image
								src={content.url_image}
								width={0}
								height={0}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={100}
								alt={`Thumbnail ${content.title}`}
								className='h-full w-full rounded-lg object-cover'
							/>
						</div>
					</div>
					<div className='w-full lg:w-1/2'>
						<div className='mt-30 text-left lg:mt-0 lg:pl-50'>
							<h2 className='text-[1.75rem] font-semibold text-secondary lg:text-5xl'>{content.title}</h2>
							<BaseHTMLRender
								className='mx-auto mt-30 text-base text-secondary lg:line-clamp-5 lg:text-xl'
								content={content.description}
							/>
						</div>
					</div>
				</div>
			</BaseContainer>
		</section>
	);
};

export default WhatIsImplan;
