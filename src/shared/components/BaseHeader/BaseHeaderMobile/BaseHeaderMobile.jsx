import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

import clsx from 'clsx';

import PixelServices from '@services/pixel/pixel';

import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const BaseHeaderMobile = (props) => {
	const { data, devices, onClose, isVisible = false, menus } = props;

	const { asPath } = useRouter();

	const tt_click_id = getCookie('ttclid') || null;

	const handleTracker = (event_name, event, url) => {
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
	};

	return (
		<div
			className={clsx('fixed left-0 top-0 z-[100] h-full overflow-x-hidden bg-white duration-3s', {
				'w-0': !isVisible,
				'w-full': isVisible,
			})}
		>
			<BaseContainer>
				<div className='flex items-center justify-between pt-4'>
					<div className='h-auto w-70'>
						<Image
							className='h-full w-full object-contain'
							src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/icons/logo_tanam_gigi.svg'
							width={0}
							height={0}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							quality={100}
							alt='Tanam Gigi'
						/>
					</div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='h-6 w-6 cursor-pointer text-primary'
						onClick={onClose}
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
					</svg>
				</div>

				<ul className='flex flex-col flex-wrap pt-5'>
					{menus.map((menu) => (
						<li
							key={menu.key}
							className={clsx('block list-none py-5 text-center text-base tracking-[1px] text-primary last:pb-0', {
								'font-semibold': asPath === menu.pathname,
							})}
						>
							<Link
								href={menu.pathname}
								className='text-inherit no-underline'
								onClick={() => {
									onClose();
									window.fbq('track', 'LinkClick');
									handleTracker('EventLink', `Header - ${menu.label}`, `https://www.tanamgigi.id${menu.pathname}`);
								}}
							>
								{menu.label}
							</Link>
						</li>
					))}
				</ul>

				{data?.enabled && (
					<div className='absolute inset-x-0 bottom-5'>
						<BaseButton
							wrapperClassName='mx-auto'
							linkClassName='header'
							buttonClassName='text-base tracking-[1px] w-auto h-10 mx-auto'
							buttonType='link'
							isExternal
							href={data?.url}
							onClick={(e) => {
								if (typeof data?.onClick === 'function') {
									e.preventDefault();
									data.onClick(e);
								} else {
									console.log('url = ' + data?.url);
									const isJotform = data?.url.includes('jotform');
									console.log('isJotform = ' + isJotform);
									if (!isJotform) {
										window.fbq('track', 'Lead');
										window.fbq('track', 'Purchase', {
											value: '300000',
											currency: 'IDR',
										});
										onTracker('EventContact', `Click - Header - ${data?.text}`, data?.url);
									}
								}
							}}
						>
							{data?.text}
						</BaseButton>

						<div className='flex items-center justify-center gap-5 py-30'>
							<a
								href='https://www.instagram.com/tanamgigi'
								target='_blank'
								rel='noopener noreferrer'
								onClick={() => {
									console.log('url = ' + data?.url);
									const isJotform = data?.url.includes('jotform');
									console.log('isJotform = ' + isJotform);
									if (!isJotform) {
										window.fbq('track', 'Lead');
										window.fbq('track', 'Purchase', {
											value: '300000',
											currency: 'IDR',
										});
										handleTracker('EventButton', 'Instagram Tanam', 'https://www.instagram.com/tanamgigi');
									}
								}}
							>
								<Image
									src='https://implant-web-production-assets.s3.ap-southeast-1.amazonaws.com/images/icon-instagram_1687853580616.webp'
									alt='Instagram Tanam'
									height={30}
									width={30}
								/>
							</a>
						</div>
					</div>
				)}
			</BaseContainer>
		</div>
	);
};

export default BaseHeaderMobile;
