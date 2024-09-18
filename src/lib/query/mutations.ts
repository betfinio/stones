import logger from '@/src/config/logger';
import { type PlaceBetParams, type SpinParams, placeBet, spin } from '@/src/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactionLink } from 'betfinio_app/helpers';
import { toast } from 'betfinio_app/use-toast';
import { useTranslation } from 'react-i18next';
import type { WriteContractErrorType, WriteContractReturnType } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useConfig } from 'wagmi';

export const usePlaceBet = () => {
	const config = useConfig();
	const { t } = useTranslation('', { keyPrefix: 'stones.controls' });
	const queryClient = useQueryClient();
	return useMutation<WriteContractReturnType, WriteContractErrorType, PlaceBetParams>({
		mutationKey: ['stones', 'placeBet'],
		mutationFn: (params) => placeBet(params, { config }),
		onSuccess: async (data) => {
			logger.success('transaction submitted');
			const { update } = toast({
				title: t('pending.title'),
				description: t('pending.message'),
				variant: 'loading',
				duration: 10000,
			});
			await waitForTransactionReceipt(config.getClient(), { hash: data });
			logger.success('transaction accepted');
			update({ variant: 'default', description: t('success.message'), title: t('success.title'), action: getTransactionLink(data) });
			await queryClient.invalidateQueries({ queryKey: ['stones'] });
			logger.success('finished');
		},
		onError: (error) => {
			logger.error(error);
		},
		onMutate: () => {
			logger.start('placing bet');
		},
	});
};

export const useSpin = () => {
	const config = useConfig();
	return useMutation<WriteContractReturnType, WriteContractErrorType, SpinParams>({
		mutationKey: ['stones', 'spin'],
		mutationFn: (params) => spin(params, { config }),
		onSuccess: async (data) => {
			logger.success('transaction submitted');
			const { update } = toast({
				title: 'Spinning',
				variant: 'loading',
				duration: 10000,
			});
			await waitForTransactionReceipt(config.getClient(), { hash: data });
			logger.success('transaction accepted');
			update({ variant: 'default', title: 'Requested', action: getTransactionLink(data) });
			logger.success('finished');
		},
		onError: (error) => {
			logger.error(error);
		},
		onMutate: () => {
			logger.start('placing bet');
		},
	});
};