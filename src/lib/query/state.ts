import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useSelectedStone = () => {
	const [selectedStone, setSelectedStone] = useState<number>(1);
	const queryClient = useQueryClient();
	useEffect(() => {
		queryClient.setQueryData(['stones', 'selected'], selectedStone);
	}, [selectedStone]);

	return {
		...useQuery({
			queryKey: ['stones', 'selected'],
			queryFn: () => selectedStone,
			initialData: 1,
		}),
		setSelectedStone,
	};
};
