import { useResponsive } from '@shared/hooks/hooks';

import FacilityDesktop from './FacilityDesktop/FacilityDesktop';
import FacilityMobile from './FacilityMobile/FacilityMobile';

const Facility = ({ content }) => {
	const windowSize = useResponsive();

	const isLargeAbove = windowSize.width >= 1024;

	return (
		<section className='relative h-auto overflow-hidden'>
			<div className='flex flex-wrap items-center'>
				{isLargeAbove ? <FacilityDesktop {...content} /> : <FacilityMobile {...content} />}
			</div>
		</section>
	);
};

export default Facility;
