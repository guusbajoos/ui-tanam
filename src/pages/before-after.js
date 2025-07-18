import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';
import PageServices from '@services/pages/pages';
import ClinicServices from '@services/clinics/clinics';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import BeforeAfterCard from '@features/before-after/BeforeAfterCard/BeforeAfterCard';

const BeforeAfter = ({ pages, clinics }) => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
			? 'https://dev.tanamgigi.id'
			: 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const ABOUT_TANAM = pages.sections?.find((page) => page.section_type === 'ABOUT_TANAM')['content'];
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'BEFORE_AFTER');

	const handleTracker = () => {
		PixelServices.pixelEvent({
			ttclid: tt_click_id,
			event_name: 'EventPage',
			content_name: 'View - Before After',
			event_source_url: `${BASE_URL}/before-after`,
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
					canonical={`${BASE_URL}/before-after`}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<BeforeAfterCard content={ABOUT_TANAM} />
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps() {
	const [pages, meta, clinics] = await Promise.all([
		PageServices.getPages('v2'),
		PageServices.getPageMetaOptions('v1', 'BEFORE_AFTER'),
		ClinicServices.getClinics('v1'),
	]);

	const beforeAfterPages = pages.data.filter((page) => page.menu_type === 'BEFORE_AFTER');
	const homePages = pages.data.filter((page) => page.menu_type === 'HOME' && page.section_type === 'CLINIC');

	const mergePages = [...beforeAfterPages, ...homePages];

	return {
		props: {
			pages: {
				sections: mergePages,
				meta: meta.data,
			},
			clinics: clinics.data,
		},
	};
}

export default BeforeAfter;
