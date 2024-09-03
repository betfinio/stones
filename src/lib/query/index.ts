import {type SpinParams, fetchCurrentRound, fetchRoundBank, spin, fetchRoundStones} from '@/src/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { WriteContractErrorType, WriteContractReturnType } from 'viem';
import { useConfig } from 'wagmi';
import type {StoneInfo} from "@/src/lib/types.ts";

export const useCurrentRound = () => {
	const config = useConfig();
	return useQuery<number>({
		queryKey: ['stones', 'currentRound'],
		queryFn: () => fetchCurrentRound({ config }),
	});
};

export const useRoundBank = (round: number) => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'bank'],
		queryFn: () => fetchRoundBank(round, { config }),
	});
};

export const useStonesInfo = (round: number) => {
	const config = useConfig();
	return useQuery<StoneInfo[]>({
		queryKey: ['stones', 'round', round, 'stones'],
		queryFn: () => fetchRoundStones(round, { config }),
	});
};

export const useSpin = () => {
	const config = useConfig();
	return useMutation<WriteContractReturnType, WriteContractErrorType, SpinParams>({
		mutationKey: ['stones', 'spin'],
		mutationFn: (params) => spin(params, { config }),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},
		onMutate: (params) => {
			console.log('onMutate', params);
		},
	});
};
