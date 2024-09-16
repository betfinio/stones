import type {BetInterface} from 'betfinio_app/lib/types';

export interface StoneInfo {
	round: number;
	side: number;
	bank: bigint;
	probability: bigint;
	totalProbability: bigint;
}

export interface StonesBet extends BetInterface {
	side: number;
}
