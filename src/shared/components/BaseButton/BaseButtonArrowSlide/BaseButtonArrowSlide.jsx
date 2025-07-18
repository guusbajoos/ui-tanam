import clsx from 'clsx';

const BaseButtonArrowSlide = ({ slide = 'right' }) => {
	return (
		<div className='bg-primary-second absolute left-[45%] top-[50%] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none outline-0'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='3'
				stroke='currentColor'
				className={clsx('h-5 w-5 align-middle text-white', {
					'-rotate-90': slide === 'up',
					'rotate-90': slide === 'down',
					'rotate-180': slide === 'left',
				})}
			>
				<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
			</svg>
		</div>
	);
};

export default BaseButtonArrowSlide;
