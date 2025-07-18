import clsx from 'clsx';

const FAQCategoryDesktop = (props) => {
	return (
		<div className='mx-auto mb-10 hidden lg:block lg:max-w-[840px]'>
			<div className='flex w-full items-center justify-center gap-x-14'>
				{props.categories?.map((category, idx) => (
					<span
						className={clsx('cursor-pointer text-xl', {
							'text-green-category': category.value !== props.category,
							'font-bold text-primary': category.value === props.category,
						})}
						onClick={() => props.onChangeCategory(category.value)}
						key={idx + 1}
					>
						{category.label}
					</span>
				))}
			</div>
		</div>
	);
};

export default FAQCategoryDesktop;
