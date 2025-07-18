import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import BaseButton from '@shared/components/BaseButton/BaseButton';

const BaseHeaderDesktop = ({ onTracker, pathname, content, menus, headerButtonClick }) => {
	return (
		<React.Fragment>
			<div className='relative flex h-11 items-center justify-between'>
				<Link
					onClick={() => {
						window.fbq('track', 'LinkClick');
						onTracker('EventLink', 'Header - Logo', 'https://www.tanamgigi.id/');
					}}
					href='/'
					className='h-auto w-70 '
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

				<ul className='m-0 flex gap-x-8 p-0 md:text-sm lg:text-base'>
					{menus.map((menu) => (
						<li
							onClick={() =>
								onTracker('EventLink', `Header - ${menu.label}`, `https://www.tanamgigi.id${menu.pathname}`)
							}
							className={clsx('list-none text-primary transition duration-3s ease-header-menu', {
								'font-semibold': pathname === menu.pathname,
							})}
							key={menu.key}
						>
							<Link
								className='text-inherit no-underline'
								onClick={() => window.fbq('track', 'LinkClick')}
								href={menu.pathname}
							>
								{menu.label}
							</Link>
						</li>
					))}
				</ul>
				{content?.enabled && (
					<BaseButton
						linkClassName='header'
						buttonClassName='h-10 w-auto text-base tracking-[1px]'
						buttonType='link'
						isExternal
						href={content?.url}
						onClick={(e) => {
							if (typeof content?.onClick === 'function') {
								e.preventDefault();
								content.onClick(e);
							} else if (headerButtonClick) {
								e.preventDefault();
								headerButtonClick(e);
							} else {
								console.log('url = ' + content?.url);
								const isJotform = content?.url.includes('jotform');
								console.log('isJotform = ' + isJotform);
								if (!isJotform) {
									window.fbq('track', 'Lead');
									window.fbq('track', 'Purchase', {
										value: '300000',
										currency: 'IDR',
									});
									onTracker('EventContact', `Click - Header - ${content?.text}`, content?.url);
								}
							}
						}}
					>
						{content?.text}
					</BaseButton>
				)}
			</div>
		</React.Fragment>
	);
};

export default BaseHeaderDesktop;
