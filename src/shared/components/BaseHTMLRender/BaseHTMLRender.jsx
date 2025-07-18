import DOMPurify from 'isomorphic-dompurify';

const BaseHTMLRender = ({ content, className = '', id = '' }) => {
	return (
		<div
			id={id}
			dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_ATTR: ['target'] }) }}
			className={className}
		/>
	);
};

export default BaseHTMLRender;
