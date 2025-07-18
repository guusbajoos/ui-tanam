import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const WhyImplanItem = (props) => {
	return (
		<div className='w-full'>
			<div className='flex items-center gap-5'>
				<div className='h-[6.25rem] min-w-[6.25rem] rounded-[0.625rem] lg:h-[8.75rem] lg:min-w-[8.75rem]'>
					<Image
						src={props.url_image}
						alt={props.title}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						className='aspect-1/1 h-full w-full rounded-[0.625rem] object-cover'
					/>
				</div>
				<div>
					<h3 className='mb-1.5 text-xl font-semibold text-secondary md:text-[1.375rem]'>{props.title}</h3>
					<BaseHTMLRender className='mb-0 text-xs text-black md:text-sm' content={props.description} />
				</div>
			</div>
		</div>
	);
};

export default WhyImplanItem;
