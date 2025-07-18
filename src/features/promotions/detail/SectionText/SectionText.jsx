import BaseContainer from '@shared/components/BaseContainer/BaseContainer';

const SectionText = ({ text }) => {
	return (
		<div id={text.section_tag} className='px-4'>
			<BaseContainer>
				<div className='flex flex-wrap pb-[41px] pt-[55px]'>
					<div className='w-full'>
						<h2 className='mb-30'>{text.title}</h2>
					</div>
					<div className='w-full'>
						<h2>{text.sub_title}</h2>
					</div>
				</div>
			</BaseContainer>
		</div>
	);
};

export default SectionText;
