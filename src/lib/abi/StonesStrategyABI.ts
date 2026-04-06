export const StonesStrategyABI = [
	{
		type: 'function',
		name: 'roundBank',
		inputs: [{ name: 'roundId', type: 'uint256', internalType: 'uint256' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'sideBanks',
		inputs: [
			{ name: 'roundId', type: 'uint256', internalType: 'uint256' },
			{ name: 'side', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'sideProbabilities',
		inputs: [
			{ name: 'roundId', type: 'uint256', internalType: 'uint256' },
			{ name: 'side', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'totalProbability',
		inputs: [{ name: 'roundId', type: 'uint256', internalType: 'uint256' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getBetsCount',
		inputs: [{ name: 'roundId', type: 'uint256', internalType: 'uint256' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getRoundBet',
		inputs: [
			{ name: 'roundId', type: 'uint256', internalType: 'uint256' },
			{ name: 'index', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [
			{
				name: '',
				type: 'tuple',
				internalType: 'struct StonesStrategy.StonesBet',
				components: [
					{ name: 'betAddress', type: 'address', internalType: 'address' },
					{ name: 'recipient', type: 'address', internalType: 'address' },
					{ name: 'amount', type: 'uint256', internalType: 'uint256' },
					{ name: 'side', type: 'uint256', internalType: 'uint256' },
				],
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'NUM_SIDES',
		inputs: [],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'MAX_BETS_PER_ROUND',
		inputs: [],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
] as const;
