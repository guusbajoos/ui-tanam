import Image from 'next/image';

const WhyImplanTableHeading = () => {
	return (
		<div className='flex flex-wrap'>
			<div className='flex w-[25%] items-center justify-center bg-transparent py-6 text-white sm:w-1/3 lg:w-1/3' />
			<div className='flex w-[37.5%] items-center justify-center rounded-t-[1.25rem] bg-white py-6 text-white sm:w-1/3 lg:w-1/3'>
				<Image
					src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/icons/logo_tanam_gigi.svg'
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt='tanamgigi logo'
					className='h-auto w-[70px] object-cover'
				/>
			</div>
			<h3 className='flex w-[37.5%] items-center justify-center py-6 text-center text-2xl font-semibold text-white sm:w-1/3 lg:w-1/3 lg:text-[1.75rem]'>
				Klinik <br />
				Lain
			</h3>
		</div>
	);
};

export default WhyImplanTableHeading;
