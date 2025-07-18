import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

import clsx from 'clsx';

import { MENUS } from '@shared/constants/menu';
import { useResponsive } from '@shared/hooks/hooks';

import PixelServices from '@services/pixel/pixel';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHeaderPromo from '@shared/components/BaseHeader/BaseHeaderPromo/BaseHeaderPromo';
import BaseHeaderDesktop from './BaseHeaderDesktop/BaseHeaderDesktop';
import BaseHeaderMobile from '@shared/components/BaseHeader/BaseHeaderMobile/BaseHeaderMobile';

const BaseHeader = (props) => {
	const { asPath } = useRouter();

	const { devices, headerButton, floatingPromotion, headerButtonClick } = props;

	const windowSize = useResponsive();

	const isLargeAbove = windowSize.width >= 1024;
	const tt_click_id = getCookie('ttclid') || null;

	const [visible, setVisible] = useState(false);
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

	const handleClosePromo = () => {
		setVisible(false);
	};

	const handleMobileMenu = (isVisible = false) => setMobileMenuVisible(isVisible);

	const handleTracker = (event_name, event, url) => {
		const isJotform = url.includes('jotform');

		if (!isJotform) {
			const payload = {
				ttclid: tt_click_id,
				event_name: event_name,
				event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
				client_user_agent: devices?.user_agent,
				client_ip_address: null,
			};

			if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
			if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

			PixelServices.pixelEvent(payload);
			PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : 'ClickButton');

			if (event_name === 'EventButton' || event_name === 'EventContact') {
				const metaPayload = {
					...payload,
					event_name: 'Purchase',
					currency: 'IDR',
					value: 300000,
				};

				PixelServices.metaEvent(metaPayload);
			}
		}
	};

	useEffect(() => {
		if (floatingPromotion?.enabled) setVisible(true);
	}, [floatingPromotion?.enabled]);

	return (
		<>
			{isLargeAbove ? null : (
				<BaseHeaderMobile
					data={headerButton}
					devices={devices}
					isVisible={mobileMenuVisible}
					onClose={() => handleMobileMenu(false)}
					menus={MENUS}
					headerButtonClick={headerButtonClick}
				/>
			)}
			<header className='fixed top-0 z-50 mx-auto w-full bg-white shadow-header md:max-w-2xl lg:max-w-none'>
				{visible && (
					<BaseHeaderPromo
						onClose={handleClosePromo}
						onTracker={(event_name, event, url) => handleTracker(event_name, event, url)}
						data={floatingPromotion}
					/>
				)}

				<BaseContainer className='py-4 max-md:max-w-none'>
					{isLargeAbove ? (
						<BaseHeaderDesktop
							onTracker={(event_name, event, url) => handleTracker(event_name, event, url)}
							pathname={asPath}
							content={headerButton}
							menus={MENUS}
							headerButtonClick={headerButtonClick}
						/>
					) : (
						<div className='flex items-center justify-between'>
							<Link
								onClick={() => {
									window.fbq('track', 'LinkClick');
									handleTracker('EventLink', 'Header - Logo', 'https://tanamgigi.id/');
								}}
								href='/'
								className='h-auto w-70'
							>
								<Image
									src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/icons/logo_tanam_gigi.svg'
									alt='Tanam Gigi'
									width={0}
									height={0}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									quality={100}
									className='h-full w-full object-cover'
								/>
							</Link>
							<Image
								src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/icons/Hamburger+Menu.svg'
								alt='Toggle Bar'
								width={25}
								height={25}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={100}
								onClick={() => handleMobileMenu(true)}
								className='h-auto w-auto'
							/>
						</div>
					)}
				</BaseContainer>
			</header>

			<div
				className={clsx('', {
					'h-[78px] lg:h-[76px]': !visible,
					'h-[147px] md:h-[136px]': visible,
				})}
			/>
		</>
	);
};

export default BaseHeader;
