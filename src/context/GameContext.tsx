import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

// Configura a URL base para todas as requisições do axios
axios.defaults.baseURL = 'http://localhost:6000';

interface GameData {
	id: string;
	winningPool: number;
	bonusPool: number;
	countdown: number;
	items: Array<{
		id: string;
		price: number;
	}>;
}

interface BetContextType {
	gameData: GameData | null;
	players: any[];
	bankBalance: number;
	transaction: any | null;
	earnings: any | null;
	roundBalance: any | null;
	isWinner: boolean;
	placeBet: (betData: any) => Promise<void>;
	startGame: () => Promise<void>;
	fetchTransactionById: (id: string) => Promise<void>;
	fetchEarningsByPlayerId: (playerId: string) => Promise<void>;
	fetchRoundBalanceByRoundId: (roundId: string) => Promise<void>;
}

const GameContext = createContext<BetContextType | undefined>(undefined);

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGameContext must be used within a GameProvider');
	}
	return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameData, setGameData] = useState<GameData | null>(null);
	const [players, setPlayers] = useState([]);
	const [bankBalance, setBankBalance] = useState(0);
	const [transaction, setTransaction] = useState<any | null>(null);
	const [earnings, setEarnings] = useState<any | null>(null);
	const [roundBalance, setRoundBalance] = useState<any | null>(null);
	const [isWinner, setIsWinner] = useState(false);

	const fetchGameData = async () => {
		try {
			const gameResponse = await axios.get('/api/game');
			const playersResponse = await axios.get('/api/players');
			const balanceResponse = await axios.get('/api/balance');

			setGameData(gameResponse.data);
			setPlayers(playersResponse.data);
			setBankBalance(balanceResponse.data);
		} catch (error) {
			console.error('Failed to fetch game data:', error);
		}
	};

	const fetchTransactionById = async (id: string) => {
		try {
			const response = await axios.get(`/api/transaction/${id}`);
			setTransaction(response.data);
		} catch (error) {
			console.error('Failed to fetch transaction:', error);
		}
	};

	const fetchEarningsByPlayerId = async (playerId: string) => {
		try {
			const response = await axios.get(`/api/earnings/${playerId}`);
			setEarnings(response.data);
		} catch (error) {
			console.error('Failed to fetch earnings:', error);
		}
	};

	const fetchRoundBalanceByRoundId = async (roundId: string) => {
		try {
			const response = await axios.get(`/api/roundbalance/${roundId}`);
			setRoundBalance(response.data);
		} catch (error) {
			console.error('Failed to fetch round balance:', error);
		}
	};

	const placeBet = async (betData: any) => {
		try {
			await axios.post('/api/bet', betData);
			fetchGameData(); // Update game data after placing a bet
		} catch (error) {
			console.error('Failed to place bet:', error);
		}
	};

	const startGame = async () => {
		try {
			await axios.post('/api/start');
			fetchGameData(); // Update game data after starting a game
		} catch (error) {
			console.error('Failed to start game:', error);
		}
	};

	useEffect(() => {
		fetchGameData();
	}, []);

	return (
		<GameContext.Provider
			value={{
				gameData,
				players,
				bankBalance,
				transaction,
				earnings,
				roundBalance,
				isWinner,
				placeBet,
				startGame,
				fetchTransactionById,
				fetchEarningsByPlayerId,
				fetchRoundBalanceByRoundId,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
