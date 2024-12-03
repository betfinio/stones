import logger from '@/src/config/logger';
import { PARTNER, STONES } from '@/src/lib/global';
import type { StoneInfo, StonesBet } from '@/src/lib/types';
import { PartnerABI, StonesABI, StonesBetABI, arrayFrom } from '@betfinio/abi';
import type { QueryClient } from '@tanstack/react-query';
import { type Config, multicall, readContract, simulateContract, writeContract } from '@wagmi/core';
import type { Options } from 'betfinio_app/lib/types';
import { type Address, encodeAbiParameters, parseAbiParameters } from 'viem';

export const fetchCurrentRound = async (options: Options): Promise<number> => {
	if (!options.config) throw new Error('Config is required');
	return Number(
		await readContract(options.config, {
			abi: StonesABI,
			address: STONES,
			functionName: 'getCurrentRound',
			args: [],
		}),
	);
};
export const fetchRoundBank = async (round: number, options: Options): Promise<bigint> => {
	if (!options.config) throw new Error('Config is required');
	return (await readContract(options.config, {
		abi: StonesABI,
		address: STONES,
		functionName: 'roundBankBySide',
		args: [BigInt(round), BigInt(0)],
	})) as bigint;
};
export const fetchRoundSideBank = async (round: number, options: Options): Promise<bigint[]> => {
	if (!options.config) throw new Error('Config is required');
	logger.start('fetching round side bank', round);
	const data = await multicall(options.config, {
		contracts: arrayFrom(5).map((_, i) => ({
			address: STONES,
			abi: StonesABI,
			functionName: 'roundBankBySide',
			args: [BigInt(round), BigInt(i + 1)],
		})),
	});
	logger.success('side bank', data.length);
	return data.map((item) => item.result as bigint);
};

export const fetchRoundSideBonusShares = async (round: number, options: Options): Promise<bigint[]> => {
	if (!options.config) throw new Error('Config is required');
	logger.start('fetching round side bonus shares', round);
	const data = await multicall(options.config, {
		contracts: arrayFrom(5).map((_, i) => ({
			address: STONES,
			abi: StonesABI,
			functionName: 'roundBonusSharesBySide',
			args: [BigInt(round), BigInt(i + 1)],
		})),
	});
	logger.success('side bonus shares', data.length);
	return data.map((item) => item.result as bigint);
};
export const fetchRoundSideBetsCount = async (round: number, options: Options): Promise<bigint[]> => {
	if (!options.config) throw new Error('Config is required');
	logger.start('fetching round side bank', round);
	const data = await multicall(options.config, {
		contracts: arrayFrom(5).map((_, i) => ({
			address: STONES,
			abi: StonesABI,
			functionName: 'getRoundBetsCountBySide',
			args: [BigInt(round), BigInt(i + 1)],
		})),
	});
	logger.success('side bank', data.length);
	return data.map((item) => item.result as bigint);
};
export const fetchRoundBets = async (round: number, config: Config): Promise<StonesBet[]> => {
	if (!config) throw new Error('Config is required');
	logger.start('fetching round bets count', round);
	const betsCount = await readContract(config, {
		address: STONES,
		abi: StonesABI,
		functionName: 'getRoundBetsCount',
		args: [BigInt(round)],
	});
	logger.success('betsCount', betsCount);
	logger.start('fetching bets');
	const betsData = await multicall(config, {
		contracts: arrayFrom(Number(betsCount)).map((_, i) => ({
			address: STONES,
			abi: StonesABI,
			functionName: 'roundBets',
			args: [BigInt(round), BigInt(i)],
		})),
	});

	logger.success('bets', betsData.length);
	const bets = betsData.map((bet) => bet.result as Address);
	return await Promise.all(bets.map((bet) => fetchBetInfo(bet, config)));
};

export const fetchBetInfo = async (bet: Address, config: Config): Promise<StonesBet> => {
	if (!config) throw new Error('Config is required');
	const info = (await readContract(config, {
		address: bet,
		abi: StonesBetABI,
		functionName: 'getBetInfo',
	})) as [Address, Address, bigint, bigint, bigint, bigint];
	const side = (await readContract(config, {
		address: bet,
		abi: StonesBetABI,
		functionName: 'getSide',
	})) as bigint;
	return {
		side: Number(side),
		amount: info[2],
		address: bet,
		result: info[3],
		status: info[4],
		created: info[5],
		game: info[1],
		player: info[0],
	} as StonesBet;
};

