import { useEffect, useState } from 'react';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

import FAQCategoryDesktop from './FAQCategory/FAQCategoryDesktop/FAQCategoryDesktop';
import FAQCategoryMobile from './FAQCategory/FAQCategoryMobile/FAQCategoryMobile';
import FAQItem from './FAQItem/FAQItem';

const FAQ = ({ faq, content, faqCategories }) => {
	const [expanded, setExpanded] = useState(null);
	const [category, setCategory] = useState('IMPLANT_DENTAL');
	const [expandedCategory, setExpandedCategory] = useState(null);

	const toggleExpand = (index) => setExpanded(expanded === index ? null : index);

	const toggleExpandCategory = () => setExpandedCategory((ex) => !ex);

	const handleExpandedCategoryInSec = () => {
		const timeoutId = setTimeout(() => {
			setExpandedCategory(false);
		}, 2000);

		return () => clearTimeout(timeoutId);
	};

	useEffect(() => {
		if (window.innerWidth < 1024) {
			setExpandedCategory(true);

			return handleExpandedCategoryInSec();
		}
	}, []);

	return (
		<section className='bg-white lg:py-70'>
			<div className='relative bg-primary lg:hidden'>
				<BaseContainer className='py-6'>
					<h1 className='mb-6 line-clamp-3 text-center text-[2rem] font-semibold text-white'>{content.title}</h1>

					<FAQCategoryMobile
						onExpandCategory={toggleExpandCategory}
						expanded={expandedCategory}
						category={category}
						onChangeCategory={(ctg) => {
							setCategory(ctg);
							setExpanded(null);
						}}
						categories={faqCategories}
					/>
				</BaseContainer>
			</div>

			<BaseContainer isRelativeContainer={false} className='block lg:hidden'>
				<FAQItem expanded={expanded} toggleExpand={toggleExpand} faq={faq} category={category} />
			</BaseContainer>

			<BaseContainer className='hidden lg:block'>
				<h1 className='mx-auto text-center font-semibold text-secondary lg:mb-70 lg:line-clamp-2 lg:max-w-[867px] lg:text-5xl'>
					{content.title}
				</h1>

				<FAQCategoryDesktop
					onChangeCategory={(ctg) => {
						setCategory(ctg);
						setExpanded(null);
					}}
					category={category}
					categories={faqCategories}
				/>

				<FAQItem expanded={expanded} toggleExpand={toggleExpand} faq={faq} category={category} />
			</BaseContainer>
		</section>
	);
};

export default FAQ;
