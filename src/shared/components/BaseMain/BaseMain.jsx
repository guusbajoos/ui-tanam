import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import localFont from '@next/font/local';

import GeneralService from '@services/general/general';

import BaseLayout from '@shared/components/BaseLayout/BaseLayout';
import BaseHeader from '@shared/components/BaseHeader/BaseHeader';
import BaseFooter from '@shared/components/BaseFooter/BaseFooter';
import BaseWhatsappFloating from '@shared/components/BaseWhatsappFloating/BaseWhatsappFloating';

const CenturyFont = localFont({
	src: [
		{
			path: '../../assets/fonts/CenturyGothicPro.otf',
			weight: '400',
			style: 'normal',
			display: 'swap',
			subsets: ['latin'],
		},
		{
			path: '../../assets/fonts/CenturyGothicPro-Bold.otf',
			weight: '500',
			style: 'normal',
			display: 'swap',
			subsets: ['latin'],
		},
	],
});

const BaseMain = (props) => {
	const router = useRouter();

	const [generalButtons, setGeneralButtons] = useState([]);
	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const getGeneralButtons = async () => {
		const { data } = await GeneralService.getGeneralButtons('v1');
		setGeneralButtons(data);
	};

	const floatingPromotion = generalButtons?.find((val) => val.type === 'FLOATING_BUTTON');

	let headerButton = generalButtons?.find((val) => val.type === 'HEADER_BUTTON');
	if (props?.dataHeader?.headerButton?.enabled) {
		headerButton = props?.dataHeader?.headerButton;
	}

	let floatingWhatsappButton =
		props.floatingWhatsappButton ||
		(props?.dataHeader?.floatingWhatsappButton?.enabled
			? props?.dataHeader?.floatingWhatsappButton
			: generalButtons?.find((val) => val.type === 'WHATSAPP_BUTTON'));

	let sharedData;

	if (router.pathname === '/promotions/[slug]') {
		sharedData = {
			...props?.dataHeader,
			floatingPromotion,
			headerButton,
			floatingWhatsappButton,
		};
	} else {
		sharedData = {
			devices: {
				user_agent: userAgent,
			},
			floatingPromotion,
			headerButton,
			floatingWhatsappButton,
		};
	}

	useEffect(() => {
		getGeneralButtons();
	}, []);

	return (
		<React.Fragment>
			{props.meta}

			<BaseLayout>
				{!props.qualifiedPage && !props.unqualifiedPage && <BaseHeader
					devices={sharedData?.devices}
					headerButton={sharedData?.headerButton}
					floatingPromotion={sharedData?.floatingPromotion}
					headerButtonClick={sharedData?.headerButtonClick}
				/>}
				<main className={CenturyFont.className}>{props.children}</main>

				{!props.qualifiedPage && !props.unqualifiedPage && <BaseFooter />}

				{sharedData?.floatingWhatsappButton?.enabled && !props.qualifiedPage && !props.unqualifiedPage && (
					<BaseWhatsappFloating
						data={sharedData?.floatingWhatsappButton}
						devices={sharedData?.devices}
						floatingButtonClick={sharedData?.floatingButtonClick}
					/>
				)}
			</BaseLayout>
		</React.Fragment>
	);
};

export default BaseMain;
