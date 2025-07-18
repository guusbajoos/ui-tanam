import { useMemo } from 'react';

import { capitalize } from '@shared/helpers/fuctions.helpers';
import clsx from 'clsx';

const FAQCategoryMobile = (props) => {
	const category = useMemo(() => {
		const objCtg = props.categories?.find((c) => c.value === props.category);
		const result = objCtg?.label;
		return result;
	}, [props.category, props.expanded]);

	return (
		<div
			className='relative z-0 w-full rounded-lg bg-white py-[0.875rem] pl-[1.125rem] pr-5'
			onClick={props.onExpandCategory}
		>
			<button
				type='button'
				className='relative w-full cursor-pointer text-left font-bold text-primary focus:outline-none sm:text-sm'
			>
				<span className='block truncate'>{capitalize(category) || 'Category'}</span>
				<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center'>
					<svg className='h-5 w-5 text-primary' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
						<path
							fillRule='evenodd'
							d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
			</button>

			{props.expanded && (
				<ul className='absolute inset-x-0 top-[46px] z-10 w-full list-none overflow-auto rounded-b-lg rounded-t-none bg-white text-base shadow-[0px_0px_8px_0px_#00000021] focus:outline-none sm:text-sm'>
					{props.categories?.map((category, idx) => (
						<li
							className='border-[#d9d9d9]] relative cursor-pointer select-none border-b py-[0.875rem] pl-[1.125rem] pr-5 last:bottom-0'
							id={`listbox-option-${idx + 1}`}
							role='option'
							onClick={() => props.onChangeCategory(category.value)}
							key={idx + 1}
						>
							<span
								className={clsx('block truncate', {
									'text-green-category font-normal': category.value !== props.category,
									'font-bold text-primary': category.value === props.category,
								})}
							>
								{category.label}
							</span>
							{props.category === category.value && (
								<span className='absolute inset-y-0 right-5 flex items-center text-primary'>
									<svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
										<path
											fillRule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clipRule='evenodd'
										/>
									</svg>
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FAQCategoryMobile;