export const fetchRoundStatus = async (round: number, options: Options): Promise<number> => {
	if (!options.config) throw new Error('Config is required');
	return Number(
		await readContract(options.config, {
			abi: StonesABI,
			address: STONES,
			functionName: 'roundStatus',
			args: [BigInt(round)],
		}),
	);
};
export const fetchDistributedInRound = async (round: number, options: Options): Promise<bigint> => {
	if (!options.config) throw new Error('Config is required');
	return (await readContract(options.config, {
		abi: StonesABI,
		address: STONES,
		functionName: 'distributedInRound',
		args: [BigInt(round)],
	})) as bigint;
};

export const fetchRoundStones = async (round: number, options: Options): Promise<StoneInfo[]> => {
	if (round === 0) return [];
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const probabilities = await multicall(options.config!, {
		contracts: arrayFrom(6).map((_, i) => ({
			abi: StonesABI,
			address: STONES,
			functionName: 'roundProbabilities',
			args: [BigInt(round), BigInt(i)],
		})),
	});
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const banks = await multicall(options.config!, {
		contracts: arrayFrom(6).map((_, i) => ({
			abi: StonesABI,
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

export interface PlaceBetParams {
	amount: number;
	side: number; // 1-5,
	round: number;
}
export const placeBet = async (params: PlaceBetParams, options: Options) => {
	if (!options.config) throw new Error('Config is required');
	const data = encodeAbiParameters(parseAbiParameters('uint256 amount, uint256 side, uint256 round'), [
		BigInt(params.amount),
		BigInt(params.side),
		BigInt(params.round),
	]);
	await simulateContract(options.config, {
		address: PARTNER,
		abi: PartnerABI,
		functionName: 'placeBet',
		args: [STONES, BigInt(params.amount) * 10n ** 18n, data],
	});
	return writeContract(options.config, {
		address: PARTNER,
		abi: PartnerABI,
		functionName: 'placeBet',
		args: [STONES, BigInt(params.amount) * 10n ** 18n, data],
	});
};
export interface SpinParams {
	round: number;
}

export const spin = async (params: SpinParams, options: Options) => {
	if (!options.config) throw new Error('Config is required');
	await simulateContract(options.config, {
		address: STONES,
		abi: StonesABI,
		functionName: 'roll',
		args: [BigInt(params.round)],
	});
	return writeContract(options.config, {
		address: STONES,
		abi: StonesABI,
		functionName: 'roll',
		args: [BigInt(params.round)],
	});
};
export interface DistributeParams {
	round: number;
}

export const distribute = async (params: DistributeParams, options: Options) => {
	if (!options.config) throw new Error('Config is required');

	await simulateContract(options.config, {
		address: STONES,
		abi: StonesABI,
		functionName: 'executeResult',
		args: [BigInt(params.round), 0n, 100n],
	});
	return writeContract(options.config, {
		abi: StonesABI,
		address: STONES,
		functionName: 'executeResult',
		args: [BigInt(params.round), 0n, 100n],
	});
};

export const getRoundTimes = (round: number): number[] => {
	const start = round * 60 * 5;
	const end = start + 60 * 5;
	return [start, end];
};

export const fetchRoundWinner = async (round: number, config: Config): Promise<number> => {
	logger.start('fetching round winner', round);
	const data = await readContract(config, {
		address: STONES,
		abi: StonesABI,
		functionName: 'roundWinnerSide',
		args: [BigInt(round)],
	});
	logger.success('winner', data);

	return Number(data);
};

export const fetchBetResult = async (bet: Address, config: Config): Promise<bigint> => {
	logger.start('fetching bet result', bet);
	const data = (await readContract(config, {
		address: bet,
		abi: StonesBetABI,
		functionName: 'getResult',
		args: [],
	})) as bigint;
	logger.success('result', data);
	return data;
};

export const animateNewBet = (stone: number, strength: number, queryClient: QueryClient, round: number) => {
	queryClient.setQueryData(['stones', 'round', round, 'newBet'], { stone, strength: 0 });
};
