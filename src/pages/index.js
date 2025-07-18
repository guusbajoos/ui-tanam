import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import PixelServices from '@services/pixel/pixel';
import PageServices from '@services/pages/pages';
import ComparisonServices from '@services/comparisons/comparisons';
import FAQServices from '@services/faq/faq';
import BeforeAfterServices from '@services/before-after/before-after';
import StepServices from '@services/steps/steps';
import TestimonialServices from '@services/testimonials/testimonials';
import ClinicServices from '@services/clinics/clinics';
import USPServices from '@services/usp/usp';

import BaseLocation from '@shared/components/BaseLocation/BaseLocation';
import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';

import Hero from '@features/home/Hero/Hero';
import DoctorSpecialistImplan from '@features/home/DoctorSpecialistImplan/DoctorSpecialistImplan';
import WhyImplan from '@features/home/WhyImplan/WhyImplan';
import Steps from '@features/home/Steps/Steps';
import BeforeAfter from '@features/home/BeforeAfter/BeforeAfter';
import Testimony from '@features/home/Testimony/Testimony';
import Doctor from '@features/home/Doctor/Doctor';
import FAQSolutions from '@features/home/FAQSolutions/FAQSolutions';

const Home = ({ pages, usps, comparisons, steps, testimonials, beforeAfter, faqSolutions, clinics }) => {
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const { query } = useRouter();

	const { utm_source, utm_medium } = query;

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const ABOUT_TANAM = pages.sections?.find((page) => page.section_type === 'ABOUT_TANAM')['content'];
	const HOW_IT_WORKS = pages.sections?.find((page) => page.section_type === 'HOW_IT_WORKS')['content'];
	const COMPARISONS = pages.sections?.find((page) => page.section_type === 'COMPARISON')['content'];
	const DOCTOR = pages.sections?.find((page) => page.section_type === 'DOCTOR')['content'];
	const FAQ_SOLUTIONS = pages.sections?.find((page) => page.section_type === 'FAQ_SOLUTION')['content'];
	const STEPS = pages.sections?.find((page) => page.section_type === 'STEPS')['content'];
	const BEFORE_AFTER = pages.sections?.find((page) => page.section_type === 'BEFORE_AFTER')['content'];
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'HOME');

	const handleTracker = () => {
		const payload = {
			ttclid: tt_click_id,
			event_name: 'EventPage',
			event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
			client_user_agent: userAgent,
			client_ip_address: null,
		};

		if (getCookie('_fbp')) payload.fbp = getCookie('_fbp');
		if (getCookie('_fbc')) payload.fbc = getCookie('_fbc');

		PixelServices.pixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent('ViewContent');


		const metaPayload = {
			...payload,
			event_name: 'Purchase',
			currency: 'IDR',
			value: 300000,
		};

		PixelServices.metaEvent(metaPayload);
	};

	const handleNavigateInSec = () => {
		const timeoutId = setTimeout(() => {
			window.location.href =
				'https://api.whatsapp.com/send?phone=6285210072062&text=%5Beits%20jangan%20dihapus%20ya%20🤫%5D%20Hello%2C%20Tanam!%20Aku%20mau%20tahu%20lebih%20lanjut%20tentang%20Tanam%20dan%20book%20konsultasi%20dengan%20PROMOCODE%3A%20HELLOSEHATANAM';
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	};

	useEffect(() => {
		handleTracker();
	}, []);

	useEffect(() => {
		if (utm_source === 'banner hellosehat' && utm_medium === 'referral hellosehat') return handleNavigateInSec();
	}, [query]);

	return (
		<BaseMain
			meta={
				<BaseMeta
					canonical={BASE_URL}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<Hero content={ABOUT_TANAM} usps={usps} />
			<DoctorSpecialistImplan content={HOW_IT_WORKS} />
			<BeforeAfter photos={beforeAfter} content={BEFORE_AFTER} />
			<WhyImplan content={COMPARISONS} comparisons={comparisons} />
			<Steps steps={steps} content={STEPS} />
			<Testimony testimonials={testimonials} />
			<Doctor doctor={DOCTOR} />
			<FAQSolutions faqSolutions={faqSolutions} content={FAQ_SOLUTIONS} />
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps() {
	const [pages, meta, usps, comparisons, steps, testimonials, faqSolutions, clinics, beforeAfter] = await Promise.all([
		PageServices.getPages('v2', 'HOME'),
		PageServices.getPageMetaOptions('v1', 'HOME'),
		USPServices.getUSPs('v1'),
		ComparisonServices.getComparisons('v1'),
		StepServices.getSteps('v1'),
		TestimonialServices.getHomeTestimonials('v1'),
		FAQServices.getFAQSolutions('v1'),
		ClinicServices.getClinics('v1'),
		BeforeAfterServices.getPhotoBeforeAfterByNumber('v1', 'HOME'),
	]);

	const remappingComparison = comparisons.data.map((comparison, index) => {
		const first = {
			text: comparison.aspect,
			is_top_left_radius: comparison.position === 1,
			is_bottom_left_radius: index === comparisons.data.length - 1,
			is_border_bottom: index === comparisons.data.length - 1,
		};
		const second = {
			text: comparison.implant_tanam,
		};
		const last = {
			text: comparison.implant_other,
			is_top_right_radius: comparison.position === 1,
			is_bottom_right_radius: index === comparisons.data.length - 1,
			is_border_bottom: index === comparisons.data.length - 1,
		};

		return {
			id: comparison.id,
			first,
			second,
			last,
		};
	});

	return {
		props: {
			pages: {
				sections: pages.data,
				meta: meta.data,
			},
			usps: usps.data,
			comparisons: remappingComparison,
			steps: steps.data,
			testimonials: testimonials.data,
			faqSolutions: faqSolutions.data,
			clinics: clinics.data,
			beforeAfter: beforeAfter.data,
		},
	};
}

export default Home;
