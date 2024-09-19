import { AllRoundsDocument, type AllRoundsQuery, PlayerBetsDocument, type PlayerBetsQuery, execute } from '@/.graphclient';
import logger from '@/src/config/logger';
import { STONES } from '@/src/lib/global.ts';
import type { StonesBet } from '@/src/lib/types.ts';
import type { ExecutionResult } from 'graphql/execution';
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
	const data: ExecutionResult<PlayerBetsQuery> = await execute(PlayerBetsDocument, { round, player });
	logger.success('round bets by player', data.data?.betCreateds.length);
	if (!data.data) return [];
	console.log(data);
	return populateStonesBet(data.data);
};

export const populateStonesBet = (data: PlayerBetsQuery): StonesBet[] => {
	return data.betCreateds.map(
		(bet) =>
			({
				side: Number(bet.side),
				player: bet.player,
				order: Number(bet.order),
				game: STONES,
				amount: BigInt(bet.amount),
				address: bet.bet,
			}) as StonesBet,
	);
};
