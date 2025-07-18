import React from 'react';

import clsx from 'clsx';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const WhyImplanTableRowMobile = (props) => {
	return (
		<React.Fragment>
			<div
				className={clsx(
					'flex w-[25%] items-center rounded-bl-none rounded-tl-none border border-l-0 border-r-0 border-solid border-white p-3 text-white sm:w-1/3',
					{
						'border-b': props.first?.is_border_bottom,
						'border-b-0': !props.first?.is_border_bottom,
					},
				)}
			>
				<p className='w-full break-all text-center font-normal text-white'>{props.first?.text}</p>
			</div>
			<div className='flex w-[37.5%] items-center border border-b-0 border-r-0 border-solid border-white bg-white p-3 text-white sm:w-1/3'>
				<BaseHTMLRender
					className='mcomparison w-full break-all font-semibold text-secondary'
					content={props.second?.text}
				/>
			</div>
			<div
				className={clsx(
					'flex w-[37.5%] items-center justify-center rounded-br-none rounded-tr-none border border-l-0 border-r-0 border-solid border-white p-3 text-white sm:w-1/3',
					{
						'border-b': props.last?.is_border_bottom,
						'border-b-0': !props.last?.is_border_bottom,
					},
				)}
			>
				<BaseHTMLRender className='mcomparison w-full break-all font-normal text-white' content={props.last?.text} />
			</div>
		</React.Fragment>
	);
};

export default WhyImplanTableRowMobile;
