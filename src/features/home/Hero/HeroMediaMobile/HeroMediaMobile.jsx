import HeroContentMobile from '../HeroContentMobile/HeroContentMobile';

const HeroMediaMobile = ({ content, usps, onClick }) => {
	return (
		<div className='relative w-full overflow-hidden'>
			<video autoPlay loop muted controls playsInline className='w-full h-auto'>
				<source src={content.video_url} type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			<HeroContentMobile content={content} usps={usps} onClick={onClick} />
		</div>
	);
};

export default HeroMediaMobile;
