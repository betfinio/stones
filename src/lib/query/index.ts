import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from 'betfinio_context/config';
import type { Address } from 'viem';
import { CoreBetABI } from '@/src/lib/abi/CoreBetABI';
import {
	fetchBetPayout,
	fetchBetResult,
	fetchCurrentRound,
	fetchRoundBank,
	fetchRoundBets,
	fetchRoundSideBank,
	fetchRoundStatus,
	fetchRoundStones,
	fetchRoundTotalBankFromGame,
	fetchTotalProbability,
	getActualRound,
	getInterval,
} from '@/src/lib/api';
import { CORE, STONES } from '@/src/lib/global';
import { fetchBetsByPlayer, fetchRoundBetsByPlayer, fetchRounds, fetchWinnerSide } from '@/src/lib/gql';
import { RoundStatusEnum, type StoneInfo, type StonesBet } from '@/src/lib/types';
import { readVrfWinnerSide } from '@/src/lib/vrf-winner-session';

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

export const useStonesFee = () => {
	return useQuery<{ feeBps: bigint }>({
		queryKey: ['stones', STONES, 'fee'],
		queryFn: async () => {
			const result = await readContract(wagmiConfig, {
				abi: CoreBetABI,
				address: CORE,
				functionName: 'getGameConfig',
				args: [STONES],
			});
			return { feeBps: result.feeBps };
		},
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

export const useRoundTotalBankFromGame = (round: number) => {
	return useQuery<bigint>({
		queryKey: ['stones', 'round', round, 'pvpTotalBank'],
		queryFn: () => fetchRoundTotalBankFromGame(round, wagmiConfig),
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

/** Winning side (1–5): subgraph, settled bet clones, React Query cache, sessionStorage (client VRF events). */
export const useRoundWinner = (round: number) => {
	const queryClient = useQueryClient();
	return useQuery<number>({
		queryKey: ['stones', 'round', round, 'winner'],
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const side = await fetchWinnerSide(round);
			if (side >= 1 && side <= 5) return side;

			const status = await fetchRoundStatus(round, wagmiConfig);
			if (status === RoundStatusEnum.Settled) {
				const bets = await fetchRoundBets(round, wagmiConfig);
				const withOutcome = bets.find((b) => (b.result ?? 0n) > 0n);
				if (withOutcome !== undefined) return Number(withOutcome.result);
			}

			const cached = queryClient.getQueryData<number>(['stones', 'round', round, 'winner']) ?? 0;
			if (cached >= 1 && cached <= 5 && (status === RoundStatusEnum.ResultReady || status === RoundStatusEnum.SpinRequested || status === RoundStatusEnum.Open))
				return cached;

			const sessionWinner = readVrfWinnerSide(round);
			if (
				sessionWinner >= 1 &&
				sessionWinner <= 5 &&
				(status === RoundStatusEnum.ResultReady || status === RoundStatusEnum.SpinRequested || status === RoundStatusEnum.Open)
			)
				return sessionWinner;

			return 0;
		},
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
