import avatarImage from '../../assets/BetHistory/fox.svg'; // Substitua pelo caminho correto
import bronzeTrophy from '../../assets/BetHistory/trophy-bronze.svg';
import goldTrophy from '../../assets/BetHistory/trophy-gold.svg';
import silverTrophy from '../../assets/BetHistory/trophy-silver.svg';
import figureImage from '../../assets/BetRanking/affiliate.png';
import userIcon from '../../assets/BetRanking/user.svg'; // Ícone de usuário
import cashBlueIcon from '../../assets/BetTable/cash-blue.svg'; // Ícone de cash blue
import cashIcon from '../../assets/Roulette/cash.svg'; // Ícone de cash
import crystalImage from '../../assets/Roulette/crystal1.svg'; // Substitua pelo caminho correto
import mockBetRankingData from '../../mocks/mockBetRanking.json';

const BetRanking = () => {
	const { victoryDetails, ranking } = mockBetRankingData;

	const trophyImages: { [key: string]: string } = {
		gold: goldTrophy,
		silver: silverTrophy,
		bronze: bronzeTrophy,
	};

	const getTrophyImage = (badge: string | undefined): string | undefined => {
		if (badge && trophyImages[badge]) {
			return trophyImages[badge];
		}
		return undefined;
	};

	return (
		<div className="flex flex-col md:flex-row w-full space-x-2 items-center justify-around mt-16 mb-8 px-2 gap-16">
			{/* Left Side */}
			<div className="flex w-full max-w-[380px] h-full items-center justify-around rounded-xl border-2 border-yellow-500">
				<div className="flex flex-col justify-center items-center space-y-2">
					<div className="flex flex-col w-full items-center space-y-2">
						<img src={crystalImage} alt="Crystal" className="h-[60px] w-[51.3px]" />
						<div className="flex flex-col items-center">
							<span className="flex flex-col items-center text-yellow-500 text-[12px] font-semibold">{victoryDetails.totalBets} Total bets</span>
							<div className="flex items-center text-gray-400 text-[12px] font-semibold">
								<span className="mr-1">{victoryDetails.totalUsers} users</span>
								<img src={userIcon} alt="Users" className="h-[13px]" />
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="flex w-full items-center justify-center text-white text-[24px] font-bold">WIN!</div>
						<div className="flex items-center w-full text-yellow-500 font-bold">
							<span className="text-[20px]">{victoryDetails.winAmount}</span>
							<img src={cashIcon} alt="Cash" className="h-[20px] ml-1" />
						</div>
						<div className="text-[#00ACE7] flex items-center justify-center text-[12px] mt-1 font-semibold">{victoryDetails.bonusAmount} BONUS</div>
					</div>
				</div>
				<img src={figureImage} alt="Figure" className="h-[223px] w-[133px]" />
			</div>

			{/* Right Side - Ranking List */}
			<div className="w-full flex flex-col space-y-2">
				{/* Header */}
				<div className="flex justify-between text-gray-400 text-[12px] px-4 py-2">
					<div className="w-[25%]">№</div>
					<div className="w-[43%]">Players</div>
					<div className="w-[22%]">To be won</div>
					<div className="w-[22%]">Bonus</div>
				</div>

				{/* Rows */}
				{ranking.map((row, index) => (
					<div
						key={index}
						className={`flex items-center h-[40px] px-4 rounded-lg   relative overflow-hidden ${
							row.badge === 'gold'
								? 'bg-gradient-to-r from-[#e5b10875] via-[#131624] to-transparent shadow-[inset_0_0_0_1px_rgba(255,223,0,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
								: row.badge === 'silver'
									? 'bg-gradient-to-r from-[#989fab49] via-[#131624] to-transparent shadow-[inset_0_0_0_1px_rgba(192,192,192,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
									: row.badge === 'bronze'
										? 'bg-gradient-to-r from-[#f48e3b63] via-[#131624] to-transparent shadow-[inset_0_0_0_1px_rgba(205,127,50,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
										: index % 2 === 0
											? 'bg-[#131624]'
											: 'bg-transparent'
						} hover:bg-[#282c46] transition-all duration-300`}
					>
						<div className="flex items-center w-[25%]">
							<span className="mr-2 text-[12px]">#{row.position}</span>
							{getTrophyImage(row.badge) && <img src={getTrophyImage(row.badge) as string} alt={row.badge} className="h-[16px] inline-block mr-2" />}
						</div>
						<div className="flex items-center w-[43%] space-x-2">
							<img src={avatarImage} alt={`Avatar of ${row.player}`} className="h-[20px]" />
							<span className="text-[12px]">{row.player}</span>
						</div>
						<div className="flex items-center w-[22%] text-yellow-500 font-semibold">
							<span className="text-[12px]">{row.toBeWon}</span>
							<img src={cashIcon} alt="Cash" className="h-[16px] ml-2" />
						</div>
						<div className="flex items-center w-[22%] text-blue-400 font-semibold">
							<span className="text-[12px]">{row.bonus}</span>
							<img src={cashBlueIcon} alt="Cash Blue" className="h-[16px] ml-2" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BetRanking;
