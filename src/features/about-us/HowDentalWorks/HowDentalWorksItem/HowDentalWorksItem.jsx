import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const HowDentalWorksItem = (props) => {
	return (
		<div className='w-full px-[25px]'>
			<div className='rounded-xl'>
				<Image
					src={props.url_image}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt={props.title}
					className='aspect-16/9 h-full w-full rounded-xl object-cover'
				/>
			</div>

			<div className='text-center'>
				<h3 className='mx-auto my-2.5 text-xl font-semibold text-secondary lg:text-2xl'>{props.title}</h3>
				<BaseHTMLRender className='text-sm text-secondary lg:text-xl' content={props.description} />
			</div>
		</div>
	);
};

export default HowDentalWorksItem;
