import { useQuery, useQueryClient } from '@tanstack/react-query';
import { wagmiConfig } from 'betfinio_context/config';
import type { Address } from 'viem';
import {
	fetchBetPayout,
	fetchBetResult,
	fetchCurrentRound,
	fetchRoundBank,
	fetchRoundBets,
	fetchRoundSideBank,
	fetchRoundStatus,
	fetchRoundStones,
	fetchTotalProbability,
	getActualRound,
	getInterval,
} from '@/src/lib/api';
import { fetchBetsByPlayer, fetchRoundBetsByPlayer, fetchRounds, fetchWinnerSide } from '@/src/lib/gql';
import type { StoneInfo, StonesBet } from '@/src/lib/types';

export const useCurrentRound = () => {
	return useQuery<number>({
		queryKey: ['stones', 'currentRound'],
		queryFn: () => fetchCurrentRound(wagmiConfig),
	});
};

export const useInterval = () => {
	return useQuery<number>({
		queryKey: ['stones', 'interval'],
		queryFn: () => getInterval(wagmiConfig),
		staleTime: Number.POSITIVE_INFINITY,
	});
};

export const useActualRound = () => {
	const { data: interval = 300 } = useInterval();
	return useQuery<number>({
		queryKey: ['stones', 'actualRound', interval],
		queryFn: () => getActualRound(interval),
		refetchInterval: 1000,
	});
};

export const useRoundBank = (round: number) => {
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'bank'],
		queryFn: () => fetchRoundBank(round, wagmiConfig),
	});
};

export const useRoundStatus = (round: number) => {
	return useQuery<number>({
		queryKey: ['stones', 'round', round, 'status'],
		queryFn: () => fetchRoundStatus(round, wagmiConfig),
	});
};

export const useSideBank = (round: number) => {
	return useQuery<bigint[]>({
		queryKey: ['stones', 'round', round, 'sideBank'],
		queryFn: () => fetchRoundSideBank(round, wagmiConfig),
	});
};

export const useTotalProbability = (round: number) => {
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'totalProbability'],
		queryFn: () => fetchTotalProbability(round, wagmiConfig),
	});
};

export const useRoundBets = (round: number) => {
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'round', round, 'bets'],
		queryFn: () => fetchRoundBets(round, wagmiConfig),
	});
};

export const useRoundBetsByPlayer = (round: number, player: Address) => {
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'round', round, 'bets', player],
		queryFn: () => fetchRoundBetsByPlayer(round, player),
	});
};

export const useStonesInfo = (round: number) => {
	return useQuery<StoneInfo[]>({
		queryKey: ['stones', 'round', round, 'stones'],
		queryFn: () => fetchRoundStones(round, wagmiConfig),
	});
};

export const usePlayerBets = (player: Address) => {
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'player', player, 'bets'],
		queryFn: () => fetchBetsByPlayer(player),
	});
};

export const useRounds = () => {
	return useQuery<{ round: number }[]>({
		queryKey: ['stones', 'rounds'],
		queryFn: () => fetchRounds(),
	});
};

export const useRoundWinner = (round: number) => {
	return useQuery<number>({
		queryKey: ['stones', 'round', round, 'winner'],
		queryFn: () => fetchWinnerSide(round),
	});
};

export const useBetResult = (bet: Address) => {
	return useQuery<bigint>({
		queryKey: ['stones', 'bet', bet, 'result'],
		queryFn: () => fetchBetResult(bet, wagmiConfig),
	});
};

export const useBetPayout = (bet: Address) => {
	return useQuery<bigint>({
		queryKey: ['stones', 'bet', bet, 'payout'],
		queryFn: () => fetchBetPayout(bet, wagmiConfig),
	});
};

export const useBetAmount = () => {
	return useQuery<string>({
		queryKey: ['betAmount'],
		staleTime: Number.POSITIVE_INFINITY,
	});
};

export const useObserveBet = (round: number) => {
	const queryClient = useQueryClient();
	const resetObservedBet = () => {
		queryClient.setQueryData(['stones', 'round', round, 'newBet'], { stone: null, strength: 0 });
	};

	const query = useQuery<{ stone: number | null; strength: number }>({
		queryKey: ['stones', 'round', round, 'newBet'],
		initialData: { stone: null, strength: 0 },
	});

	return { query, resetObservedBet };
};
