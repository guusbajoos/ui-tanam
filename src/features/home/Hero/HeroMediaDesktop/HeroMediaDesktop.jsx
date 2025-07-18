import React from 'react';

import HeroContentDesktop from '../HeroContentDesktop/HeroContentDesktop';

const HeroMediaDesktop = ({ content, usps, onClick }) => {
	return (
		<React.Fragment>
			<HeroContentDesktop content={content} usps={usps} onClick={onClick} />

			<div className='relative aspect-16/9 w-1/2 overflow-hidden xl:w-57%'>
				<div className='relative w-full h-full'>
					<video autoPlay loop muted controls playsInline className='relative inset-x-0 object-cover w-full h-full'>
						<source src={content.video_url} type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HeroMediaDesktop;
