import React from 'react';

import SectionImages from '../SectionImages/SectionImages';
import SectionText from '../SectionText/SectionText';
import SectionVideo from '../SectionVideo/SectionVideo';
import SectionPromotionButton from '../SectionPromotionButton/SectionPromotionButton';
import SectionImagesText from '../SectionImagesText/SectionImagesText';

const SectionContent = ({ promotion, imageButtonClick, isQualified, isUnqualifiedLocation, isUnqualifiedBudget }) => {
	return (
		<React.Fragment>
			{promotion.section_images.map((section, index) => (
				<React.Fragment key={section.id}>
					{(section.section_selected === 'IMAGES' && (
							<SectionImages image={section} index={index} imageButtonClick={imageButtonClick} isQualified={isQualified} isUnqualifiedLocation={isUnqualifiedLocation} isUnqualifiedBudget={isUnqualifiedBudget} />
						)) ||
						(section.section_selected === 'TEXT' && <SectionText text={section} />) ||
						(section.section_selected === 'VIDEOS' && <SectionVideo video={section} index={index} />) ||
						(section.section_selected === 'SIDE_IMAGES_TEXT' && <SectionImagesText image={section} index={index} />)}
				</React.Fragment>
			))}
			{promotion.button_is_active && promotion.button_text && promotion.button_url && (
				<SectionPromotionButton button={promotion} imageButtonClick={imageButtonClick} />
			)}
		</React.Fragment>
	);
};

export default SectionContent;
