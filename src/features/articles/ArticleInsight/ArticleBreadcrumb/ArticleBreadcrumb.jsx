import PixelServices from '@services/pixel/pixel';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

const ArticleBreadcrumb = (props) => {
	const handleTracker = (event_name, event, url) => {
		const tt_click_id = getCookie('ttclid') || null;

		const payload = {
			ttclid: tt_click_id,
			event_name: event_name,
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: null,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);
PixelServices.trackTiktokBrowserEvent('Contact');
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
		<Row className='mb-4'>
			<Col span={24} className='flex flex-wrap items-center text-sm lg:text-lg'>
				<Link
					href={'/'}
					className='rounded-sm pr-2 hover:bg-gray-200'
					onClick={() => handleTracker('EventButton', 'Click - Homepage', `${process.env.NEXT_PUBLIC_SITE_URL}`)}
				>
					Home
				</Link>
				<p className='mx-1 lg:mx-3'>&gt;</p>
				<Link
					href={'/articles'}
					className='rounded-sm px-2  hover:bg-gray-200'
					onClick={() => handleTracker('EventButton', 'Click - Homepage', `${process.env.NEXT_PUBLIC_SITE_URL}`)}
				>
					Articles
				</Link>
				<p className='mx-1 lg:mx-3'>&gt;</p>
				<Link
					href={`/articles/${props.categorySlug}`}
					className='rounded-sm px-2  hover:bg-gray-200'
					onClick={() => handleTracker('EventButton', 'Click - Homepage', `${process.env.NEXT_PUBLIC_SITE_URL}`)}
				>
					{props.category}
				</Link>
				<p className='mx-1 lg:mx-3'>&gt;</p>
				<p className='line-clamp-1 rounded-sm px-2  text-primary hover:bg-gray-200'>{props.title}</p>
			</Col>
		</Row>
	);
};

export default ArticleBreadcrumb;
