export const PvPGameABI = [
	{
		type: 'function',
		name: 'INTERVAL',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getCurrentRoundId',
		inputs: [],
		outputs: [
			{
				name: 'roundId',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getRound',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				name: 'bets',
				type: 'address[]',
				internalType: 'address[]',
			},
			{
				name: 'totalBank',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'totalReceived',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'vrfRequestId',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'status',
				type: 'uint8',
				internalType: 'enum BaseGame.RoundStatus',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'refundRound',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'spin',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'event',
		name: 'BetPlaced',
		inputs: [
			{
				name: 'bet',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'player',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'recipient',
				type: 'address',
				indexed: false,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'amountReceived',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'roundId',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'reserveAmount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'strategy',
				type: 'address',
				indexed: false,
				internalType: 'address',
			},
			{
				name: 'data',
				type: 'bytes',
				indexed: false,
				internalType: 'bytes',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'BetRefunded',
		inputs: [
			{
				name: 'bet',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'player',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'recipient',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'reserveAmount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'BetResolved',
		inputs: [
			{
				name: 'bet',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'player',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'recipient',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'result',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'payout',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'roundId',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RandomnessFulfilled',
		inputs: [
			{
				name: 'requestId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
			{
				name: 'contextId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
			{
				name: 'randomWord',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RandomnessRequested',
		inputs: [
			{
				name: 'requestId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
			{
				name: 'contextId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoundCancelled',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoundSettled',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
			{
				name: 'totalBank',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
			{
				name: 'totalReceived',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoundStarted',
		inputs: [
			{
				name: 'roundId',
				type: 'uint256',
				indexed: true,
				internalType: 'uint256',
			},
			{
				name: 'startedAt',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
] as const;
