import { arrayFrom } from '@betfinio/abi';
import type { QueryClient } from '@tanstack/react-query';
import { type Config, readContract, simulateContract, writeContract } from '@wagmi/core';
import { type Address, decodeAbiParameters, encodeAbiParameters, parseAbiParameters, parseEther } from 'viem';
import { multicall } from 'viem/actions';
import logger from '@/src/config/logger';
import { BetABI } from '@/src/lib/abi/BetABI';
import { CoreBetABI } from '@/src/lib/abi/CoreBetABI';
import { PvPGameABI } from '@/src/lib/abi/PvPGameABI';
import { StonesStrategyABI } from '@/src/lib/abi/StonesStrategyABI';
import { CORE, PARTNER, STONES, STONES_STRATEGY } from '@/src/lib/global';
import type { StoneInfo, StonesBet } from '@/src/lib/types';

// ═══════════════════════════════════════════════════════════════════════════
// WRITE OPERATIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface PlaceBetParams {
	amount: number;
	side: number; // 1-5
	round: number;
	player: Address;
}

export const placeBet = async (params: PlaceBetParams, config: Config) => {
	const data = encodeAbiParameters(parseAbiParameters('uint256 roundId, uint256 side'), [BigInt(params.round), BigInt(params.side)]);
	const { request } = await simulateContract(config, {
		abi: CoreBetABI,
		address: CORE,
		functionName: 'bet',
		args: [params.player, params.player, STONES, parseEther(params.amount.toString()), data, PARTNER],
	});
	return writeContract(config, request);
};

export interface SpinParams {
	round: number;
}

export const spin = async (params: SpinParams, config: Config) => {
	const { request } = await simulateContract(config, {
		abi: PvPGameABI,
		address: STONES,
		functionName: 'spin',
		args: [BigInt(params.round)],
	});
	return writeContract(config, request);
};

// ═══════════════════════════════════════════════════════════════════════════
// READ OPERATIONS — PvPGame
// ═══════════════════════════════════════════════════════════════════════════

export const fetchCurrentRound = async (config: Config): Promise<number> => {
	return Number(
		await readContract(config, {
			abi: PvPGameABI,
			address: STONES,
			functionName: 'getCurrentRoundId',
		}),
	);
};

export const fetchInterval = async (config: Config): Promise<number> => {
	return Number(
		await readContract(config, {
			abi: PvPGameABI,
			address: STONES,
			functionName: 'INTERVAL',
		}),
	);
};

export const fetchRoundStatus = async (round: number, config: Config): Promise<number> => {
	const roundInfo = (await readContract(config, {
		abi: PvPGameABI,
		address: STONES,
		functionName: 'getRound',
		args: [BigInt(round)],
	})) as [Address[], bigint, bigint, bigint, number];
	return roundInfo[4];
};

export const fetchRoundBets = async (round: number, config: Config): Promise<StonesBet[]> => {
	logger.start('fetching round bets', round);
	const roundInfo = (await readContract(config, {
		abi: PvPGameABI,
		address: STONES,
		functionName: 'getRound',
		args: [BigInt(round)],
	})) as [Address[], bigint, bigint, bigint, number];

	const betAddresses = roundInfo[0];
	if (betAddresses.length === 0) return [];

	// Multicall: player, amount, data, payout, result for each bet
	const prepared = betAddresses.flatMap((bet) => [
		{ abi: BetABI, address: bet, functionName: 'player' as const },
		{ abi: BetABI, address: bet, functionName: 'amount' as const },
		{ abi: BetABI, address: bet, functionName: 'data' as const },
		{ abi: BetABI, address: bet, functionName: 'payout' as const },
		{ abi: BetABI, address: bet, functionName: 'result' as const },
	]);

	const result = await multicall(config.getClient(), {
		contracts: prepared as any,
	});

	const stride = 5;
	const bets: StonesBet[] = [];
	for (let i = 0; i < betAddresses.length; i++) {
		const player = (result[i * stride].result as Address) ?? ('0x0' as Address);
		const amount = (result[i * stride + 1].result as bigint) ?? 0n;
		const data = (result[i * stride + 2].result as `0x${string}`) ?? '0x';
		const payout = (result[i * stride + 3].result as bigint) ?? 0n;
		const betResult = (result[i * stride + 4].result as bigint) ?? 0n;

		let side = 0;
		if (data && data !== '0x') {
			try {
				const decoded = decodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], data);
				side = Number(decoded[1]);
			} catch {
				side = 0;
			}
		}

		bets.push({
			player,
			address: betAddresses[i],
			amount,
			side,
			created: 0n,
			payout,
			result: betResult,
		});
	}

	logger.success('round bets', bets.length);
	return bets;
};

