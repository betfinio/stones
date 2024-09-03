import { useCurrentRound, useSpin } from '@/src/lib/query';
import { Button } from 'betfinio_app/button';
import { Input } from 'betfinio_app/input';
import { useBalance } from 'betfinio_app/lib/query/token';
import { type ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';
import cash from '../../assets/Roulette/cash.svg';
import crystal2 from '../../assets/Roulette/crystal1.svg';
import crystal1 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';
import betData from '../../mocks/mockBetAmount.json';

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

const BetAmount = () => {
	const [betPercentage, setBetPercentage] = useState(0);
	const [selectedCrystal, setSelectedCrystal] = useState<string | null>(null);

	const { data: round = 0 } = useCurrentRound();
	const { mutate: spin } = useSpin();
	const { address } = useAccount();
	const { data: balance = 0n } = useBalance(address);
	const [amount, setAmount] = useState<string>('10000');

	const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBetPercentage(Number(e.target.value));
		setAmount(((balance * BigInt(e.target.value)) / 100n / 10n ** 18n).toString());
	};

	const handleCrystalClick = (crystal: string) => {
		setSelectedCrystal(crystal);
	};

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
		setBetPercentage(Math.min((Number(e.target.value) * 100) / Number((balance / 10n ** 18n).toString()), 100));
	};

	const handleSpin = () => {
		spin({ amount: Number(amount), side: 1, round: round });
	};

	return (
		<div className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 p-4 w-full">
			{/* Bet Amount Section */}
			<div className="flex flex-col h-[110px] w-full md:w-[244px] max-w-[300px]">
				<span className="text-white font-semibold mb-2">Bet amount</span>
				<div className="flex items-center px-4 space-x-2 border border-gray-500 rounded-lg p-2 w-full h-[40px]">
					<img src={cash} alt="cash" className="h-[20px]" />
					<Input className="text-white text-[12px] border-0" value={amount} onChange={handleAmountChange} type={'number'} min={0} />
				</div>
				<div className="relative mt-2 h-[24px]">
					<div className="w-full bg-gray-700 h-[2px] rounded-full mt-1 relative">
						<div className="absolute bg-yellow-500 h-[2px] rounded-full" style={{ width: `${betPercentage}%` }} />
						<div className="absolute bg-yellow-500 w-[10px] h-[10px] top-[-4px] rounded-full" style={{ left: `calc(${betPercentage}% - 5px)` }} />
						<input
							type="range"
							min="0"
							max="100"
							value={betPercentage}
							onChange={handleSliderChange}
							className="absolute w-full h-[2px] opacity-0 cursor-pointer"
						/>
					</div>
					<div className="flex justify-between text-gray-500 text-[11px] mt-2">
						<span>0%</span>
						<span className="text-yellow-500 font-semibold text-[14px]">{betPercentage.toFixed(2)}%</span>
						<span>100%</span>
					</div>
				</div>
			</div>

			{/* Button Section */}
			<div className="flex flex-col items-center w-full md:w-[224px] max-w-[300px]">
				<Button className={'hover:scale-105'} type="button" onClick={handleSpin}>
					{betData.buttonText}
				</Button>
				<div className="flex space-x-1 mt-4 h-[25px] w-full justify-center items-start">
					{betData.crystals.map((crystal, index) => (
						<div
							key={index}
							className={`relative flex items-center justify-center border-1 border-[#151A2A]  w-[44px] h-[25px] bg-primaryLight rounded-md cursor-pointer hover:scale-110 transition-all ease-in ${
								selectedCrystal === crystal ? 'border-2 border-yellow-500' : ''
							}`}
							onClick={() => handleCrystalClick(crystal)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleCrystalClick(crystal);
								}
							}}
							tabIndex={0}
							role="button"
						>
							<img src={images[crystal]} alt={`crystal-${index}`} className="h-[15px] z-20" />
							{index === 0 && (
								<div className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-blue-500 opacity-70 blur-sm z-10 hover:scale-110 transition-all ease-linear" />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BetAmount;
