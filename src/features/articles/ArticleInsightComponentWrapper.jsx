import PixelServices from '@services/pixel/pixel';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ArticleInsightComponentWrapper = (props) => {
	const pathname = usePathname();

	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	useEffect(() => {
		PixelServices.pixelEvent({
			event_name: 'EventPage',
			content_name: 'View - Article',
			event_source_url: `${BASE_URL}/${pathname}`,
			city: 'Indonesia',
		});
		PixelServices.trackTiktokBrowserEvent('ViewContent');

	}, [pathname]);

	return <div id='article__component__wrapper'>{props.children}</div>;
};

export default ArticleInsightComponentWrapper;
