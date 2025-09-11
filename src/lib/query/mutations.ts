import { toast } from '@betfinio/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wagmiConfig } from 'betfinio_context/config';
import { getTransactionLink, handleError } from 'betfinio_context/lib/helpers';
import { useTranslation } from 'react-i18next';
import type { WriteContractErrorType, WriteContractReturnType } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useConfig } from 'wagmi';
import logger from '@/src/config/logger';
import { type DistributeParams, distribute, executeResult, type PlaceBetParams, placeBet, type SpinParams, settleLostBets, spin } from '@/src/lib/api';

export const usePlaceBet = () => {
	const config = useConfig();
	const { t } = useTranslation('stones', { keyPrefix: 'controls' });
	const { t: tErrors } = useTranslation('shared', { keyPrefix: 'errors' });
	const { t: tLocalError } = useTranslation('stones', { keyPrefix: 'errors' });
	const queryClient = useQueryClient();
	return useMutation<WriteContractReturnType, WriteContractErrorType, PlaceBetParams>({
		mutationKey: ['stones', 'placeBet'],
		mutationFn: (params) => placeBet(params, wagmiConfig),
		onSuccess: async (data) => {
			logger.success('transaction submitted');

			const promise = async () => {
				const result = await waitForTransactionReceipt(config.getClient(), { hash: data });
				if (result.status !== 'success') {
					throw new Error('Transaction failed');
				}
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
			const errorData = JSON.parse(JSON.stringify(error.cause));

			if (errorData.reason) toast.error(handleError(errorData.reason, tErrors, tLocalError));
			else if (errorData.signature) toast.error(handleError(errorData.signature, tErrors, tLocalError));
			else toast.error(tErrors('unknown'));
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
		mutationFn: (params) => spin(params, wagmiConfig),
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
		mutationFn: (params) => distribute(params, wagmiConfig),
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

export const useExecuteResult = (round: number) => {
	const queryClient = useQueryClient();
	const config = useConfig();
	return useMutation<WriteContractReturnType, WriteContractErrorType, DistributeParams>({
		mutationKey: ['stones', 'executeResult'],
		mutationFn: (params) => executeResult(params, wagmiConfig),
		onSuccess: async (data) => {
			logger.success('executeResult transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: 'Executing result...',
				success: () => {
					queryClient.invalidateQueries({ queryKey: ['stones', 'round', round, 'distributed'] });
					return 'Result executed';
				},
				action: getTransactionLink(data),
			});
			logger.success('executeResult finished');
		},
		onError: (error) => {
			toast.error('Execute result failed');
			logger.error(error);
		},
		onMutate: () => {
			logger.start('executing result');
		},
	});
};

export const useSettleLostBets = () => {
	const config = useConfig();
	return useMutation<WriteContractReturnType, WriteContractErrorType, DistributeParams>({
		mutationKey: ['stones', 'settleLostBets'],
		mutationFn: (params) => settleLostBets(params, wagmiConfig),
		onSuccess: async (data) => {
			logger.success('settleLostBets transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: 'Settling lost bets...',
				success: 'Lost bets settled',
				action: getTransactionLink(data),
			});
			logger.success('settleLostBets finished');
		},
		onError: (error) => {
			toast.error('Settle lost bets failed');
			logger.error(error);
		},
		onMutate: () => {
			logger.start('settling lost bets');
		},
	});
};

export const useSetBetAmount = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, string, string>({
		mutationKey: ['spin'],
		mutationFn: async (newValue) => {
			queryClient.setQueryData(['betAmount'], newValue);
		},
	});
};
