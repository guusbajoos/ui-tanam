import React from 'react';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

import PromotionItem from './PromotionItem/PromotionItem';

const PromotionParent = ({ promotions, content }) => {
	return (
		<section className='py-50 lg:py-70'>
			<BaseContainer className='max-md:max-w-none'>
				<div className='mb-30 text-center lg:text-left'>
					<h1 className='mb-4 text-[2rem] font-semibold text-black lg:text-5xl'>{content.title}</h1>
					<BaseHTMLRender
						className='text-base tracking-[1.2px] text-secondary lg:text-xl'
						content={content.description}
					/>
				</div>

				<div className='grid max-w-full auto-rows-fr gap-y-4 md:max-w-[60%] lg:max-w-[40%]'>
					{promotions.map((promotion) => (
						<React.Fragment key={promotion.id}>
							<PromotionItem {...promotion} />
						</React.Fragment>
					))}
				</div>
			</BaseContainer>
		</section>
	);
};

export default PromotionParent;
