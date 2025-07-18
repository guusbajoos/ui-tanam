import { useEffect, useState } from 'react';

const useScrollspy = (ids, offset = 0) => {
	const [activeId, setActiveId] = useState('');

	const clamp = (value) => Math.max(0, value);

	const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

	const listener = () => {
		const scroll = window.pageYOffset;

		const position = ids
			.map((id) => {
				const element = document.getElementById(id);

				if (!element) return { id, top: -1, bottom: -1 };

				const rect = element.getBoundingClientRect();
				const top = clamp(rect.top + scroll - offset);
				const bottom = clamp(rect.bottom + scroll - offset);

				return { id, top, bottom };
			})
			.find(({ top, bottom }) => isBetween(scroll, top, bottom));

		setActiveId(position?.id);
	};

	useEffect(() => {
		listener();

		window.addEventListener('resize', listener);
		window.addEventListener('scroll', listener);

		return () => {
			window.removeEventListener('resize', listener);
			window.removeEventListener('scroll', listener);
		};
	}, [listener, activeId, offset, ids]);

	return activeId;
};

export default useScrollspy;
