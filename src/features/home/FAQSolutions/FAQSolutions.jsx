import React, { useState } from 'react';

import clsx from 'clsx';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

import FAQSolutionsContentItem from './FAQSolutionsContentItem/FAQSolutionsContentItem';

const FAQSolutions = ({ faqSolutions, content }) => {
	const [expanded, setExpanded] = useState(null);

	const toggleExpand = (index) => setExpanded(expanded === index ? null : index);

	return (
		<section className='bg-gray-100 py-50 lg:py-70'>
			<BaseContainer>
				<h2 className='mx-auto mb-50 line-clamp-3 text-center text-[1.75rem] font-semibold text-primary lg:mb-60 lg:line-clamp-2 lg:max-w-[867px] lg:text-5xl'>
					{content.title}
				</h2>

				<div className='flex flex-wrap gap-y-30'>
					{faqSolutions.map((solution, idx) => {
						const filteredSectionList =
							solution.display_type === 'TEXT'
								? solution.section_list
								: solution.section_list.filter((sl) => sl.url_image && sl.content);

						return (
							<React.Fragment key={solution.id}>
								<div className='mx-auto w-full rounded-xl border border-[#dedede] p-3 lg:max-w-[840px] lg:p-6'>
									<div
										className='flex cursor-pointer items-center justify-between gap-x-2.5'
										onClick={() => toggleExpand(idx)}
									>
										<h3 className='line-clamp-2 w-full min-w-[16rem] text-base font-semibold tracking-[1.2px] text-secondary lg:line-clamp-1 lg:min-w-[25.75rem] lg:text-lg lg:tracking-normal'>
											{solution.title}
										</h3>
										{expanded === idx ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='h-6 w-6 text-[#000000]'
											>
												<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
											</svg>
										) : (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='h-6 w-6 text-[#000000]'
											>
												<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
											</svg>
										)}
									</div>
								</div>
								{expanded === idx && (
									<div className='mx-auto w-full rounded-xl border border-primary bg-white p-3 lg:max-w-[840px] lg:p-6'>
										{solution.description && (
											<BaseHTMLRender
												content={solution.description}
												className='line-clamp-6 w-full text-justify text-xs text-black lg:line-clamp-5 lg:text-base'
											/>
										)}
										{solution.section_list.length > 0
											? filteredSectionList.map((section, idx) =>
													solution.display_type === 'TEXT' ? (
														<BaseHTMLRender
															content={section.content}
															className={clsx(
																'mb-8 w-full text-justify text-xs text-black last:mb-0 lg:line-clamp-5 lg:text-base',
																{
																	'mt-9': solution.description && idx === 0,
																},
															)}
															key={section.id}
														/>
													) : solution.display_type === 'LIST' ? (
														<FAQSolutionsContentItem content={section} index={idx} key={section.id} />
													) : null,
											  )
											: null}
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</BaseContainer>
		</section>
	);
};

export default FAQSolutions;
