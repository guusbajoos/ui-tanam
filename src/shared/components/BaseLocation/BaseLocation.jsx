import Image from 'next/image';

import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';

const BaseLocation = ({ content, clinics }) => {
	return (
		<section className='bg-white py-50 lg:pb-30 lg:pt-70'>
			<BaseContainer>
				<h2 className='mx-auto line-clamp-4 w-full text-center text-[2.125rem] font-semibold text-primary lg:mb-4 lg:line-clamp-3 lg:max-w-[818px] lg:text-5xl'>
					{content.title}
				</h2>
				{content.description && (
					<BaseHTMLRender
						content={content.description}
						className='mx-auto line-clamp-4 w-full text-center text-2xl text-black lg:line-clamp-3 lg:max-w-[747px]'
					/>
				)}
				<div className='my-[46px]'>
					<div className='hidden sm:block'>
						<Image
							src={content.url_desktop}
							width={0}
							height={0}
							sizes='(min-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw'
							quality={100}
							alt={content.url_desktop_alt || 'clinic banner'}
							priority
							className='h-full w-full rounded-2xl object-cover'
						/>
					</div>
					<div className='block sm:hidden'>
						<Image
							src={content.url_mobile}
							width={0}
							height={0}
							sizes='(max-width: 639px) 100vw'
							quality={100}
							alt={content.url_mobile_alt || 'clinic banner url_mobile'}
							priority
							className='w-full rounded-2xl object-cover'
						/>
					</div>
				</div>
				<div className='flex flex-wrap'>
					{clinics?.map((clinic) => (
						<div key={clinic.id} className='w-full pb-30 last:pb-0 md:w-1/2 md:pr-10 lg:w-1/3 lg:pb-10 xl:pr-70'>
							{clinic.redirect_link ? (
								<a
									href={clinic.redirect_link}
									rel='noopener noreferrer'
									target='_blank'
									className='line-clamp-2 block w-fit pb-2 text-base font-semibold text-primary underline lg:text-xl'
								>
									{clinic.name}
								</a>
							) : (
								<h3 className='line-clamp-2 block w-fit pb-2 text-base font-semibold text-primary underline lg:text-xl'>
									{clinic.name}
								</h3>
							)}
							<p className='mb-0 line-clamp-3 text-sm text-secondary lg:line-clamp-5 lg:text-xl xl:line-clamp-3'>
								{clinic.address}
							</p>
						</div>
					))}
				</div>
			</BaseContainer>
		</section>
	);
};

export default BaseLocation;
