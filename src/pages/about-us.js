import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';
import PageServices from '@services/pages/pages';
import ImplantSpecialistService from '@services/implant-specialist/implant-specialist';
import ImplantWorkServices from '@services/implant-works/implant-works';
import ImplantMethodServices from '@services/implant-methods/implant-methods';
import ClinicServices from '@services/clinics/clinics';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import Hero from '@features/about-us/Hero/Hero';
import WhatIsImplan from '@features/about-us/WhatIsImplan/WhatIsImplan';
import ImplantSpecialist from '@features/about-us/ImplantSpecialist/ImplantSpecialist';
import HowDentalWorks from '@features/about-us/HowDentalWorks/HowDentalWorks';
import WhyImplan from '@features/about-us/WhyImplan/WhyImplan';
import Journey from '@features/about-us/Journey/Journey';

const AboutUs = ({ pages, implantSpecialists, implantWorks, implantMethods, clinics }) => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
			? 'https://dev.tanamgigi.id'
			: 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const INTRO_TANAM = pages.sections?.find((page) => page.section_type === 'INTRO_TANAM')['content'];
	const ABOUT_TANAM = pages.sections?.find((page) => page.section_type === 'ABOUT_TANAM')['content'];
	const IMPLANT_SPECIALIST = pages.sections?.find((page) => page.section_type === 'IMPLANT_SPECIALIST')['content'];
	const HOW_IT_WORKS = pages.sections?.find((page) => page.section_type === 'HOW_IT_WORKS')['content'];
	const WHY_TANAM = pages.sections?.find((page) => page.section_type === 'WHY_TANAM')['content'];
	const TESTIMONIAL = pages.sections?.find((page) => page.section_type === 'TESTIMONIAL')['content'];
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'ABOUT_US');

	const handleTracker = () => {
		PixelServices.pixelEvent({
			ttclid: tt_click_id,
			event_name: 'EventPage',
			content_name: 'View - About us',
			event_source_url: `${BASE_URL}/about-us`,
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
					canonical={`${BASE_URL}/about-us`}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<Hero content={INTRO_TANAM} />
			<WhatIsImplan content={ABOUT_TANAM} />
			<WhyImplan content={WHY_TANAM} methods={implantMethods} />
			<ImplantSpecialist content={IMPLANT_SPECIALIST} specialists={implantSpecialists} />
			<HowDentalWorks content={HOW_IT_WORKS} works={implantWorks} />
			<Journey content={TESTIMONIAL} />
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps() {
	const [pages, meta, implantSpecialist, implantWorks, implantMethods, clinics] = await Promise.all([
		PageServices.getPages('v2'),
		PageServices.getPageMetaOptions('v1', 'ABOUT_US'),
		ImplantSpecialistService.getImplantSpecialists('v1'),
		ImplantWorkServices.getImplantWorks('v1'),
		ImplantMethodServices.getImplantMethods('v1'),
		ClinicServices.getClinics('v1'),
	]);

	const aboutPages = pages.data.filter((page) => page.menu_type === 'ABOUT_US');

	const homePages = pages.data.filter((page) => page.menu_type === 'HOME' && page.section_type === 'CLINIC');

	const mergePages = [...aboutPages, ...homePages];

	return {
		props: {
			pages: {
				sections: mergePages,
				meta: meta.data,
			},
			implantSpecialists: implantSpecialist.data,
			implantWorks: implantWorks.data,
			implantMethods: implantMethods.data,
			clinics: clinics.data,
		},
	};
}

export default AboutUs;
