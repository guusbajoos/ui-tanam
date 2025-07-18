import React from 'react';

import BaseButtonArrowSlide from '@shared/components/BaseButton/BaseButtonArrowSlide/BaseButtonArrowSlide';
import BaseImageTwoRows from '@shared/components/BaseImage/BaseImageTwoRows/BaseImageTwoRows';

const BeforeAfterItem = ({ photo, countPhoto }) => {
	return (
		<React.Fragment>
			<div className='relative m-auto aspect-1/1 w-full max-w-[18.0625rem] overflow-hidden'>
				<BaseImageTwoRows
					image={{
						url_before: photo.url_before,
						url_after: photo.url_after,
					}}
					alt={{
						alt_before: `Case Before ${countPhoto}`,
						alt_after: `Case After ${countPhoto}`,
					}}
				/>
				<BaseButtonArrowSlide slide='down' />
			</div>
			<div className='m-auto max-w-[18.0625rem] text-center'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='mx-auto my-3 h-7 w-7 text-primary'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
				<p className='block text-xl text-secondary'>Case {countPhoto}</p>
			</div>
		</React.Fragment>
	);
};

export default BeforeAfterItem;
