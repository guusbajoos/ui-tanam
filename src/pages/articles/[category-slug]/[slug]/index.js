import ArticleInsight from '@features/articles/ArticleInsight/ArticleInsight';
import ArticleInsightComponentWrapper from '@features/articles/ArticleInsightComponentWrapper';
import ExploreArticle from '@features/articles/ExploreArticle/ExploreArticle';
import { getArticleBySlug, getArticles } from '@services/articles/articles';
import { Metadata } from 'next';
import BaseLocation from '@shared/components//BaseLocation/BaseLocation';
import React, { useEffect, useState } from 'react';
import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import PageServices from '@services/pages/pages';
import ClinicServices from '@services/clinics/clinics';
import articleService from '@services/articles/articles';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const Page = ({ pages, clinics, relatedArticles, data }) => {
	const router = useRouter();
	const { slug } = router.query;
	const pathname = usePathname();
	const [recentArticles, setRecentArticles] = useState([]);
	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
			? 'https://dev.tanamgigi.id'
			: 'https://tanamgigi.id';

	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];


	return (
		<BaseMain
			meta={
				<BaseMeta
					canonical={`${BASE_URL}/articles/${slug}`}
					title={data?.title}
					description={data?.preview || ''}
					keywords={data?.keywords || ''}
				/>
			}
			floatingWhatsappButton={data?.show_floating_wa_button ? {
				enabled: true, text: data?.floating_wa_button_text, url: data?.floating_wa_button_url
			} : null}
		>
			<ArticleInsightComponentWrapper>
				<ArticleInsight data={data} categorySlug={slug}/>
				<ExploreArticle data={relatedArticles} title='Mungkin Anda Suka' />
			</ArticleInsightComponentWrapper>
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps(context) {
	const { slug } = context.params;

	const [pages, clinics, relatedArticles, data] = await Promise.all([
		PageServices.getPages('v2'),
		ClinicServices.getClinics('v1'),
		articleService.getRelatedSummaryArticles(slug),
		articleService.getSummaryArticleBySlug(slug)
	]);

	return {
		props: {
			pages: {
				sections: pages.data,
			},
			clinics: clinics.data,
			relatedArticles: relatedArticles.data,
			data: data.data
		},
	};
}

export default Page;
