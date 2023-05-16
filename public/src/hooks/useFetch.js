import { useState, useEffect } from 'react';

export default function useFetch() {
	const [data, setData] = useState([]);

	const queries = ['Bella', 'Sasha', 'Tiger', 'Oscar', 'Mittens', 'Zoe', 'Cali', 'Patches', 'Loki', 'Tinkerbell', 'Mia', 'Sheba', 'Sadie', 'Daisy', 'Snowball', 'Snickers', 'Sugar', 'Lilly', 'Kiki', 'Sophie'];

	useEffect(() => {
		for (let i = 0; i < 2; i++) {
            const query = queries[Math.floor(Math.random() * queries.length)];
            if (data.some((item) => item.index === query)) {
                i--;
                continue;
            }
			const url = `https://api.dicebear.com/6.x/adventurer/svg?seed=${query}&flip=true&radius=50&backgroundType=gradientLinear&backgroundColor=b6e3f4`;
			setData((prevData) => [...prevData, { index: query, image: url }]);
		}
	}, []);

	return { data };
}
