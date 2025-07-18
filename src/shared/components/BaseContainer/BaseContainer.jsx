import clsx from 'clsx';

const BaseContainer = (props) => {
	const { children, style, className, isRelativeContainer = true } = props;

	return (
		<div
			className={clsx(`container mx-auto h-full w-full px-4 lg:px-8 ${className}`, {
				relative: isRelativeContainer,
			})}
			style={style}
		>
			{children}
		</div>
	);
};

BaseContainer.defaultProps = {
	className: '',
};

export default BaseContainer;
