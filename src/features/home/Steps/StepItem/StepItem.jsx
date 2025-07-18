import Image from 'next/image';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const StepItem = ({ step, countStep }) => {
	return (
		<div className='flex gap-5'>
			<div className='h-100 min-w-[6.25rem] max-w-[6.25rem] rounded-[0.625rem] lg:h-[7.1875rem] lg:min-w-[7.1875rem] lg:max-w-[7.1875rem]'>
				<Image
					src={step.url_image}
					alt={step.title}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					className='aspect-1/1 h-full w-full rounded-[0.625rem] object-cover'
				/>
			</div>
			<div>
				<p className='text-sm text-black lg:text-base'>Step {countStep}.</p>
				<h3 className='mx-auto my-1.5 text-xl font-semibold text-secondary lg:text-[1.375rem]'>{step.title}</h3>
				<BaseHTMLRender content={step.description} className='text-sm leading-tight text-black' />
			</div>
		</div>
	);
};

export default StepItem;
