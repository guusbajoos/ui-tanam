import clsx from 'clsx';

const BaseButtonArrow = (props) => {
	return (
		<button
			className={clsx(
				`absolute top-1/2 z-[1] flex h-8 w-8 -translate-y-[50%] cursor-pointer items-center justify-center rounded-full border-none  outline-0 ${props.className}`,
				{
					'left-0 lg:-left-5': props.direction === 'left',
					'right-0 lg:-right-5': props.direction === 'right',
					'bg-[#d9d9d9]': !props.bgNone,
				},
			)}
			onClick={props.onClick}
		>
			{props.direction === 'right' ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='3'
					stroke='currentColor'
					className='h-5 w-5 align-middle text-primary'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='3'
					stroke='currentColor'
					className='h-5 w-5 align-middle text-primary'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
				</svg>
			)}
		</button>
	);
};

BaseButtonArrow.defaultProps = {
	className: '',
};

export default BaseButtonArrow;
