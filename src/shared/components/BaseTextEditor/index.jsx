import { useEffect, useRef, useState } from 'react';
import { config } from './tools';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const BaseTextEditor = (props) => {
	const editor = useRef(null);
	const [state, setState] = useState('');
	const [wordCount, setWordCount] = useState(0);

	const internalHandleChange = (e) => {
		setState(e);
		props.onChange && props.onChange(e);
	};

	useEffect(() => {
		setState(props.value || '');
	}, [props.value]);

	return (
		<>
			<div
				// eslint-disable-next-line tailwindcss/no-custom-classname
				className={` text__editor ${props.wrapperClassName || ''}`}
				style={props.style}
			>
				<JoditEditor
					config={props.config || config}
					onBlur={(e) => internalHandleChange(e)}
					ref={editor}
					value={state}
					onChange={(newContent) => {
						const words = newContent
							.replace(/<[^>]*>/g, '')
							.trim()
							.split(/\s+/).length;
						setWordCount(words);
					}}
				/>
			</div>
			<div className='flex w-full justify-end py-2 text-base font-semibold'>{wordCount} / 1000</div>
		</>
	);
};

export default BaseTextEditor;
