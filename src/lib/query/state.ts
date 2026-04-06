import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import logger from '@/src/config/logger';

export const useSelectedStone = () => {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ['stones', 'selected'],
		initialData: 1,
	});

	const setSelectedStone = useCallback(
		(newStone: number) => {
			const prev = queryClient.getQueryData<number>(['stones', 'selected']);
			if (prev === newStone) return;

			logger.log('change selected stone', newStone);
			queryClient.setQueryData(['stones', 'selected'], newStone);
		},
		[queryClient],
	);

	return {
		...query,
		setSelectedStone,
	};
};
