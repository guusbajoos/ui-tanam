import Image from 'next/image';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const Offline = () => {
	return (
		<BaseMain>
			<div className='py-[68px]'>
				<BaseContainer>
					<div className='flex flex-col items-center justify-center lg:flex-row'>
						<div className='md:h-[333px] md:w-[408px] lg:h-[533px] lg:w-[608px]'>
							<Image
								src='https://implant-web-staging-assets.s3.ap-southeast-1.amazonaws.com/images/tanamgigi_404-image_1681103134564.webp'
								alt='404'
								width={608}
								height={533}
								priority
								className='h-full w-full object-contain'
							/>
						</div>
						<div className='p-4 text-center lg:px-[2rem] lg:py-[90px] lg:text-left'>
							<h1 className='mb-2 text-5xl font-semibold text-primary lg:mb-2 lg:text-6xl'>Oops..</h1>
							<div className='mx-auto mb-50 mt-2.5 rounded-[4px] py-2 text-lg lg:mx-auto lg:w-max'>
								Kamu tidak terhubung internet nih. Coba untuk periksa internet kamu, ya!
							</div>
						</div>
					</div>
				</BaseContainer>
			</div>
		</BaseMain>
	);
};

export default Offline;
