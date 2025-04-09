import logger from '@/src/config/logger';
import { type DistributeParams, type PlaceBetParams, type SpinParams, distribute, placeBet, spin } from '@/src/lib/api';
import { toast } from '@betfinio/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactionLink } from 'betfinio_context/lib/helpers';
import { useTranslation } from 'react-i18next';
import type { WriteContractErrorType, WriteContractReturnType } from 'viem';
import { getTransaction, waitForTransactionReceipt } from 'viem/actions';
import { useConfig } from 'wagmi';

export const usePlaceBet = () => {
	const config = useConfig();
	const { t } = useTranslation('stones', { keyPrefix: 'controls' });
	const { t: tErrors } = useTranslation('shared', { keyPrefix: 'errors' });
	const { t: tLocalError } = useTranslation('stones', { keyPrefix: 'errors' });
	const queryClient = useQueryClient();
	return useMutation<WriteContractReturnType, WriteContractErrorType, PlaceBetParams>({
		mutationKey: ['stones', 'placeBet'],
		mutationFn: (params) => placeBet(params, config),
		onSuccess: async (data) => {
			logger.success('transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: t('pending.title'),
				success: t('success.title'),
				error: tErrors('default'),
				action: getTransactionLink(data),
			});

			queryClient.invalidateQueries({ queryKey: ['stones'] });
		},
		onError: (error) => {
			//@ts-ignore
			const errorData = JSON.parse(JSON.stringify(error.cause));
			if (errorData.reason) {
				toast.error(tErrors('default'), {
					description: tErrors(errorData.reason, { defaultValue: tLocalError(errorData.reason) }),
				});
			} else if (errorData.signature) {
				toast.error(tErrors('default'), {
					description: tErrors(errorData.signature, { defaultValue: tLocalError(errorData.signature) }),
				});
			} else {
				toast.error(tErrors('unknown'));
			}
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
		mutationFn: (params) => spin(params, config),
		onSuccess: async (data) => {
			logger.success('transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: 'Spinning',
				success: 'Requested',
				action: getTransactionLink(data),
			});

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

export const useDistribute = () => {
	const config = useConfig();
	return useMutation<WriteContractReturnType, WriteContractReturnType, DistributeParams>({
		mutationKey: ['stones', 'spin'],
		mutationFn: (params) => distribute(params, config),
		onSuccess: async (data) => {
			logger.success('transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: 'Distributing',
				success: 'Distributed',
				action: getTransactionLink(data),
			});
			logger.success('finished');
		},
		onError: (error) => {
			toast.error('Distribution failed');
			logger.error(error);
		},
		onMutate: () => {
			logger.start('placing bet');
		},
	});
};

export const useSetBetAmount = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, number, number>({
		mutationKey: ['spin'],
		mutationFn: async (newValue) => {
			queryClient.setQueryData(['betAmount'], newValue);
		},
	});
};
