import BaseButton from '@shared/components/BaseButton/BaseButton';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';
import PixelServices from '@services/pixel/pixel';
import useResponsive from '@shared/hooks/useResponsive';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

const ArticleListItem = (props) => {
	const responsive = useResponsive();
	const isLargeAbove = responsive?.width >= 1024;
		const tt_click_id = getCookie('ttclid') || null;
		const { devices, headerButton, floatingPromotion, headerButtonClick } = props;

	const handleTracker = (event_name, url) => {
		const payload = {
			ttclid: tt_click_id,
			event_name: event_name,
			event_source_url: url,
			client_user_agent: devices?.user_agent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : 'ClickButton');
	};

	return (
		<React.Fragment>
			{isLargeAbove ? (
				<Link 
					className='mx-auto flex w-fit cursor-pointer justify-center' 
					href={props.href}
					onClick={() => handleTracker('EventButton', `${process.env.NEXT_PUBLIC_SITE_URL}${props.href}`)}
				>
					<div className='my-3 flex min-w-[1000px] max-w-[1000px] flex-row overflow-hidden'>
						<div className='relative flex w-[602px] max-w-[602px] before:absolute'>
							<Image
								src={props.url_banner_desktop}
								width={0}
								height={0}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw'
								quality={100}
								alt={`Treatment-${props.index + 1}`}
								className='h-[336px] w-[602px] rounded-lg object-cover'
							/>
						</div>
						<div className='h-[300px] w-5/12 max-w-[400px] text-clip'>
							<div className='relative px-7'>
								<div className='flex flex-col justify-start gap-y-4'>
									<h1 className='text-[0.9rem] text-[#162326]'>
										{dayjs(props.epoch_updated_at).format('dddd, DD MMMM YYYY')}
									</h1>
									{props.title && (
										<BaseHTMLRender content={props.title} className='text-electric-blue text-3xl font-bold' />
									)}
									{props.preview && <BaseHTMLRender content={props.preview} className='text-truncate-custom' />}
								</div>
							</div>
						</div>
					</div>
				</Link>
			) : (
				<Link 
					className='m-auto cursor-pointer' 
					href={props.href}
					onClick={() => handleTracker('EventButton', `${process.env.NEXT_PUBLIC_SITE_URL}${props.href}`)}
				>
					<div className='size-full relative flex max-w-[327px] flex-col overflow-hidden before:absolute'>
						<Image
							src={props.url_banner_desktop}
							width={0}
							height={0}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							quality={100}
							alt={`Treatment-${props.index + 1}`}
							className='aspect-2/1 h-[182px] w-full max-w-[327px] rounded-lg object-cover'
						/>

						<div className='relative h-fit bg-white py-3'>
							<div className='flex flex-col gap-y-3'>
								<h1 className='text-[0.8125rem] text-[#162326]'>
									{dayjs(props.epoch_updated_at).format('dddd, DD MMMM YYYY')}
								</h1>
								{props.title && <BaseHTMLRender content={props.title} className='text-xl font-bold' />}
								{props.preview && <BaseHTMLRender content={props.preview} className='text-truncate-5' />}
							</div>
						</div>
					</div>
				</Link>
			)}
		</React.Fragment>
	);
};

export default ArticleListItem;