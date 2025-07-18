import React from 'react';

import Image from 'next/image';

const DoctorItem = (props) => {
	return (
		<React.Fragment>
			<div className='relative m-auto aspect-1/1 w-full max-w-[16.875rem] overflow-hidden'>
				<div className='relative h-full w-full overflow-hidden rounded-t-[1.875rem]'>
					<Image
						src={props.url_image}
						width={0}
						height={0}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						quality={100}
						alt={props.name}
						className='w-full h-full'
					/>
				</div>
			</div>
			<div className='m-auto h-[5.625rem] max-w-[16.875rem] rounded-b-[1.875rem] bg-[#e1f5f2] p-3 text-center'>
				<h3 className='block pb-1 text-xl font-semibold line-clamp-1 text-primary'>{props.name}</h3>
				{props.school && <p className='mb-0 text-xs text-secondary'>{props.school}</p>}
				<p className='mb-0 text-xs text-secondary'>{props.speciality}</p>
			</div>
		</React.Fragment>
	);
};

export default DoctorItem;
