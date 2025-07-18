const BaseLayout = (props) => {
	return (
		<div className='relative mx-auto bg-white md:max-w-2xl lg:max-w-none'>
			<div className='min-h-[8rem]'>{props.children}</div>
		</div>
	);
};

export default BaseLayout;
