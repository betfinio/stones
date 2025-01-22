import {
	AllRoundsDocument,
	type AllRoundsQuery,
	PlayerBetsByRoundDocument,
	type PlayerBetsByRoundQuery,
	PlayerBetsDocument,
	type PlayerBetsQuery,
	execute,
} from '@/.graphclient';
import logger from '@/src/config/logger';
import { STONES } from '@/src/lib/global.ts';
import { useCurrentRound, useRoundBank, useRoundBets, useSideBank, useSideBonusShares } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types.ts';
import { valueToNumber } from '@betfinio/abi';
import type { ExecutionResult } from 'graphql/execution';
import { useMemo } from 'react';
import type { Address } from 'viem';

export const fetchRounds = async (): Promise<{ round: number }[]> => {
	logger.start('fetching rounds');
	const data: ExecutionResult<AllRoundsQuery> = await execute(AllRoundsDocument, { count: 100 });
	logger.success('rounds', data.data?.roundStarts.length);
	if (!data.data) return [];
	return data.data.roundStarts.map((round) => ({ round: Number(round.round) }));
};

export const fetchRoundBetsByPlayer = async (round: number, player: Address): Promise<StonesBet[]> => {
	logger.start('fetching round bets by player', round, player);
	const data: ExecutionResult<PlayerBetsByRoundQuery> = await execute(PlayerBetsByRoundDocument, { round, player });
	logger.success('round bets by player', data.data?.betCreateds.length);
	if (!data.data) return [];
	return populateStonesBet(data.data);
};

export const fetchBetsByPlayer = async (player: Address): Promise<StonesBet[]> => {
	logger.start('fetching bets by player', player);
	const data: ExecutionResult<PlayerBetsQuery> = await execute(PlayerBetsDocument, { player });
	logger.success('bets by player', data.data?.betCreateds.length);
	if (!data.data) return [];
	return populateStonesBet(data.data);
};

export const usePotentialWinWithBonus = (amount: number, selected: number) => {
	const { data: round = 0 } = useCurrentRound();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bonusShares = [0n, 0n, 0n, 0n, 0n] } = useSideBonusShares(round);
	return useMemo(() => {
		const stoneBank = valueToNumber(sideBank[selected - 1]);
		const bank = valueToNumber(sideBank.reduce((acc, val) => acc + val, 0n));
		const stoneShares = valueToNumber(bonusShares[selected - 1]);
		const totalShares = stoneShares + stoneBank + amount;
		if (amount === 0) return { bonus: 0, win: 0 };
		return {
			win: (((amount + bank) * 0.914) / (stoneBank + amount)) * amount,
			bonus: (((bank + amount) * 0.05) / totalShares) * amount,
		};
	}, [amount, selected, round, sideBank, bonusShares]);
};
export const useBetsWithPossibleWinAndBonus = (round: number, winner: number): { winBets: StonesBet[] } => {
	const { data: bank = 0n } = useRoundBank(round);
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: sideBonusShares = [0n, 0n, 0n, 0n, 0n] } = useSideBonusShares(round);
	const { data: bets = [] } = useRoundBets(round);

	const winBank = (bank * 914n) / 1000n;
	const bonusBank = (bank * 5n) / 100n;
	const winnerSideBank = sideBank[winner - 1];
	const winnerSideBonusShares = sideBonusShares[winner - 1];

	const winBets: StonesBet[] = useMemo(() => {
		if (winner === 0) return [];
		// Filter bets by winner side
		const filteredBets = bets.filter((bet) => bet.side === winner);
		// Sort bets by created timestamp
		const sortedWinBets = filteredBets.sort((a, b) => Number(a.created) - Number(b.created));

		// Calculate result and bonus for each bet
		return sortedWinBets.map((bet, index) => {
			const betAmount = BigInt(bet.amount);
			const bonusShare = betAmount * BigInt(sortedWinBets.length - index);
			// Calculate result and bonus
			const result = winnerSideBank > 0n ? (betAmount * winBank) / winnerSideBank : 0n;
			const bonus = winnerSideBonusShares > 0n ? (bonusShare * bonusBank) / winnerSideBonusShares : 0n;
			return {
				...bet,
				bonus,
				result,
			};
		});
	}, [bets, winner, winBank, bonusBank]);

	return { winBets: winBets };
};

export const populateStonesBet = (data: PlayerBetsQuery): StonesBet[] => {
	return data.betCreateds.map(
		(bet) =>
			({
				side: Number(bet.side),
				player: bet.player,
				order: Number(bet.order),
				game: STONES,
				round: Number(bet.round.round),
				amount: BigInt(bet.amount),
				address: bet.bet,
				created: bet.blockTimestamp,
			}) as StonesBet,
	);
};
