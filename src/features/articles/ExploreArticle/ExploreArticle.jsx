import RelatedArticleSlider from '@features/articles/RelatedArticleSlider';
import BaseContainer from '@shared/components//BaseContainer/BaseContainer';
import ExploreArticleTitle from './ExploreArticleTitle';

const ExploreArticle = (props) => {
	return (
		<section className='  py-[3.125rem] lg:py-[4.375rem]'>
			<BaseContainer>
				<ExploreArticleTitle title={props.title} />
				<RelatedArticleSlider data={props.data} />
			</BaseContainer>
		</section>
	);
};

export default ExploreArticle;
