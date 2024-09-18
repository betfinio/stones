import { fetchCurrentRound, fetchRoundBank, fetchRoundBets, fetchRoundSideBank, fetchRoundStones, fetchRoundWinner } from '@/src/lib/api';
import { fetchRounds } from '@/src/lib/gql';
import type { StoneInfo, StonesBet } from '@/src/lib/types';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from 'wagmi';

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

export const useSideBank = (round: number) => {
	const config = useConfig();
	return useQuery<bigint[]>({
		queryKey: ['stones', 'round', round, 'sideBank'],
		queryFn: () => fetchRoundSideBank(round, { config }),
	});
};

export const useRoundBets = (round: number) => {
	const config = useConfig();
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'round', round, 'bets'],
		queryFn: () => fetchRoundBets(round, { config }),
		throwOnError: true,
	});
};

export const useStonesInfo = (round: number) => {
	const config = useConfig();
	return useQuery<StoneInfo[]>({
		queryKey: ['stones', 'round', round, 'stones'],
		queryFn: () => fetchRoundStones(round, { config }),
	});
};

export const useRounds = () => {
	return useQuery({
		queryKey: ['stones', 'rounds'],
		queryFn: () => fetchRounds(),
	});
};

export const useRoundWinner = (round: number) => {
	const config = useConfig();
	return useQuery({
		queryKey: ['stones', 'round', round, 'winner'],
		queryFn: () => fetchRoundWinner(round, config),
	});
};
