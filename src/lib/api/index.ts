import { PARTNER, STONES } from '@/src/lib/global.ts';
import type { StoneInfo } from '@/src/lib/types.ts';
import { PartnerContract, StonesContract, arrayFrom } from '@betfinio/abi';
import { multicall, readContract, writeContract } from '@wagmi/core';
import type { Options } from 'betfinio_app/lib/types';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

export const fetchCurrentRound = async (options: Options): Promise<number> => {
	if (!options.config) throw new Error('Config is required');
	return Number(
		await readContract(options.config, {
			abi: StonesContract.abi,
			address: STONES,
			functionName: 'getCurrentRound',
			args: [],
		}),
	);
};
export const fetchRoundBank = async (round: number, options: Options): Promise<bigint> => {
	return (
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		(await readContract(options.config!, {
			abi: StonesContract.abi,
			address: STONES,
			functionName: 'roundBankBySide',
			args: [BigInt(round), BigInt(0)],
		})) as bigint
	);
};

export const fetchRoundStones = async (round: number, options: Options): Promise<StoneInfo[]> => {
	if (round === 0) return [];
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const probabilities = await multicall(options.config!, {
		contracts: arrayFrom(6).map((_, i) => ({
			abi: StonesContract.abi,
			address: STONES,
			functionName: 'roundProbabilities',
			args: [BigInt(round), BigInt(i)],
		})),
	});
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const banks = await multicall(options.config!, {
		contracts: arrayFrom(6).map((_, i) => ({
			abi: StonesContract.abi,
			address: STONES,
			functionName: 'roundBankBySide',
			args: [BigInt(round), BigInt(i)],
		})),
	});
	return arrayFrom(5).map(
		(_, i) =>
			({
				bank: banks[i + 1].result as bigint,
				probability: probabilities[i + 1].result as bigint,
				round,
				side: i + 1,
				totalProbability: probabilities[0].result as bigint,
			}) as StoneInfo,
	);
};

export interface SpinParams {
	amount: number;
	side: number; // 1-5,
	round: number;
}
export const spin = async (params: SpinParams, options: Options) => {
	const data = encodeAbiParameters(parseAbiParameters('uint256 amount, uint256 side, uint256 round'), [
		BigInt(params.amount),
		BigInt(params.side),
		BigInt(params.round),
	]);

	// biome-ignore lint/style/noNonNullAssertion: should be there
	return writeContract(options.config!, {
		address: PARTNER,
		abi: PartnerContract.abi,
		functionName: 'placeBet',
		args: [STONES, BigInt(params.amount) * 10n ** 18n, data],
	});
};

export const getRoundTimes = (round: number): number[] => {
	const start = round * 60 * 10;
	const end = start + 60 * 10;
	return [start, end];
};
