import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';

import PageServices from '@services/pages/pages';
import PromotionServices from '@services/promotions/promotions';
import ClinicServices from '@services/clinics/clinics';
import PixelServices from '@services/pixel/pixel';

import { convertObjToQs } from '@shared/helpers/fuctions.helpers';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import SectionContent from '@features/promotions/detail/SectionContent/SectionContent';
import PromotionForm from '@features/promotions/detail/Form/PromotionForm';

import useRedirectAfterSomeSeconds from '@shared/hooks/redirect';

export default function PromotionSlug({ pages, promotion, clinics }) {
	const { query } = useRouter();

	const { slug, utm_source, utm_medium, utm_campaign, campaignid, adgroupid, adid, gclid, ttclid } = query;

	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const headerButton = promotion?.buttons?.find((button) => button.type === 'HEADER_BUTTON');
	const floatingWhatsappButton = promotion?.buttons?.find((button) => button.type === 'WHATSAPP_BUTTON');

	const formRef = useRef(null);

	const [formUrl, setFormUrl] = useState(
		'https://api.whatsapp.com/send?phone=6281219130879&text=Hi%20Tanam%2C%20aku%20mau%20tahu%20lebih%20lanjut%20tentang%20Tanam%F0%9F%A6%B7%F0%9F%98%8A',
	);

	const qualifiedPage = slug.includes('qualified');
	const unqualifiedPage = slug.includes('unqualified');
	const unqualifiedBudgetPage = slug.includes('unqualified-budget');
	const unqualifiedLocationPage = slug.includes('unqualified-location');

	const handleScrollToForm = () => {
		if (formRef.current) {
			formRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const floatingButtonClick = (e, url) => {
		e.preventDefault();
		handleScrollToForm();
		setFormUrl(url);
	};

	if (promotion.form_is_active && headerButton) {
		headerButton.onClick = (e) => {
			e.preventDefault();
			handleScrollToForm();
			setFormUrl(headerButton.url);
		};
	}

	const sharedData = {
		devices: {
			user_agent: userAgent,
		},
		headerButton,
		floatingWhatsappButton,
	};

	if (promotion.form_is_active) {
		sharedData.floatingButtonClick = floatingButtonClick;
		sharedData.headerButtonClick = floatingButtonClick;
	}

	const handleTracker = (event_name) => {
		const tt_click_id = getCookie('ttclid') || null;

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
		// PixelServices.tiktokNonPixelEvent(payload);
		PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : event_name === 'EventButton' ? 'ClickButton'  : 'ViewContent');

		if (qualifiedPage && !unqualifiedPage) {
			// if (event_name === 'EventButton' || event_name === 'EventContact') {
			window.fbq('track', 'Lead');
			window.fbq('track', 'Purchase', {
				value: '300000',
				currency: 'IDR',
			});

			const metaPayload = {
				...payload,
				event_name: 'Purchase',
				currency: 'IDR',
				value: 300000,
			};

			PixelServices.metaEvent(metaPayload);

			PixelServices.trackTiktokBrowserEvent('Contact');
			// }
		}
	};

	useEffect(() => {
		const queries = {
			utm_source,
			utm_medium,
			utm_campaign,
			campaignid,
			adgroupid,
			adid,
			gclid,
			ttclid,
		};

		if (!utm_source) delete queries.utm_source;
		if (!utm_medium) delete queries.utm_medium;
		if (!utm_campaign) delete queries.utm_campaign;
		if (!campaignid) delete queries.campaignid;
		if (!adgroupid) delete queries.adgroupid;
		if (!adid) delete queries.adid;
		if (!gclid) delete queries.gclid;
		if (!ttclid) delete queries.ttclid;

		const valQuery = convertObjToQs(queries);

		const newUrl = `${valQuery ? `?${valQuery}` : ''}`;

		window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
	}, [query]);

	useEffect(() => {
		if (ttclid) {
			setCookie('ttclid', ttclid, {
				maxAge: 60 * 60 * 24,
				sameSite: 'none',
				httpOnly: false,
				secure: true,
			});
		}
	}, [ttclid]);

	useEffect(() => {
		handleTracker('EventPage');
	}, [slug]);

	const imageButtonClick = promotion.form_is_active && floatingButtonClick;

	if (qualifiedPage && !unqualifiedPage) {
		// const { secondsRemaining } = useRedirectAfterSomeSeconds('https://api.whatsapp.com/send?phone=6281219130879&text=Hi%20Tanam%2C%20aku%20mau%20tahu%20lebih%20lanjut%20tentang%20Tanam%F0%9F%A6%B7%F0%9F%98%8A', 3);
	}

	return (
		<BaseMain
			meta={
				<BaseMeta
					canonical={`${BASE_URL}/promotions/${slug}`}
					title={`${promotion.title} | Tanam Gigi`}
					description='Dapatkan penawaran spesial untuk memperbaiki senyumanmu dengan perawatan veneer gigi terbaik!'
					keywords='implan gigi, implan aligner, gigi ompong, solusi gigi ompong, dokter gigi, klinik gigi'
				/>
			}
			dataHeader={sharedData}
			qualifiedPage={qualifiedPage}
			unqualifiedPage={unqualifiedPage}
		>
			<SectionContent promotion={promotion} imageButtonClick={imageButtonClick} isQualified={qualifiedPage} isUnqualifiedLocation={unqualifiedLocationPage} isUnqualifiedBudget={unqualifiedBudgetPage} />
			{promotion?.form_is_active && (
				<div ref={formRef} className='mb-20 pt-[60px]'>
					<PromotionForm slug={promotion.slug} url={formUrl} />
				</div>
			)}
			{promotion?.footer_is_active && <BaseLocation clinics={clinics} content={pages.content} />}
		</BaseMain>
	);
}

export async function getStaticPaths() {
	const { data: promotions } = await PromotionServices.getPromotions('v1');

	const promotions_active = promotions.filter((promotion) => promotion.active === true);

	const paths = promotions_active.map((promotion) => ({
		params: {
			slug: promotion.slug,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps(context) {
	const { slug } = context.params;

	const { data: promotions } = await PromotionServices.getPromotions('v1');

	const promotions_active = promotions.filter((promotion) => promotion.active === true);

	const isSlugExist = promotions_active.some((promotion) => promotion.slug === slug);

	if (!isSlugExist) {
		return {
			notFound: true,
			revalidate: 10,
		};
	}

	const [pages, promotion, clinics] = await Promise.all([
		PageServices.getPages('v2', 'HOME'),
		PromotionServices.getPromotionBySlug('v1', slug),
		ClinicServices.getClinics('v1'),
	]);

	const homePages = pages.data.find((page) => page.section_type === 'CLINIC');

	return {
		props: {
			pages: homePages,
			promotion: promotion.data,
			clinics: clinics.data,
		},
		revalidate: 10,
	};
}