// ═══════════════════════════════════════════════════════════════════════════
// READ OPERATIONS — StonesStrategy
// ═══════════════════════════════════════════════════════════════════════════

// should be used as a display of round bank since not affected by fee deduction
export const fetchTotalProbability = async (round: number, config: Config): Promise<bigint> => {
	return (await readContract(config, {
		abi: StonesStrategyABI,
		address: STONES_STRATEGY,
		functionName: 'totalProbability',
		args: [BigInt(round)],
	})) as bigint;
};

export const fetchRoundBank = async (round: number, config: Config): Promise<bigint> => {
	return (await readContract(config, {
		abi: StonesStrategyABI,
		address: STONES_STRATEGY,
		functionName: 'roundBank',
		args: [BigInt(round)],
	})) as bigint;
};

export const fetchRoundSideBank = async (round: number, config: Config): Promise<bigint[]> => {
	logger.start('fetching round side bank', round);
	const data = await multicall(config.getClient(), {
		contracts: arrayFrom(5).map((_, i) => ({
			address: STONES_STRATEGY,
			abi: StonesStrategyABI,
			functionName: 'sideBanks' as const,
			args: [BigInt(round), BigInt(i + 1)],
		})),
	});
	logger.success('side bank', data.length);
	return data.map((item) => (item.result as bigint) ?? 0n);
};

export const fetchRoundStones = async (round: number, config: Config): Promise<StoneInfo[]> => {
	if (round === 0) return [];

	const [probResults, totalProb] = await Promise.all([
		multicall(config.getClient(), {
			contracts: arrayFrom(5).map((_, i) => ({
				address: STONES_STRATEGY,
				abi: StonesStrategyABI,
				functionName: 'sideProbabilities' as const,
				args: [BigInt(round), BigInt(i + 1)],
			})),
		}),
		readContract(config, {
			abi: StonesStrategyABI,
			address: STONES_STRATEGY,
			functionName: 'totalProbability',
			args: [BigInt(round)],
		}) as Promise<bigint>,
	]);

	const sideBanks = await fetchRoundSideBank(round, config);

	return arrayFrom(5).map((_, i) => {
		const prob = (probResults[i].result as bigint) ?? 0n;
		return {
			bank: sideBanks[i],
			probability: prob,
			round,
			side: i + 1,
			totalProbability: totalProb,
		};
	});
};

// ═══════════════════════════════════════════════════════════════════════════
// READ OPERATIONS — Bet clone
// ═══════════════════════════════════════════════════════════════════════════

export const fetchBetInfo = async (bet: Address, config: Config): Promise<StonesBet> => {
	const [player, amount, data] = await Promise.all([
		readContract(config, { abi: BetABI, address: bet, functionName: 'player' }) as Promise<Address>,
		readContract(config, { abi: BetABI, address: bet, functionName: 'amount' }) as Promise<bigint>,
		readContract(config, { abi: BetABI, address: bet, functionName: 'data' }) as Promise<`0x${string}`>,
	]);

	let side = 0;
	if (data && data !== '0x') {
		try {
			const decoded = decodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], data);
			side = Number(decoded[1]);
		} catch {
			side = 0;
		}
	}

	return { player, address: bet, amount, side, created: 0n };
};

export const fetchBetResult = async (bet: Address, config: Config): Promise<bigint> => {
	return (await readContract(config, {
		abi: BetABI,
		address: bet,
		functionName: 'result',
	})) as bigint;
};

export const fetchBetPayout = async (bet: Address, config: Config): Promise<bigint> => {
	return (await readContract(config, {
		abi: BetABI,
		address: bet,
		functionName: 'payout',
	})) as bigint;
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

let cachedInterval: number | null = null;

export const getInterval = async (config: Config): Promise<number> => {
	if (cachedInterval !== null) return cachedInterval;
	cachedInterval = await fetchInterval(config);
	return cachedInterval;
};

export const getRoundTimes = (round: number, interval: number): number[] => {
	const start = round * interval;
	const end = start + interval;
	return [start, end];
};

export const getActualRound = (interval: number): number => {
	return Math.floor(Date.now() / 1000 / interval);
};

export const animateNewBet = (stone: number, _strength: number, queryClient: QueryClient, round: number) => {
	queryClient.setQueryData(['stones', 'round', round, 'newBet'], { stone, strength: 0 });
};
