import Image from 'next/image';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const Doctor = ({ doctor }) => {
	return (
		<section className='bg-[#F7F8F9] pt-50 lg:pt-70'>
			<BaseContainer>
				<h2 className='mx-auto line-clamp-4 w-full text-center text-[2.125rem] font-semibold text-primary lg:mb-4 lg:line-clamp-3 lg:max-w-[818px] lg:text-5xl'>
					{doctor.title}
				</h2>
				<div className='hidden lg:block'>
					<BaseHTMLRender
						content={doctor.description}
						className='mx-auto line-clamp-3 w-full text-center text-2xl text-black lg:max-w-[747px]'
					/>
				</div>
			</BaseContainer>

			<Image
				unoptimized
				src={doctor.url_image}
				width={0}
				height={0}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				quality={100}
				alt={doctor.url_image_alt || 'doctor banner'}
				priority
				className='h-full w-full object-cover'
			/>
			<BaseContainer className='block py-7 lg:hidden'>
				<BaseHTMLRender
					className='mx-auto line-clamp-4 w-full text-center text-lg text-black lg:max-w-[747px]'
					content={doctor.description}
				/>
			</BaseContainer>
		</section>
	);
};

export default Doctor;
