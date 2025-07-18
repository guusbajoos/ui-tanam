import { useState, useEffect } from 'react';

const useResponsive = () => {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	// Fungsi untuk meng-update windowSize saat ukuran layar berubah
	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		// Event listener untuk mendengarkan perubahan ukuran layar
		window.addEventListener('resize', handleResize);

		// Set nilai awal saat komponen dimuat
		handleResize();

		// Membersihkan event listener ketika komponen dibongkar
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Penambahan array kosong sebagai argumen kedua useEffect membuatnya hanya berjalan sekali saat komponen dimuat

	return windowSize;
};

export default useResponsive;
