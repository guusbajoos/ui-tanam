import React, { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import PageServices from '@services/pages/pages';
import ClinicServices from '@services/clinics/clinics';
import PixelServices from '@services/pixel/pixel';

// import { CiSearch } from "react-icons/ci";
import { Pagination } from 'antd';

import BaseMain from '@shared/components/BaseMain/BaseMain';
import BaseMeta from '@shared/components/BaseMeta/BaseMeta';
import BaseLocation from '@shared/components/BaseLocation/BaseLocation';

import HeroSlider from '@features/articles/HeroSlider/HeroSlider';
import ArticleListItem from '@features/articles/ArticleListItem';

import { IoSearch } from 'react-icons/io5';

import articleService from '@services/articles/articles';
import CategorySlider from '@features/articles/CategorySlider';
import { useRouter } from 'next/router';

const Articles = ({ pages, clinics, initialSlug }) => {
	const [search, setSearch] = useState('');
	const [articleList, setArticleList] = useState([]);
	const [page, setPage] = useState(1);
	const [metadata, setMetadata] = useState({
		current_page: 1,
		size: 5,
	});

	const [category_slug, setCategory_slug] = useState(initialSlug || '');
	const [categories, setCategories] = useState([]);
	const [recentArticles, setRecentArticles] = useState([]);
	const router = useRouter();

	const BASE_URL =
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://dev.tanamgigi.id' : 'https://tanamgigi.id';

	const [userAgent] = useState(typeof window !== 'undefined' && window.navigator.userAgent);

	const tt_click_id = getCookie('ttclid') || null;

	const ABOUT_PROMO = pages.sections?.find((page) => page.section_type === 'ABOUT_PROMO')['content'];
	const CLINICS = pages.sections?.find((page) => page.section_type === 'CLINIC')['content'];
	const ARTICLES = pages.sections?.find((page) => page.section_type === 'ARTICLE');

	const metaOptions = pages.meta?.find((meta) => meta.menu_type === 'ARTICLE');
	const handleCategoryChange = (slug) => {
		setCategory_slug(slug);
		router.push(slug ? `/articles/${slug}` : `/articles`, undefined, { shallow: true });
	};
	const handleTracker = () => {
		PixelServices.pixelEvent({
			ttclid: tt_click_id,
			event_name: 'EventPage',
			content_name: 'View - Articles',
			event_source_url: `${BASE_URL}/articles`,
			city: 'Indonesia',
			client_user_agent: userAgent,
			client_ip_address: null,
		});
		PixelServices.trackTiktokBrowserEvent('ViewContent');

	};

	const CustomPagination = (props) => {
		const itemRender = (page, type, originalElement) => {
			if (type === 'prev') {
				return <a className='mr-10'>Previous</a>;
			}
			if (type === 'next') {
				return <a className='ml-10'>Next</a>;
			}
			return originalElement;
		};

		return <Pagination itemRender={itemRender} {...props} />;
	};

	const fetchArticles = async () => {
		try {
			const articles = await articleService.getSummaryArticles(
				metadata.current_page,
				metadata.size,
				category_slug,
				search,
			);
			setArticleList(articles.data);
			setMetadata(articles.meta);
		} catch (error) {
			console.error('Failed to fetch articles', error);
		}
	};

	const fetchCategories = async () => {
		try {
			const categories = await articleService.getCategoryArticles();
			setCategories(categories.data);
		} catch (error) {
			console.error('Failed to fetch categories', error);
		}
	};

	const fetchRecentArticles = async () => {
		try {
			const articles = await articleService.getSliderSummaryArticles();
			setRecentArticles(articles.data);
		} catch (error) {
			console.error('Failed to fetch articles', error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, [page, search, category_slug, metadata.current_page, metadata.size]);

	useEffect(() => {
		fetchCategories();
		fetchRecentArticles();
		handleTracker();
	}, []);

	const resetCategorySlug = () => {
		setCategory_slug('');
		setPage(1);
		setSearch('');
	};

	useEffect(() => {
		const handleRouteChange = (url) => {
			if (url === '/articles') {
				resetCategorySlug();
			}
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<BaseMain
			meta={
				<BaseMeta
					canonical={`${BASE_URL}/articles`}
					title={metaOptions.meta_title}
					description={metaOptions.meta_description}
					keywords={metaOptions.meta_keywords}
				/>
			}
		>
			<HeroSlider photos={recentArticles} content={ARTICLES} />
			<div className='mt-[50px] flex justify-center lg:mt-[125px]'>
				<div className='flex max-w-[327px] flex-col justify-center sm:max-w-[80%] lg:min-w-[700px] lg:max-w-[1000px] '>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							getArticleList();
						}}
						className='mb-3 flex items-center rounded-full border-2 border-primary px-4 py-2'
					>
						<input
							className='  w-full border-primary  text-lg font-bold text-primary outline-primary placeholder:text-lg placeholder:font-bold placeholder:text-primary focus:border-primary focus:outline-none'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Cari Artikel..'
						/>
						<button type='submit'>
							<IoSearch color='#3D7E77' size={36} />
						</button>
					</form>

					<CategorySlider
						categories={categories}
						setCategory_slug={handleCategoryChange}
						category_slug={category_slug}
					/>

					<React.Fragment>
						<div className='mt-8 flex flex-col gap-10 lg:mt-16 '>
							{articleList?.map((article, index) => (
								<ArticleListItem
									{...article}
									index={index}
									key={article.id}
									href={`/articles/${article.category_slug}/${article.slug}`}
								/>
							))}
							<CustomPagination
								align='center'
								current={metadata?.current_page ?? 1}
								total={metadata?.total_data ?? 10}
								pageSize={metadata?.size ?? 5}
								onChange={(p) => setMetadata({ ...metadata, current_page: p })}
							/>
						</div>
					</React.Fragment>
				</div>
			</div>
			<BaseLocation clinics={clinics} content={CLINICS} />
		</BaseMain>
	);
};

export async function getServerSideProps({ params }) {
	const [pages, meta, clinics] = await Promise.all([
		PageServices.getPages('v2'),
		PageServices.getPageMetaOptions('v1', 'ARTICLE'),
		ClinicServices.getClinics('v1'),
	]);
	const slug = params.slug ? params.slug[0] : null; // Handle optional slug

	return {
		props: {
			pages: {
				sections: pages.data,
				meta: meta.data,
			},
			clinics: clinics.data,
			initialSlug: slug || '',
		},
	};
}

export default Articles;
