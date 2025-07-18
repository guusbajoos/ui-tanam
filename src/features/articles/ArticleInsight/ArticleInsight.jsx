import articleService from '@services/articles/articles';
import { useResponsive } from '@shared/hooks/hooks';
import { usePathname } from 'next/navigation';
import { Col, Input, Row, Typography } from 'antd';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';
import Image from 'next/image';
import dayjs from 'dayjs';
import ArticleBreadcrumb from './ArticleBreadcrumb/ArticleBreadcrumb';
import { useEffect, useState } from 'react';
import BaseTextEditor from '@shared/components/BaseTextEditor';
import moment from 'moment';
import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';
import PixelServices from '@services/pixel/pixel';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import styles from '@shared/styles/HTMLContentForceFont.module.css';
import { getCookie } from 'cookies-next';

const ArticleInsight = ({ data }) => {
	const responsive = useResponsive();
	const pathname = usePathname();

	const [articleComments, setArticleComments] = useState([]);
	const [comment, setComment] = useState('');
	const [comentAuthor, setComentAuthor] = useState({
		email: '',
		nama: '',
	});
	const [isNotificationShow, setIsNotificationShow] = useState(false);
	const [notificationText, setNotificationText] = useState('');
	const [error, setError] = useState('');

	const isLargeAbove = responsive?.width >= 1024;

	const getArticleComment = async (id) => {
		const response = await articleService.getArticleCommentById(id);

		setArticleComments(response.data);
	};

	const postComment = async () => {
		const EmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (!EmailRegex.test(comentAuthor.email)) {
			setError('Please Input Valid Email Address');
		} else {
			setError('');
			if (comentAuthor.nama === '' || comentAuthor.email === '' || comment === '' || comment === '<p><br></p>') {
				setIsNotificationShow(true);
				setNotificationText('Tolong isi semua field yang tersedia');
			} else {
				const response = await articleService.createArticleCommentByArticleId({
					article_id: data?.id ?? '',
					author_name: comentAuthor.nama,
					author_email: comentAuthor.email,
					comment,
				});

				if (response) {
					getArticleComment(data?.id ?? '');
					setComment('');
					setComentAuthor({
						email: '',
						nama: '',
					});
					setIsNotificationShow(true);
					setNotificationText('Komentar kamu sudah dikirim');
				} else {
					setIsNotificationShow(true);
					setNotificationText('Komentar kamu gagal dikirim');
				}
			}
		}
	};

	useEffect(() => {
		if (data !== null) {
			getArticleComment(data.id);
		}
	}, [data]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setNotificationText('');
			setIsNotificationShow(false);
		}, 2000);

		return () => clearTimeout(timeoutId);
	}, [isNotificationShow]);

	const handleTracker = (event_name, event, url) => {
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
		PixelServices.trackTiktokBrowserEvent(event_name === 'EventContact' ? 'Contact' : event_name === 'EventButton' ? 'ClickButton'  : 'ViewContent');

		

		const metaPayload = {
			...payload,
			event_name: 'Purchase',
			currency: 'IDR',
			value: 300000,
		};

		PixelServices.metaEvent(metaPayload);
	};

	return (
		<div className='size-full'>
			{data ? (
				<>
					{!isLargeAbove && (
						<div className='pl-[23px] pt-5'>
							<ArticleBreadcrumb
								categorySlug={data.category_slug}
								slug={pathname.split('/')[2]}
								category={data.category_name}
								title={data?.title}
							/>
						</div>
					)}

					{/* Banner Image */}
					<div className='px-[23px] lg:px-0'>
						<Image
							src={isLargeAbove ? data.url_banner_desktop : data.url_banner_mobile}
							width={0}
							height={0}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							quality={100}
							alt={isLargeAbove ? data.url_banner_desktop_alt : data.url_banner_mobile_alt}
							priority={true}
							className=' mx-auto   h-auto  w-screen  rounded-xl lg:w-screen lg:rounded-none lg:px-0'
						/>
					</div>

					<div className='px-5 py-5 lg:px-40 lg:py-20'>
						{/* Breadcrumb */}
						{isLargeAbove && (
							<ArticleBreadcrumb
								categorySlug={data.category_slug}
								slug={pathname.split('/')[2]}
								category={data.category_name}
								title={data?.title}
							/>
						)}
						{/* Title */}
						<Row className='mb-4'>
							<BaseHTMLRender content={data.title} className='text-electric-blue text-2xl font-bold lg:text-5xl' />
						</Row>
						{/* Content */}
						<div className='my-4'>
							<BaseHTMLRender content={data.body} className={styles.htmlContainer} />
						</div>
						{/* Updated Date */}
						<Row className='mb-0 mt-4 pb-0'>
							<div className=' text-xs  font-extrabold text-primary lg:text-base'>
								Terakhir diperbarui : {dayjs(data.epoch_updated_at).format('DD MMMM YYYY')}
							</div>
						</Row>

						{/* Banner */}
						{data.banner_url_image && data.banner_is_active && (
							<div className='relative w-full overflow-hidden rounded-xl  '>
								<Image
									src={data.banner_url_image}
									width={0}
									height={0}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									quality={100}
									alt={data?.banner_url_image_alt ?? ''}
									className='  max-h-[220px] w-full rounded-xl object-cover lg:max-h-[370px]  '
									unoptimized
									priority
									style={{ objectFit: 'cover', borderRadius: '10px' }}
								/>
								{data.banner_button_text && data.banner_button_url && (
									<div
										className={`  absolute bottom-0 right-0 z-10 mx-auto flex h-[50%]   w-1/2  items-center  justify-center xl:w-[53%] `}
									>
										<a
											href={data.banner_button_url}
											style={{ textDecoration: 'none' }}
											// eslint-disable-next-line tailwindcss/no-custom-classname
											className={` w-fit max-w-[98%]   `}
											aria-label={`cta-button-lead`}
											rel='noopener noreferrer'
											onClick={() => {
												data.banner_button_script &&
													// eslint-disable-next-line no-eval
													eval(data.banner_button_script);
												handleTracker('EventButton', `Click - ${data.banner_button_text}`, data.banner_button_url);
											}}
										>
											<BaseButton
												// eslint-disable-next-line tailwindcss/no-custom-classname
												wrapperClassName='  w-full '
												linkClassName='button-promo'
												buttonClassName={`rounded-[3rem]  border-2 border-primary    text-[0.85] lg:text-xl p-0  w-full lg:w-[325px] xl:w-[365px] font-semibold text-[0.8125rem] md:text-base sm:!py-2.5 sm:!px-5 lg:text-lg bg-white text-[#3D7E77] text-primary`}
												aria-label={`cta-button-lead`}
												style={{
													paddingBlock: '2px',
													paddingInline: '15px',
												}}
												isBorder
											>
												<div className='text-truncate-1 line-clamp-1  text-ellipsis'>{data.banner_button_text}</div>
											</BaseButton>
										</a>
									</div>
								)}
							</div>
						)}
						{/* Total comment */}
						<Row className='mt-4 flex flex-col'>
							<p className='text-xl font-semibold'>{articleComments?.length ?? 0} Comment</p>
							<Typography.Paragraph className='my-4 text-lg font-bold'>Comment</Typography.Paragraph>
						</Row>
						{/* Comment Input */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								postComment();
							}}
						>
							<Row gutter={16}>
								<Col span={24}>
									<BaseTextEditor
										value={comment}
										onChange={(e) => setComment(e)}
										wrapperClassName='border-primary'
										style={{
											border: '2px solid #1c7c70',
											borderRadius: '5px',
											'--jodit-ui-group': '2px solid #1c7c70',
										}}
									/>
								</Col>
								<Col lg={12} xs={24} className='mt-4'>
									<p className='mb-2 font-bold'>Nama</p>
									<Input
										required
										variant='outlined'
										placeholder='Type Here'
										className='rounded-xl border-2 border-primary'
										value={comentAuthor.nama}
										onChange={(e) =>
											setComentAuthor({
												...comentAuthor,
												nama: e.target.value,
											})
										}
									/>
								</Col>
								<Col lg={12} xs={24} className='mt-4'>
									<p className='mb-2 font-bold'>Email</p>
									<Input
										required
										type='email'
										variant='outlined'
										placeholder='Type Here'
										className='rounded-xl border-2 border-primary'
										value={comentAuthor.email}
										onChange={(e) =>
											setComentAuthor({
												...comentAuthor,
												email: e.target.value,
											})
										}
									/>
									{error !== '' && <p className='ml-2 mt-2 text-red-600'>{error}</p>}
								</Col>
								<Col span={24} className='mt-4 flex w-full items-center justify-center  lg:justify-start '>
									<BaseButton
										wrapperClassName=' max-w-full w-full lg:min-w-96 lg:w-full rounded-full mt-5 text-white disabled:bg-gray-500'
										disabled={
											comentAuthor.nama === '' ||
											comentAuthor.email === '' ||
											comment === '' ||
											comment === '<p><br></p>'
										}
										type='submit'
										onClick={(e) => {
											e.preventDefault();
											postComment();
										}}
									>
										Kirim Komentar
									</BaseButton>
								</Col>

								{isNotificationShow && (
									<Col
										span={24}
										className='my-4 flex items-center justify-center rounded-full bg-gray-300 text-center text-white'
									>
										<p className='py-4'>{notificationText}</p>
									</Col>
								)}
							</Row>
						</form>
						{/* List Comment */}
						<Row className='my-4'>
							{articleComments.length > 0 ? (
								articleComments.map((el) => (
									<div key={el.id} className='my-4 w-full'>
										<Row>
											<Col span={24} className='flex  text-sm sm:text-base'>
												<p className='mr-2 font-semibold text-primary'>{el.author_name}</p>
												<p className='text-gray-400'>
													{moment.utc(el.epoch_created_at).local().startOf('seconds').fromNow()}
												</p>
											</Col>
											<Col span={24} className='my-2  text-base font-bold sm:text-xl'>
												<BaseHTMLRender content={el.comment} />
											</Col>
										</Row>
										{el?.comment_list !== null && el?.comment_list !== undefined && el.comment_list?.length > 0 && (
											<div className=' text-xs text-primary sm:text-sm'>Balas</div>
										)}
										<div className='border-l-2'>
											{el?.comment_list !== null &&
												el?.comment_list !== undefined &&
												el.comment_list?.length > 0 &&
												el.comment_list?.map((item) => (
													<Row key={item.id} className='mt-4  pl-4'>
														<Col span={24} className='flex '>
															<p className='mr-2 font-semibold'>Tama</p>
															<FaCheckCircle color='#1c7c70' />
															<p className='mx-2 text-primary'>{item.author_name}</p>
															<p className='text-gray-400'>
																{moment.utc(item.epoch_created_at).local().startOf('seconds').fromNow()}
															</p>
														</Col>
														<Col span={24} className='my-2'>
															<BaseHTMLRender content={item.comment} />
														</Col>
													</Row>
												))}
										</div>
									</div>
								))
							) : (
								<div className='flex w-full flex-col justify-center'>
									<p className='mb-0 text-center text-4xl font-semibold'>No Comments yet</p>
									<p className='mt-2 text-center text-2xl'>Be the first to give a comment</p>
								</div>
							)}
						</Row>
					</div>
				</>
			) : (
				<div />
			)}
		</div>
	);
};

export default ArticleInsight;
