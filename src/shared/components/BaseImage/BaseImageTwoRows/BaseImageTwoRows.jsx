import React from 'react';

import Image from 'next/image';

const BaseImageTwoRows = ({ image, alt, priority = false }) => {
	return (
		<React.Fragment>
			<div className='relative h-1/2 w-full overflow-hidden rounded-t-[1.25rem]'>
				<Image
					src={image.url_before}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt={alt.alt_before}
					priority={priority}
					className='h-full w-full rounded-inherit'
				/>
			</div>
			<div className='relative h-1/2 w-full overflow-hidden rounded-b-[1.25rem]'>
				<Image
					src={image.url_after}
					width={0}
					height={0}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					quality={100}
					alt={alt.alt_after}
					priority={priority}
					className='h-full w-full rounded-inherit'
				/>
			</div>
		</React.Fragment>
	);
};

export default BaseImageTwoRows;
