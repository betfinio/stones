import { AllRoundsDocument, type AllRoundsQuery, execute } from '@/.graphclient';
import logger from '@/src/config/logger';
import type { ExecutionResult } from 'graphql/execution';

export const fetchRounds = async (): Promise<{ round: number }[]> => {
	logger.start('fetching rounds');
	const data: ExecutionResult<AllRoundsQuery> = await execute(AllRoundsDocument, { count: 100 });
	logger.success('rounds', data.data?.roundStarts.length);
	if (!data.data) return [];
	return data.data.roundStarts.map((round) => ({ round: Number(round.round) }));
};
