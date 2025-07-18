import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (callback, options) => {
	const scrollRef = useRef();

	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const [results, setResults] = useState([]);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await callback(page);
			const totalPage = res.meta?.total_page;
			const newData = await res.data;

			setResults([...results, ...newData]);
			setHasMore(page !== totalPage);
		} catch (err) {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	useEffect(() => {
		if (!scrollRef?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && hasMore) {
				setPage((currentPage) => currentPage + 1);
			}
		}, options);

		if (scrollRef.current) {
			observer.observe(scrollRef.current);
		}

		return () => {
			if (scrollRef.current) {
				observer.unobserve(scrollRef.current);
			}
		};
	}, [hasMore, scrollRef]);

	return { results, isLoading, scrollRef };
};

export default useInfiniteScroll;
