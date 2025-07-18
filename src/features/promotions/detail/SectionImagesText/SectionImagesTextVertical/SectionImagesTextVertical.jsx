import { useEffect } from 'react';

import clsx from 'clsx';

import { capitalize, manipulateNestedElementAttribute } from '@shared/helpers/fuctions.helpers';
import useResponsive from '@shared/hooks/useResponsive';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';
import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const SectionImagesTextVertical = ({ image, index, onTracker }) => {
	const baseURL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const windowSize = useResponsive();

	const isButtonUrlForm = image.button_url?.includes('form/');

	const isUnderLarge = windowSize.width < 1024;
	const isLarge = windowSize.width >= 1024;

	const imageAlt = isUnderLarge ? image.url_mobile_alt : image.url_desktop_alt;

	useEffect(() => {
		if (windowSize.width < 1024) {
			manipulateNestedElementAttribute({
				elementId: `html_y_m-${image.section_tag}`,
				attribute: 'style',
				conditions: [{ property: 'text-align', values: ['left', 'right'], newValue: 'center' }],
			});
		}
	}, [windowSize]);

	return (
		<div
			className='flex flex-col items-center'
			style={{ backgroundColor: image.section_background_color || '#ffffff' }}
		>
			<div
				className={clsx('w-full', {
					'order-2': image.section_position_image == 'TOP',
					'order-1': image.section_position_image == 'BOTTOM',
				})}
			>
				<BaseContainer>
					<div className='mx-auto py-30 lg:max-w-[840px] lg:py-10'>
						<BaseHTMLRender
							className='block w-full lg:hidden'
							content={image.section_text}
							id={`html_y_m-${image.section_tag}`}
						/>
						<BaseHTMLRender
							className='hidden w-full lg:block'
							content={image.section_text}
							id={`html_y_d-${image.section_tag}`}
						/>
					</div>
				</BaseContainer>
			</div>
			<div
				className={clsx('w-full bg-transparent', {
					'order-1': image.section_position_image == 'TOP',
					'order-2': image.section_position_image == 'BOTTOM',
				})}
			>
				<picture>
					<source srcSet={image.url_mobile} media='(max-width: 1023px)' />
					<source srcSet={image.url_desktop} />
					<img
						src={image.url_mobile}
						alt={imageAlt || `image-${image.section_tag}`}
						className='h-full w-full object-cover'
						loading='lazy'
					/>
				</picture>
			</div>

			{image.button_is_active && (
				<BaseContainer className='order-3 pb-30'>
					<div className='mx-auto lg:max-w-[840px]'>
						<BaseButton
							style={{
								fontSize: 16,
								letterSpacing: 1,
								borderRadius: 5,
								backgroundColor: image.button_background_color,
								color: image.button_font_color,
								...(isUnderLarge && {
									marginTop: `${image.button_mobile_margin_bottom || 40}px`,
								}),
								...(isLarge && {
									marginTop: `${image.button_desktop_margin_bottom || 60}px`,
								}),
							}}
							wrapperClassName={clsx('!max-w-none w-fit', {
								'mx-auto': image.button_desktop_position === 'center',
								'mx-auto lg:mr-auto lg:ml-0': image.button_desktop_position === 'left',
								'mx-auto lg:ml-auto lg:mr-0': image.button_desktop_position === 'right',
							})}
							linkClassName={`banner-${index + 1}`}
							buttonType='link'
							isExternal={true}
							href={isButtonUrlForm ? `${baseURL}/${image.button_url}` : image.button_url}
							onClick={() => {
								// window.fbq('track', 'Lead');
								// window.fbq('track', 'Purchase', {
									// value: '300000',
									// currency: 'IDR',
								// });
								onTracker(
									`Click Section ${index + 1} - ${capitalize(image.button_text)}`,
									isButtonUrlForm ? `${baseURL}/${image.button_url}` : image.button_url,
								);
							}}
						>
							{image.button_text && image.button_text.toUpperCase()}
						</BaseButton>
					</div>
				</BaseContainer>
			)}
		</div>
	);
};

export default SectionImagesTextVertical;
