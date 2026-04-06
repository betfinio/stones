import { parse } from 'graphql';
import type { ExecutionResult } from 'graphql/execution';
import { useMemo } from 'react';
import type { Address } from 'viem';
import {
	execute,
	StonesPlayerBetsByRoundDocument,
	type StonesPlayerBetsByRoundQuery,
	StonesPlayerBetsDocument,
	type StonesPlayerBetsQuery,
	StonesRoundBetsDocument,
	type StonesRoundBetsQuery,
} from '@/.graphclient';
import logger from '@/src/config/logger';
import { STONES } from '@/src/lib/global';
import { useCurrentRound, useRoundBank, useRoundBets, useSideBank } from '@/src/lib/query';
import type { RoundStatusEnum, StonesBet } from '@/src/lib/types';

/** Keep in sync with schema.graphql StonesRounds — includes cancelled / refunded rounds. */
const StonesRoundsDocument = parse(/* GraphQL */ `
	query StonesRounds($address: Bytes!) {
		rounds(where: { address: $address }, orderBy: round, orderDirection: desc, first: 1000) {
			round
			address
			betsAmount
			betsCount
			totalReceived
			status
			winnerSide
		}
	}
`);

const StonesRoundOutcomeDocument = parse(/* GraphQL */ `
	query StonesRoundOutcome($address: Bytes!, $round: BigInt!) {
		rounds(where: { address: $address, round: $round }, first: 1) {
			winnerSide
		}
		winnerCalculateds(where: { address: $address, round: $round }, first: 1) {
			side
		}
	}
`);

// ═══════════════════════════════════════════════════════════════════════════
// STATUS MAPPING
// ═══════════════════════════════════════════════════════════════════════════

export const mapStatus = (status: string | number): RoundStatusEnum => {
	if (typeof status === 'number') return status as RoundStatusEnum;
	switch (status) {
		case 'open':
			return 1;
		case 'spinning':
			return 2;
		case 'result_ready':
			return 3;
		case 'settled':
			return 4;
		case 'cancelled':
			return 5;
		default:
			return 0;
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// QUERY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const fetchRounds = async (): Promise<{ round: number; winnerSide: number; status: RoundStatusEnum }[]> => {
	logger.start('fetching rounds');
	const data = await execute(StonesRoundsDocument, { address: STONES });
	const rows = (data.data as { rounds?: { round: string | number; winnerSide?: string | number | null; status?: string | number }[] } | undefined)?.rounds;
	logger.success('rounds', rows?.length);
	if (!rows) return [];
	return rows.map((round: any) => ({
		round: Number(round.round),
		winnerSide: Number(round.winnerSide ?? 0),
		status: mapStatus(round.status ?? 0),
	}));
};

export const fetchRoundBetsGql = async (round: number): Promise<StonesBet[]> => {
	logger.start('fetching round bets from subgraph', round);
	const data: ExecutionResult<StonesRoundBetsQuery> = await execute(StonesRoundBetsDocument, { address: STONES, round });
	logger.success('round bets from subgraph', data.data?.bets.length);
	if (!data.data) return [];
	return data.data.bets.map((bet: any) => ({
		player: bet.player as Address,
		address: bet.betAddress as Address,
		amount: BigInt(bet.amount),
		side: Number(bet.side),
		created: BigInt(bet.blockTimestamp),
	}));
};

export const fetchRoundBetsByPlayer = async (round: number, player: Address): Promise<StonesBet[]> => {
	logger.start('fetching round bets by player', round, player);
	const data: ExecutionResult<StonesPlayerBetsByRoundQuery> = await execute(StonesPlayerBetsByRoundDocument, {
		address: STONES,
		round,
		player,
	});
	logger.success('round bets by player', data.data?.bets.length);
	if (!data.data) return [];
	return data.data.bets.map((bet: any) => ({
		player: bet.player as Address,
		address: bet.betAddress as Address,
		amount: BigInt(bet.amount),
		side: Number(bet.side),
		created: BigInt(bet.blockTimestamp),
	}));
};

export const fetchBetsByPlayer = async (player: Address): Promise<StonesBet[]> => {
	logger.start('fetching bets by player', player);
	const data: ExecutionResult<StonesPlayerBetsQuery> = await execute(StonesPlayerBetsDocument, {
		address: STONES,
		player,
	});
	logger.success('bets by player', data.data?.bets.length);
	if (!data.data) return [];
	return data.data.bets.map((bet: any) => ({
		player: bet.player as Address,
		address: bet.betAddress as Address,
		amount: BigInt(bet.amount),
		side: Number(bet.side),
		created: BigInt(bet.blockTimestamp),
		round: Number(bet.round?.round ?? 0),
	}));
};

export const fetchWinnerSide = async (round: number): Promise<number> => {
	logger.start('fetching winner side', round);
	const data = await execute(StonesRoundOutcomeDocument, { address: STONES, round });
	const payload = data.data as
		| {
				winnerCalculateds?: { side: string | number }[];
				rounds?: { winnerSide?: string | number | null }[];
		  }
		| undefined;

	const fromEvent = payload?.winnerCalculateds?.[0]?.side;
	if (fromEvent !== undefined && fromEvent !== null && Number(fromEvent) >= 1 && Number(fromEvent) <= 5) {
		logger.success('winner side', 'winnerCalculated');
		return Number(fromEvent);
	}

	const fromRound = payload?.rounds?.[0]?.winnerSide;
	if (fromRound !== undefined && fromRound !== null && String(fromRound) !== '' && Number(fromRound) >= 1 && Number(fromRound) <= 5) {
		logger.success('winner side', 'round.winnerSide');
		return Number(fromRound);
	}

	logger.success('winner side', 0);
	return 0;
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPUTED HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate potential win for a bet amount on a given side.
 * V2 formula: expectedWin = (myAmount * roundBank) / (mySideBank + myAmount)
 */
export const usePotentialWin = (amount: number, selected: number) => {
	const { data: round = 0 } = useCurrentRound();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bank = 0n } = useRoundBank(round);

	return useMemo(() => {
		if (amount === 0 || selected < 1 || selected > 5) return 0;
		const mySideBank = sideBank[selected - 1];
		const amountWei = BigInt(Math.floor(amount * 1e18));
		const totalBank = bank + amountWei; // bank after my bet is added (net)
		const totalSide = mySideBank + amountWei; // side bank after my bet (gross amounts, but proportional)
		if (totalSide === 0n) return 0;
		return Number((amountWei * totalBank) / totalSide) / 1e18;
	}, [amount, selected, round, sideBank, bank]);
};

/**
 * Get winning bets for a settled round.
 * Uses on-chain payout values directly from bet clones.
 */
export const useWinBets = (round: number): { winBets: StonesBet[] } => {
	const { data: bets = [] } = useRoundBets(round);

	const winBets: StonesBet[] = useMemo(() => {
		return bets
			.filter((bet) => (bet.payout ?? 0n) > 0n)
			.map((bet) => ({
				...bet,
				result: bet.payout ?? 0n,
			}));
	}, [bets]);

	return { winBets };
};
