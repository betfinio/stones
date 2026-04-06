import { toast } from '@betfinio/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wagmiConfig } from 'betfinio_context/config';
import { getTransactionLink, handleError } from 'betfinio_context/lib/helpers';
import { useTranslation } from 'react-i18next';
import type { WriteContractErrorType, WriteContractReturnType } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useConfig } from 'wagmi';
import logger from '@/src/config/logger';
import {
	type PlaceBetParams,
	placeBet,
	type RefundRoundParams,
	type ResolveRoundParams,
	refundRound,
	resolveRound,
	type SpinParams,
	spin,
} from '@/src/lib/api';
import { clearVrfWinnerSide } from '@/src/lib/vrf-winner-session';

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
	const queryClient = useQueryClient();
	const { t } = useTranslation('stones', { keyPrefix: 'toasts.spin' });
	return useMutation<WriteContractReturnType, WriteContractErrorType, SpinParams>({
		mutationKey: ['stones', 'spin'],
		mutationFn: (params) => spin(params, wagmiConfig),
		onSuccess: async (data) => {
			logger.success('transaction submitted');
			void queryClient.invalidateQueries({ queryKey: ['stones'] });

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
				await queryClient.invalidateQueries({ queryKey: ['stones'] });
			};

			toast.promise(promise, {
				loading: t('loading'),
				success: t('success'),
				action: getTransactionLink(data),
			});

			logger.success('finished');
		},
		onError: (error) => {
			logger.error(error);
		},
		onMutate: () => {
			logger.start('spinning');
		},
	});
};

export const useResolveRound = () => {
	const config = useConfig();
	const { t } = useTranslation('stones', { keyPrefix: 'toasts.settle' });
	const queryClient = useQueryClient();
	return useMutation<WriteContractReturnType, WriteContractErrorType, ResolveRoundParams>({
		mutationKey: ['stones', 'resolveRound'],
		mutationFn: (params) => resolveRound(params, wagmiConfig),
		onSuccess: async (data, variables) => {
			logger.success('resolve round submitted');
			void queryClient.invalidateQueries({ queryKey: ['stones'] });

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
				clearVrfWinnerSide(variables.round);
				await queryClient.invalidateQueries({ queryKey: ['stones'] });
			};

			toast.promise(promise, {
				loading: t('loading'),
				success: t('success'),
				action: getTransactionLink(data),
			});

			logger.success('resolve round finished');
		},
		onError: (error) => {
			logger.error(error);
		},
		onMutate: () => {
			logger.start('resolving round');
		},
	});
};

export const useRefundRound = () => {
	const config = useConfig();
	const { t } = useTranslation('stones', { keyPrefix: 'toasts.refund' });
	const queryClient = useQueryClient();
	return useMutation<WriteContractReturnType, WriteContractErrorType, RefundRoundParams>({
		mutationKey: ['stones', 'refundRound'],
		mutationFn: (params) => refundRound(params, wagmiConfig),
		onSuccess: async (data) => {
			logger.success('transaction submitted');

			const promise = async () => {
				await waitForTransactionReceipt(config.getClient(), { hash: data });
			};

			toast.promise(promise, {
				loading: t('loading'),
				success: t('success'),
				action: getTransactionLink(data),
			});

			queryClient.invalidateQueries({ queryKey: ['stones'] });
		},
		onError: (error) => {
			logger.error(error);
		},
		onMutate: () => {
			logger.start('refunding round');
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
