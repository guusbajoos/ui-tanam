import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';
import PageServices from '@services/pages/pages';
import FAQServices from '@services/faq/faq';
import ClinicServices from '@services/clinics/clinics';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import FAQCard from '@features/faq/FAQ/FAQ';

const FAQ = ({ pages, faq, faqCategories, clinics }) => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
			? 'https://dev.tanamgigi.id'
			: 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const ABOUT_FAQ = pages.sections?.find((page) => page.section_type === 'ABOUT_FAQ');
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'FAQ');

	const handleTracker = () => {
		PixelServices.pixelEvent({
			ttclid: tt_click_id,
			event_name: 'EventPage',
			content_name: 'View - FAQ',
			event_source_url: `${BASE_URL}/faq`,
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
					canonical={`${BASE_URL}/faq`}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<FAQCard faq={faq} content={ABOUT_FAQ?.content} faqCategories={faqCategories.data} />
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps() {
	const [pages, meta, faq, faqCategories, clinics] = await Promise.all([
		PageServices.getPages('v2'),
		PageServices.getPageMetaOptions('v1', 'FAQ'),
		FAQServices.getFAQs('v2'),
		FAQServices.getFAQCategories('v2'),
		ClinicServices.getClinics('v1'),
	]);

	const faqPages = pages.data.filter((page) => page.menu_type === 'FAQ');
	const homePages = pages.data.filter((page) => page.menu_type === 'HOME' && page.section_type === 'CLINIC');

	const mergePages = [...faqPages, ...homePages];

	return {
		props: {
			pages: {
				sections: mergePages,
				meta: meta.data,
			},
			faq: faq.data,
			faqCategories,
			clinics: clinics.data,
		},
	};
}

export default FAQ;
