import {
	fetchBetResult,
	fetchCurrentRound,
	fetchDistributedInRound,
	fetchRoundBank,
	fetchRoundBets,
	fetchRoundSideBank,
	fetchRoundSideBetsCount,
	fetchRoundStatus,
	fetchRoundStones,
	fetchRoundWinner,
} from '@/src/lib/api';
import { fetchBetsByPlayer, fetchRoundBetsByPlayer, fetchRounds } from '@/src/lib/gql';
import type { StoneInfo, StonesBet } from '@/src/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { useConfig } from 'wagmi';

export const useCurrentRound = () => {
	const config = useConfig();
	return useQuery<number>({
		queryKey: ['stones', 'currentRound'],
		queryFn: () => fetchCurrentRound({ config }),
	});
};

export const useActualRound = () => {
	const queryClient = useQueryClient();
	const getRound = () => {
		return Math.floor(Date.now() / 1000 / 60 / 10);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			queryClient.setQueryData(['stones', 'actualRound'], getRound());
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return useQuery<number>({
		queryKey: ['stones', 'actualRound'],
		queryFn: getRound,
	});
};

export const useRoundBank = (round: number) => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'bank'],
		queryFn: () => fetchRoundBank(round, { config }),
	});
};

export const useRoundStatus = (round: number) => {
	const config = useConfig();
	return useQuery<number>({
		queryKey: ['stones', 'round', round, 'status'],
		queryFn: () => fetchRoundStatus(round, { config }),
	});
};

export const useDistributedInRound = (round: number) => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'distributed'],
		queryFn: () => fetchDistributedInRound(round, { config }),
	});
};

export const useSideBank = (round: number) => {
	const config = useConfig();
	return useQuery<bigint[]>({
		queryKey: ['stones', 'round', round, 'sideBank'],
		queryFn: () => fetchRoundSideBank(round, { config }),
	});
};
export const useSideBetsCount = (round: number) => {
	const config = useConfig();
	return useQuery<bigint[]>({
		queryKey: ['stones', 'round', round, 'sideBetsCount'],
		queryFn: () => fetchRoundSideBetsCount(round, { config }),
	});
};

export const useRoundBets = (round: number) => {
	const config = useConfig();
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'round', round, 'bets'],
		queryFn: () => fetchRoundBets(round, { config }),
	});
};
export const useRoundBetsByPlayer = (round: number, player: Address) => {
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'round', round, 'bets', player],
		queryFn: () => fetchRoundBetsByPlayer(round, player),
	});
};

export const useStonesInfo = (round: number) => {
	const config = useConfig();
	return useQuery<StoneInfo[]>({
		queryKey: ['stones', 'round', round, 'stones'],
		queryFn: () => fetchRoundStones(round, { config }),
	});
};

export const usePlayerBets = (player: Address) => {
	return useQuery<StonesBet[]>({
		queryKey: ['stones', 'player', player, 'bets'],
		queryFn: () => fetchBetsByPlayer(player),
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

export const useBetResult = (bet: Address) => {
	const config = useConfig();
	return useQuery({
		queryKey: ['stones', 'bet', bet, 'result'],
		queryFn: () => fetchBetResult(bet, config),
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
