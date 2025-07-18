import React from 'react';

import clsx from 'clsx';

import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const WhyImplanTableRowDesktop = (props) => {
	return (
		<React.Fragment>
			<div
				className={clsx(
					'flex w-1/3 items-center justify-center border border-l border-r-0 border-solid border-white p-5 text-white',
					{
						'rounded-tl-[1.875rem]': props.first?.is_top_left_radius,
						'rounded-bl-[1.875rem]': props.first?.is_bottom_left_radius,
						'border-b': props.first?.is_border_bottom,
						'border-b-0': !props.first?.is_border_bottom,
					},
				)}
			>
				<p className='line-clamp-1 w-full break-all text-center font-normal text-white'>{props.first?.text}</p>
			</div>
			<div className='flex w-1/3 items-center border border-b-0 border-r-0 border-solid border-white bg-white p-5 text-white'>
				<BaseHTMLRender className='w-full break-all font-semibold text-secondary' content={props.second?.text} />
			</div>
			<div
				className={clsx('flex w-1/3 items-center border border-r border-solid border-white p-5 text-white', {
					'rounded-tr-[1.875rem]': props.last?.is_top_right_radius,
					'rounded-br-[1.875rem]': props.last?.is_bottom_right_radius,
					'border-b': props.last?.is_border_bottom,
					'border-b-0': !props.last?.is_border_bottom,
				})}
			>
				<BaseHTMLRender className='w-full break-all font-normal text-white' content={props.last?.text} />
			</div>
		</React.Fragment>
	);
};

export default WhyImplanTableRowDesktop;
