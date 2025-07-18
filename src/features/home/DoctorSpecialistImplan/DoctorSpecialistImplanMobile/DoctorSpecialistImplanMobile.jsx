import React from 'react';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const DoctorSpecialistImplanMobile = ({ content, onClick }) => {
	return (
		<React.Fragment>
			<h2 className='m-auto w-full max-w-[331px] text-center text-[1.75rem] font-semibold text-secondary'>
				{content.title}
			</h2>

			<BaseHTMLRender
				className='mx-auto my-30 w-full max-w-[326px] text-center text-base text-secondary'
				content={content.description}
			/>

			<video autoPlay loop muted playsInline className='aspect-16/9 h-auto w-full'>
				<source src={content.video_url} type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			<BaseButton
				wrapperClassName='mx-auto mt-30'
				linkClassName='how-it-work'
				buttonType='link'
				isExternal
				href={content.button_url}
				onClick={onClick}
			>
				{content.button_text}
			</BaseButton>
		</React.Fragment>
	);
};

export default DoctorSpecialistImplanMobile;
