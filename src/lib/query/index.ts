import { fetchCurrentRound, fetchRoundBank, fetchRoundBets, fetchRoundStones } from '@/src/lib/api';
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
