import Link from 'next/link';

import clsx from 'clsx';

const BaseButton = (props) => {
	if (props.buttonType === 'link') {
		if (props.isExternal) {
			return (
				<div className={`max-w-[16.25rem] lg:max-w-[20rem] ${props.wrapperClassName}`}>
					<a
						href={props.href}
						style={{ textDecoration: 'none' }}
						target='_blank'
						className={`cta-button-lead ${props.linkClassName}`}
						aria-label={`cta-button-lead ${props.linkClassName}`}
						rel='noopener noreferrer'
						onClick={props.onClick}
					>
						<button
							style={props.style}
							className={clsx(
								`flex w-full items-center justify-center  border-none  px-8 py-2.5   text-center font-medium  ${props.buttonClassName} cta-button-lead ${props.linkClassName}`,
								{
									'animate-floating-whatsapp': props.isAnimationPulse,
									'h-12 text-lg tracking-[2px] lg:tracking-[1.8px]': !props.buttonClassName,
									'bg-white': props.isWhiteBackground && !props.isWhatsappFloating,
									'bg-floating-whatsapp': props.isWhatsappFloating,
									'bg-primary': !props.isWhatsappFloating && !props.isWhiteBackground,
									'text-white': !props.isWhiteBackground,
									'rounded-[3rem]': !props.notRounded,
								},
							)}
							aria-label={`cta-button-lead ${props.linkClassName}`}
						>
							{props.children}
						</button>
					</a>
				</div>
			);
		} else {
			return (
				<div className={`max-w-[16.25rem] lg:max-w-[20rem] ${props.wrapperClassName}`}>
					<Link
						href={props.href}
						style={{ textDecoration: 'none' }}
						className={`cta-button-lead ${props.linkClassName}`}
						aria-label={`cta-button-lead ${props.linkClassName}`}
						onClick={props.onClick}
					>
						<button
							style={props.style}
							className={clsx(
								`font-ex flex w-full items-center justify-center  border-none px-8 py-2.5 text-center  text-white ${props.buttonClassName} cta-button-lead ${props.linkClassName}`,
								{
									'animate-floating-whatsapp': props.isAnimationPulse,
									'h-12 text-lg tracking-[2px] lg:tracking-[1.8px]': !props.buttonClassName,
									'bg-white': props.isWhiteBackground && !props.isWhatsappFloating,
									'bg-floating-whatsapp': props.isWhatsappFloating,
									'bg-primary': !props.isWhatsappFloating && !props.isWhiteBackground,
									'rounded-[3rem]': !props.notRounded,
								},
							)}
							aria-label={`cta-button-lead ${props.linkClassName}`}
						>
							{props.children}
						</button>
					</Link>
				</div>
			);
		}
	}

	return (
		<div className={`max-w-[16.25rem] lg:max-w-[20rem] ${props.wrapperClassName}`}>
			<button
				style={props.style}
				className={clsx(
					`flex w-full items-center justify-center  px-8 py-2.5 text-center  ${props.buttonClassName} cta-button-lead ${props.linkClassName}`,
					{
						'animate-bounce': props.isAnimationPulse,
						'h-12 text-lg tracking-[2px] lg:tracking-[1.8px]': !props.buttonClassName,
						'bg-white': props.isWhiteBackground && !props.isWhatsappFloating,
						'bg-floating-whatsapp': props.isWhatsappFloating,
						'bg-primary': !props.isWhatsappFloating && !props.isWhiteBackground,
						'border-none': !props.isBorder,
						'rounded-[3rem]': !props.notRounded,
					},
				)}
				aria-label={`cta-button-lead ${props.linkClassName}`}
				onClick={props.onClick}
			>
				{props.children}
			</button>
		</div>
	);
};

BaseButton.defaultProps = {
	wrapperClassName: '',
	linkClassName: '',
	buttonClassName: '',
	isExternal: false,
	isWhatsappFloating: false,
	isWhiteBackground: false,
	isAnimationPulse: false,
};

export default BaseButton;
