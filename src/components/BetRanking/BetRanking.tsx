import { useDistributedInRound, useRoundBank, useRoundBets, useRoundWinner } from '@/src/lib/query';
import { truncateEthAddress } from '@betfinio/abi';
import { Stones } from '@betfinio/ui/dist/icons/StoneBet';
import { BetValue } from 'betfinio_app/BetValue';
import { Button } from 'betfinio_app/button';
import { UserIcon } from 'lucide-react';
import type { FC } from 'react';
import bronzeTrophy from '../../assets/BetHistory/trophy-bronze.svg';
import goldTrophy from '../../assets/BetHistory/trophy-gold.svg';
import silverTrophy from '../../assets/BetHistory/trophy-silver.svg';
import figureImage from '../../assets/BetRanking/duck-winner.png';
import crystalImage from '../../assets/Roulette/crystal1.svg'; // Substitua pelo caminho correto
import mockBetRankingData from '../../mocks/mockBetRanking.json';

const BetRanking: FC<{ round: number }> = ({ round }) => {
	const { ranking } = mockBetRankingData;

	const { data: bank = 0n } = useRoundBank(round);
	const { data: bets = [] } = useRoundBets(round);
	const { data: winner = 0 } = useRoundWinner(round);
	const { data: distributed = 0n } = useDistributedInRound(round);

	const winBets = bets
		.filter((bet) => bet.side === winner)
		.sort((a, b) => Number(b.amount) - Number(a.amount))
		.slice(0, 4);

	const trophyImages: string[] = [goldTrophy, silverTrophy, bronzeTrophy];

	const getTrophyImage = (badge: number): string | undefined => {
		if (trophyImages[badge]) {
			return trophyImages[badge];
		}
		return undefined;
	};

	const handleDistribute = () => {
		alert('ok');
	};

	const winBank = (bank * 914n) / 1000n;
	const bonusBank = (bank * 5n) / 100n;

	return (
		<>
			<div className="flex flex-col md:flex-row w-full space-x-2 items-center justify-around my-8 px-2 gap-8">
				{/* Left Side */}
				<div className="flex w-full max-w-[380px] h-full items-center justify-around rounded-xl border-2 border-yellow-400">
					<div className="flex flex-col justify-center items-center space-y-2">
						<div className="flex flex-col w-full items-center space-y-2">
							<img src={crystalImage} alt="Crystal" className="h-15 w-12" />
							<div className="flex flex-col items-center">
								<div className="flex flex-row gap-2 items-center text-yellow-400 text-sm font-semibold">
									<BetValue value={bank} withIcon /> total bank
								</div>
								<div className="flex items-center text-gray-400 text-[12px] font-semibold">
									<span className="mr-1">{bets.length} bets</span>
									<UserIcon className={'w-4 h-4'} />
								</div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="flex w-full items-center justify-center text-white text-[24px] font-semibold">WIN!</div>
							<div className="flex items-center w-full text-yellow-400 font-semibold flex-row gap-1 justify-center">
								<BetValue value={winBank} />
								<Stones />
							</div>
							<div className="text-blue-500 flex items-center justify-center text-xs mt-1 font-semibold gap-1">
								<BetValue prefix={'Bonus: '} value={bonusBank} withIcon iconClassName={'!text-blue-500 !w-3 !h-3'} />
								BONUS
							</div>
						</div>
					</div>
					<img src={figureImage} alt="Figure" className="h-[223px] w-[133px]" />
				</div>

				{/* Right Side - Ranking List */}
				<div className="w-full flex flex-col space-y-2">
					{/* Header */}
					<div className="flex justify-between text-gray-400 text-[12px] px-4 py-2">
						<div className="w-[25%]">№</div>
						<div className="w-[43%]">Bet</div>
						<div className="w-[22%]">Win</div>
						<div className="w-[22%]">Bonus</div>
					</div>

					{/* Rows */}
					{winBets.map((row, index) => (
						<div
							key={index}
							className={`flex items-center h-10 px-4 rounded-lg relative overflow-hidden ${
								index === 0
									? 'bg-gradient-to-r from-yellow-400/50 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(255,223,0,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
									: index === 1
										? 'bg-gradient-to-r from-gray-300/20 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(192,192,192,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
										: index === 2
											? 'bg-gradient-to-r from-orange-600/50 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(205,127,50,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
											: index % 2 === 0
												? 'bg-primaryLight'
												: 'bg-transparent'
							} hover:bg-[#282c46] transition-all duration-300`}
						>
							<div className="flex items-center w-[25%]">
								<span className="mr-2 text-[12px]">#{index + 1}</span>
								{getTrophyImage(index) && <img src={getTrophyImage(index)} alt="trophy" className="h-4 inline-block mr-2" />}
							</div>
							<div className="flex items-center w-[43%] space-x-2">
								<span className="text-xs">{truncateEthAddress(row.address)}</span>
							</div>
							<div className="flex items-center w-[22%] gap-1 text-yellow-400 font-semibold">
								<BetValue value={row.result} />
								<Stones className={'w-4 h-4'} />
							</div>
							<div className="flex items-center w-[22%] gap-1 text-blue-400 font-semibold">
								<BetValue value={row.result} />
								<Stones className={'w-4 h-4'} />
							</div>
						</div>
					))}
				</div>
			</div>
			{distributed !== bonusBank + winBank && (
				<div className={'border border-red-500/30 rounded-lg px-4 p-4 flex justify-between items-center'}>
					Payout was not distributed
					<Button onClick={handleDistribute}>Distribute</Button>
				</div>
			)}
		</>
	);
};

export default BetRanking;
