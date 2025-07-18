import { useState } from 'react';
import { getCookie } from 'cookies-next';
import clsx from 'clsx';
import PixelServices from '@services/pixel/pixel';
import { capitalize, matchWhatsAppURL } from '@shared/helpers/fuctions.helpers';
import { useResponsive } from '@shared/hooks/hooks';
import dynamic from 'next/dynamic';
import BaseButton from '@shared/components/BaseButton/BaseButton';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const SectionImages = ({ image, index, imageButtonClick, isQualified, isUnqualifiedLocation, isUnqualifiedBudget }) => {
	const windowSize = useResponsive();

	const baseURL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';
	const tt_click_id = getCookie('ttclid') || null;
	const isButtonUrlForm = image.button_url?.includes('form/');
	const isMatchURLWhatsapp = matchWhatsAppURL(image.button_url);

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const handleTracker = (event) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: isMatchURLWhatsapp ? 'EventContact' : 'EventButton',
			event_source_url: baseURL,
			client_user_agent: userAgent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);
		// PixelServices.tiktokNonPixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent(isMatchURLWhatsapp ? 'Contact' : 'ClickButton');

		const metaPayload = {
			...payload,
			event_name: 'Purchase',
			currency: 'IDR',
			value: 300000,
		};

		// PixelServices.metaEvent(metaPayload);
	};

	const isSmall = windowSize.width < 768;
	const isMedium = windowSize.width >= 768 && windowSize.width < 1024;
	const isLarge = windowSize.width >= 1024;

	const isUnderLarge = windowSize.width < 1024;

	const imageAlt = isUnderLarge ? image.url_mobile_alt : image.url_desktop_alt;

	const handleOnClick = (e) => {
		// window.fbq('track', 'Lead');
		// window.fbq('track', 'Purchase', {
		// value: '300000',
		// currency: 'IDR',
		// });
		handleTracker(
			`Click Section ${index + 1} - ${capitalize(image.button_text)}`,
			isButtonUrlForm ? `${baseURL}/${image.button_url}` : image.button_url,
		);

		if (imageButtonClick) {
			e.preventDefault();
			imageButtonClick(e, isButtonUrlForm ? `${baseURL}/${image.button_url}` : image.button_url);
		}
	};

	const instagramTanamUrl = "https://www.instagram.com/tanamgigi";
	const whatsappTanamUrl = "https://api.whatsapp.com/send?phone=6281219130879&text=Hi%20Tanam%2C%20aku%20mau%20tahu%20lebih%20lanjut%20tentang%20Tanam%F0%9F%A6%B7%F0%9F%98%8A";

	const handleClick = () => {
		// You can add any additional logic here before redirecting, if needed.
		// For example, logging the click, tracking, etc.
		console.log("Image button clicked!");
	};

	return (
		<div className='w-full' id={image.section_tag}>
			{/* Container adjusts layout based on the presence of a video */}
			<div
				className={clsx('flex flex-col', {
					'lg:flex-row': image.url_video,
					'lg:flex-col': !image.url_video,
				})}
			>
				{/* Image Section */}
				<div className={clsx('relative w-full overflow-hidden', { ' lg:w-[76.05%]': image.url_video })}>
					<div className='bg-primary'>
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

					{/* Button Overlay */}
					<div
						className='absolute right-0'
						style={{
							...(isSmall && {
								bottom: +image.button_mobile_margin_bottom !== 0 ? `${+image.button_mobile_margin_bottom}px` : '12vw',
								left: '0px',
							}),
							...(isMedium && {
								bottom: +image.button_mobile_margin_bottom !== 0 ? `${+image.button_mobile_margin_bottom}px` : '15vw',
								left: '0px',
							}),
							...(isLarge && {
								bottom: +image.button_desktop_margin_bottom !== 0 ? `${+image.button_desktop_margin_bottom}px` : '17vw',
								left: image.button_desktop_position === 'right' ? 'unset' : '0px',
							}),
						}}
					>

						{isUnqualifiedLocation && (
							<a
								href={instagramTanamUrl}
								target='_blank' // Opens the URL in a new tab
								rel='noopener noreferrer' // Recommended for security when using target="_blank"
								onClick={handleClick}
								className='image-button-link' // Optional: for styling the anchor tag
							>
								<img
									src='/assets/png/follow-instagram-tanamgigi.png'
									alt='Follow Tanamgigi on Instagram!' // Important for accessibility
									className='responsive-instagram-loc-img' // Optional: for styling the image
									style={{ cursor: 'pointer' }} // Adds a pointer cursor to indicate it's clickable
								/>
							</a>
						)}

						{isUnqualifiedBudget && (
							<a
								href={instagramTanamUrl}
								target='_blank' // Opens the URL in a new tab
								rel='noopener noreferrer' // Recommended for security when using target="_blank"
								onClick={handleClick}
								className='image-button-link' // Optional: for styling the anchor tag
							>
								<img
									src='/assets/png/follow-instagram-tanamgigi.png'
									alt='Follow Tanamgigi on Instagram!' // Important for accessibility
									className='responsive-instagram-bud-img' // Optional: for styling the image
									style={{ cursor: 'pointer' }} // Adds a pointer cursor to indicate it's clickable
								/>
							</a>
						)}

						{isQualified && !isUnqualifiedLocation && !isUnqualifiedBudget && (
							<a
								href={whatsappTanamUrl}
								target='_blank' // Opens the URL in a new tab
								rel='noopener noreferrer' // Recommended for security when using target="_blank"
								onClick={handleClick}
								className='image-button-link' // Optional: for styling the anchor tag
							>
								<img
									src='/assets/png/klik-di-sini.png'
									alt='Redirect to Tanamgigi Whatsapp' // Important for accessibility
									className='responsive-whatsapp-img' // Optional: for styling the image
									style={{ cursor: 'pointer' }} // Adds a pointer cursor to indicate it's clickable
								/>
							</a>
						)}

						{image.button_is_active && (
							<div
								className={clsx('grid place-content-center justify-items-center', {
									'lg:grid-cols-1': image.button_desktop_position === 'center',
									'lg:grid-cols-2': ['right', 'left'].includes(image.button_desktop_position),
								})}
							>
								<BaseButton
									style={{
										fontSize: 16,
										letterSpacing: 1,
										borderRadius: 5,
										backgroundColor: image.button_background_color,
										color: image.button_font_color,
										...(image.button_width &&
											image.button_width !== 0 && {
												width: `${image.button_width}px`,
											}),
										...(image.button_height &&
											image.button_height !== 0 && {
												height: `${image.button_height}px`,
											}),
									}}
									wrapperClassName='!max-w-none'
									linkClassName={`banner-${index + 1}`}
									buttonType='link'
									isExternal={true}
									href={
										!imageButtonClick
											? isButtonUrlForm
												? `${baseURL}/${image.button_url}`
												: image.button_url
											: undefined
									}
									onClick={handleOnClick}
								>
									{image.button_text && image.button_text.toUpperCase()}
								</BaseButton>
							</div>
						)}
					</div>
				</div>

				{/* Video Section */}
				{image.url_video && (
					<div className='height-screen w-full  lg:mt-0   lg:w-[23.95%] '>
						<ReactPlayer url={image.url_video} playing={true} loop={true} width='100%' height='100%' controls muted />
					</div>
				)}
			</div>
		</div>
	);
};

export default SectionImages;
