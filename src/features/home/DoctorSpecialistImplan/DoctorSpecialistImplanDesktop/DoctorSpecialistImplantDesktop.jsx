import React from 'react';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const DoctorSpecialistImplantDesktop = ({ content, onClick }) => {
	return (
		<React.Fragment>
			<div className='w-1/2'>
				<video autoPlay loop muted playsInline className='aspect-16/9 h-auto w-full'>
					<source src={content.video_url} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
			<div className='w-1/2'>
				<div className='pl-50'>
					<h2 className='m-auto w-full text-left text-5xl font-semibold text-secondary'>{content.title}</h2>

					<BaseHTMLRender
						className='my-30 line-clamp-3 w-full text-left text-xl text-secondary'
						content={content.description}
					/>

					<BaseButton
						wrapperClassName='m-0'
						linkClassName='how-it-work'
						buttonType='link'
						isExternal
						href={content.button_url}
						onClick={onClick}
					>
						{content.button_text}
					</BaseButton>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DoctorSpecialistImplantDesktop;
