import {
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
import { fetchRoundBetsByPlayer, fetchRounds } from '@/src/lib/gql';
import type { StoneInfo, StonesBet } from '@/src/lib/types';
import { useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';
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
