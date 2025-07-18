import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const BaseHeaderPromo = (props) => {
	const { data, onTracker, onClose } = props;

	return (
		<div className='bg-primary py-4'>
			<BaseContainer className='max-md:max-w-none'>
				<div className='flex justify-between lg:justify-end'>
					<div className='w-4/5 md:w-11/12'>
						<div className='flex flex-col justify-start md:flex-row md:items-center lg:justify-center'>
							<p className='text-sm text-white md:text-lg'>{data?.text}</p>
							<a
								href={data?.url}
								rel='noopener noreferrer'
								target='_blank'
								className='floating-promo-page'
								onClick={() => {
									window.fbq('track', 'Lead');
									window.fbq('track', 'Purchase', {
										value: '300000',
										currency: 'IDR',
									});
									onTracker('EventContact', `Click - ${data?.text}`, data?.url);
								}}
								aria-label='floating-promo-page'
							>
								<div className='flex items-center gap-x-1'>
									<p className='text-sm text-white underline md:ml-3 md:text-lg'>Chat WhatsApp</p>
									<span className='text-sm font-semibold text-white md:text-lg'>&gt;</span>
								</div>
							</a>
						</div>
					</div>

					<div className='w-1/12 md:w-auto'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='ml-auto h-6 w-6 cursor-pointer text-white'
							onClick={onClose}
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
						</svg>
					</div>
				</div>
			</BaseContainer>
		</div>
	);
};

export default BaseHeaderPromo;
