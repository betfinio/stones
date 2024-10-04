import logger from '@/src/config/logger';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useSelectedStone = () => {
	const queryClient = useQueryClient();

	const setSelectedStone = (newStone: number) => {
		logger.log('change selected stone', newStone);
		queryClient.setQueryData(['stones', 'selected'], newStone);
	};

	return {
		...useQuery({
			queryKey: ['stones', 'selected'],
			initialData: 1,
		}),
		setSelectedStone,
	};
};
