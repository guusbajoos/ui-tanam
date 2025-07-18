import Image from 'next/image';

import { PREMIUM_MATERIAL } from '../constants';

const HeroPremiumMaterial = () => {
	return (
		<div className='mx-auto mt-7 flex flex-col gap-y-4 lg:mt-9'>
			<p className='text-center text-sm tracking-[2px] text-[#162326]'>Premium Material</p>

			<div className='flex w-full flex-row justify-center gap-x-4'>
				{PREMIUM_MATERIAL.map((premium) => (
					<div className='w-full max-w-[108px]' key={premium.id}>
						<Image
							src={premium.image_url}
							width='0'
							height='0'
							sizes='100vw'
							alt={premium.alt_text}
							className='h-full w-full object-contain'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default HeroPremiumMaterial;
