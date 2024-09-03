import { encodeAbiParameters, parseAbiParameters } from 'viem';
import type { Options } from 'betfinio_app/lib/types';
import { readContract, writeContract } from '@wagmi/core';
import { PARTNER, STONES } from '@/src/lib/global.ts';
import { PartnerContract, StonesContract } from '@betfinio/abi';

export const fetchCurrentRound = async (options: Options): Promise<number> => {
	return Number(
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		await readContract(options.config!, {
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
