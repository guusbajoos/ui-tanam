import { useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

import { MENUS } from '@shared/constants/menu';

import PixelServices from '@services/pixel/pixel';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const BaseFooter = () => {
	const router = useRouter();

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const currentYear = new Date().getFullYear();

	const handleTracker = (event_name, event, url) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: event_name,
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: userAgent,
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
	};

	return (
		<footer className='relative overflow-hidden bg-secondary py-10 text-left font-light text-white'>
			<BaseContainer>
				<div className='flex flex-wrap gap-y-6'>
					<div className='w-full md:w-1/2'>
						<div className='flex flex-wrap gap-y-6'>
							<div className='w-1/2 md:w-full'>
								<div className='mb-2'>
									<p className='text-base lg:text-lg'>WhatsApp (Chat Only)</p>
								</div>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://api.whatsapp.com/send?phone=6285210072062&text=Hi%20Tanam%2C%20aku%20mau%20tahu%20lebih%20lanjut%20tentang%20Tanam%F0%9F%A6%B7%F0%9F%98%8A'
									onClick={() => {
										handleTracker('EventContact', 'Click - Phone - 0852 - 1007 - 2062', router.asPath);
										window.fbq('track', 'Lead');
										window.fbq('track', 'Purchase', {
											value: '300000',
											currency: 'IDR',
										});
									}}
									className='block w-max text-base lg:text-lg'
								>
									0852 - 1007 - 2062
								</a>
							</div>
						</div>
					</div>
					<div className='w-1/2'>
						<ul className='mb-30 list-none last:mb-0'>
							{MENUS.map((menu) => (
								<li
									key={menu.key}
									className='mb-2 text-base lg:text-lg'
									onClick={() =>
										handleTracker('EventLink', `Click - Footer - ${menu.label}`, `https://tanamgigi.id${menu.pathname}`)
									}
								>
									<Link
										style={{ color: 'inherit' }}
										onClick={() => window.fbq('track', 'LinkClick')}
										href={menu.pathname}
									>
										{menu.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='flex flex-col gap-y-6 pt-[14px] md:flex-row md:items-center md:justify-between'>
					<div className='flex items-center gap-30'>
						<a
							href='https://www.instagram.com/tanamgigi/'
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => {
								window.fbq('track', 'Lead');
								window.fbq('track', 'Purchase', {
									value: '300000',
									currency: 'IDR',
								});
								handleTracker('EventButton', 'Instagram Tanam', 'https://www.instagram.com/tanamgigi/');
							}}
							style={{ width: 32, height: 32 }}
						>
							<Image
								src='/assets/icons/icon-instagram.svg'
								alt='Instagram Tanam'
								height={32}
								width={32}
								sizes='100vw'
								style={{ height: '100%' }}
							/>
						</a>
						<a
							href='https://www.youtube.com/@TanamGigi-id'
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => {
								window.fbq('track', 'Lead');
								window.fbq('track', 'Purchase', {
									value: '300000',
									currency: 'IDR',
								});
								handleTracker('EventButton', 'Youtube Tanam', 'https://www.youtube.com/@TanamGigi-id');
							}}
							style={{ width: 32, height: 32 }}
						>
							<Image
								src='/assets/icons/icon-youtube.svg'
								alt='Youtube Tanam'
								height={32}
								width={32}
								sizes='100vw'
								style={{ height: '100%' }}
							/>
						</a>
						<a
							href='https://www.facebook.com/tanamgigi'
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => {
								window.fbq('track', 'Lead');
								window.fbq('track', 'Purchase', {
									value: '300000',
									currency: 'IDR',
								});
								handleTracker('EventButton', 'Facebook Tanam', 'https://www.facebook.com/tanamgigi');
							}}
							style={{ width: 32, height: 32 }}
						>
							<Image
								src='/assets/icons/icon-facebook.svg'
								alt='Facebook Tanam'
								height={32}
								width={32}
								sizes='100vw'
								style={{ height: '100%' }}
							/>
						</a>
						<a
							href='https://www.tiktok.com/@tanamgigi'
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => {
								window.fbq('track', 'Lead');
								window.fbq('track', 'Purchase', {
									value: '300000',
									currency: 'IDR',
								});
								handleTracker('EventButton', 'Tiktok Tanam', 'https://www.tiktok.com/@tanamgigi');
							}}
							style={{ width: 32, height: 32 }}
						>
							<Image
								src='/assets/icons/icon-tiktok.svg'
								alt='Facebook Tanam'
								height={32}
								width={32}
								sizes='100vw'
								style={{ height: '100%' }}
							/>
						</a>
					</div>
					<p className='text-sm text-white'>© {currentYear} TANAM GIGI All rights reserved.</p>
				</div>
			</BaseContainer>
		</footer>
	);
};

export default BaseFooter;
