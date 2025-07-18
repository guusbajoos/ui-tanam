import BaseContainer from '@shared/components/BaseContainer/BaseContainer';
import BaseHTMLRender from '@shared/components/BaseHTMLRender/BaseHTMLRender';
import ImplantSpecialistItem from './ImplantSpecialistItem/ImplantSpecialistItem';

const ImplantSpecialist = ({ specialists, content }) => {
	return (
		<section className='bg-white pt-50 lg:py-70'>
			<BaseContainer className='!px-0 lg:px-8'>
				<div className='mb-6 px-4 lg:mb-14 lg:px-0'>
					<h2 className='mx-auto mb-6 line-clamp-3 w-full text-center text-[2rem] font-semibold text-primary lg:line-clamp-2 lg:max-w-[818px] lg:text-5xl'>
						{content.title}
					</h2>
					<BaseHTMLRender
						content={content.description}
						className='mx-auto line-clamp-4 w-full text-center text-base text-secondary lg:line-clamp-3 lg:max-w-[871px] lg:text-2xl'
					/>
				</div>
				<div className='mx-auto w-full lg:max-w-[950px]'>
					{specialists.map((specialist) => (
						<ImplantSpecialistItem
							key={specialist.id}
							position={specialist.position_image}
							src={specialist.url_image}
							alt={specialist.url_image_alt}
							title={specialist.title}
							description={specialist.description}
						/>
					))}
				</div>
			</BaseContainer>
		</section>
	);
};

export default ImplantSpecialist;
