import type { Address } from 'viem';

export interface StonesBet {
	player: Address;
	address: Address; // bet clone address
	amount: bigint;
	side: number; // 1-5
	created: bigint; // blockTimestamp
	result?: bigint; // win amount (computed or from contract)
	payout?: bigint;
	round?: number;
	game?: Address;
	status?: number;
}

export interface StoneInfo {
	round: number;
	side: number;
	bank: bigint;
	probability: bigint;
	totalProbability: bigint;
}

export enum RoundStatusEnum {
	None = 0,
	Open = 1,
	SpinRequested = 2,
	ResultReady = 3,
	Settled = 4,
	Cancelled = 5,
}

export type StonesAuthor = StonesBet & {
	betsNumber: number;
};
