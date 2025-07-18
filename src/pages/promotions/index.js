import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import PageServices from '@services/pages/pages';
import PromotionServices from '@services/promotions/promotions';
import ClinicServices from '@services/clinics/clinics';
import PixelServices from '@services/pixel/pixel';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import PromotionParent from '@features/promotions/parent/PromotionParent';

const Promotions = ({ pages, promotions, clinics }) => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const ABOUT_PROMO = pages.sections?.find((page) => page.section_type === 'ABOUT_PROMO')['content'];
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'OUR_OFFER');

	const handleTracker = () => {
		PixelServices.pixelEvent({
			ttclid: tt_click_id,
			event_name: 'EventPage',
			content_name: 'View - Promo & Deals',
			event_source_url: `${BASE_URL}/promotions`,
			city: 'Indonesia',
			client_user_agent: userAgent,
			client_ip_address: null,
		});
		PixelServices.trackTiktokBrowserEvent('ViewContent');

	};

	useEffect(() => {
		handleTracker();
	}, []);

	return (
		<BaseMain
			meta={
				<BaseMeta
					canonical={`${BASE_URL}/promotions`}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<PromotionParent promotions={promotions} content={ABOUT_PROMO} />
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps() {
	const [pages, meta, promotions, clinics] = await Promise.all([
		PageServices.getPages('v2'),
		PageServices.getPageMetaOptions('v1', 'OUR_OFFER'),
		PromotionServices.getPromotionDeals('v1'),
		ClinicServices.getClinics('v1'),
	]);

	const ourOfferPages = pages.data.filter((page) => page.menu_type === 'OUR_OFFER');
	const homePages = pages.data.filter((page) => page.menu_type === 'HOME' && page.section_type === 'CLINIC');

	const mergePages = [...ourOfferPages, ...homePages];

	return {
		props: {
			pages: {
				sections: mergePages,
				meta: meta.data,
			},
			promotions: promotions.data,
			clinics: clinics.data,
		},
	};
}

export default Promotions;
