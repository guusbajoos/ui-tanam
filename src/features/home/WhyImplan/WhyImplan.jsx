import React from 'react';

import { useResponsive } from '@shared/hooks/hooks';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

import WhyImplanTableHeading from './WhyImplanTableHeading/WhyImplanTableHeading';
import WhyImplanTableRowDesktop from './WhyImplanTableRowDesktop/WhyImplanTableRowDesktop';
import WhyImplanTableRowMobile from './WhyImplanTableRowMobile/WhyImplanTableRowMobile';
import WhyImplanTableLastRow from './WhyImplanTableLastRow/WhyImplanTableLastRow';

const WhyImplan = ({ content, comparisons }) => {
	const windowSize = useResponsive();

	const isLargeAbove = windowSize.width >= 1024;

	return (
		<section className='bg-primary py-50 lg:py-70'>
			<BaseContainer className='max-lg:px-0 max-md:max-w-none'>
				<div className='flex flex-wrap'>
					<div className='w-full lg:w-1/3'>
						<h2 className='mx-auto mb-50 w-full max-w-[310px] text-center text-[1.75rem] font-semibold text-white lg:mb-0 lg:max-w-[409px] lg:text-left lg:text-5xl'>
							{content.title}
						</h2>
					</div>
					<div className='w-full lg:w-2/3'>
						<WhyImplanTableHeading />
						{isLargeAbove ? (
							<div className='flex flex-wrap'>
								{comparisons.map((comparison) => (
									<React.Fragment key={comparison.id}>
										<WhyImplanTableRowDesktop {...comparison} />
									</React.Fragment>
								))}
							</div>
						) : (
							<div className='flex flex-wrap'>
								{comparisons.map((comparison) => (
									<React.Fragment key={comparison.id}>
										<WhyImplanTableRowMobile {...comparison} />
									</React.Fragment>
								))}
							</div>
						)}

						{isLargeAbove ? null : <WhyImplanTableLastRow />}
					</div>
				</div>
			</BaseContainer>
		</section>
	);
};

export default WhyImplan;
