export const CoreBetABI = [
	{
		type: 'function',
		name: 'bet',
		inputs: [
			{ name: 'player', type: 'address', internalType: 'address' },
			{ name: 'recipient', type: 'address', internalType: 'address' },
			{ name: 'game', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
			{ name: 'data', type: 'bytes', internalType: 'bytes' },
			{ name: 'partner', type: 'address', internalType: 'address' },
		],
		outputs: [{ name: 'betAddress', type: 'address', internalType: 'address' }],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'getGameConfig',
		inputs: [{ name: 'game', type: 'address', internalType: 'address' }],
		outputs: [
			{
				name: 'config',
				type: 'tuple',
				internalType: 'struct ICore.GameConfig',
				components: [
					{ name: 'gameType', type: 'uint8', internalType: 'enum ICore.GameType' },
					{ name: 'liquidityPool', type: 'address', internalType: 'address' },
					{ name: 'rtpBps', type: 'uint256', internalType: 'uint256' },
					{ name: 'feeBps', type: 'uint256', internalType: 'uint256' },
					{ name: 'gameManager', type: 'address', internalType: 'address' },
					{ name: 'managerFeeBps', type: 'uint256', internalType: 'uint256' },
					{ name: 'maxReserve', type: 'uint256', internalType: 'uint256' },
					{ name: 'registered', type: 'bool', internalType: 'bool' },
				],
			},
		],
		stateMutability: 'view',
	},
] as const;
