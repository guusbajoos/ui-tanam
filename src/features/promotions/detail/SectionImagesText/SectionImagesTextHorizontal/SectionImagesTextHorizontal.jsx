import { useEffect } from 'react';

import clsx from 'clsx';

import {
	capitalize,
	getElementChildAttribute,
	manipulateNestedElementAttribute,
} from '@shared/helpers/fuctions.helpers';
import useResponsive from '@shared/hooks/useResponsive';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const SectionImagesTextHorizontal = ({ image, index, onTracker }) => {
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
				elementId: `html_x_m-${image.section_tag}`,
				attribute: 'style',
				conditions: [{ property: 'text-align', values: ['left', 'right'], newValue: 'center' }],
			});
		}
	}, [windowSize]);

	return (
		<div className='flex flex-col items-center lg:flex-row'>
			<div
				className={clsx('w-full lg:w-1/2', {
					'max-lg:order-2': ['LEFT', 'RIGHT'].includes(image.section_position_image),
					'lg:order-1': image.section_position_image == 'RIGHT',
					'lg:order-2': image.section_position_image == 'LEFT',
				})}
				style={{ backgroundColor: image.section_background_color || '#ffffff' }}
			>
				<div className={clsx('px-4 py-30 lg:mx-auto lg:max-w-[35rem] lg:py-0')}>
					<BaseHTMLRender
						className='block w-full lg:hidden'
						content={image.section_text}
						id={`html_x_m-${image.section_tag}`}
					/>
					<BaseHTMLRender
						className='hidden w-full lg:block'
						content={image.section_text}
						id={`html_x_d-${image.section_tag}`}
					/>
					{image.button_is_active && (
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
					)}
				</div>
			</div>
			<div
				className={clsx('w-full bg-transparent lg:w-1/2', {
					'lg:order-2': image.section_position_image == 'RIGHT',
					'lg:order-1': image.section_position_image == 'LEFT',
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
		</div>
	);
};

export default SectionImagesTextHorizontal;
