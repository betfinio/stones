import ProbabilitiesChart from '@/src/components/BetAmount/ProbabilitiesChart.tsx';
import BetRanking from '@/src/components/BetRanking/BetRanking.tsx';
import logger from '@/src/config/logger';
import { getRoundTimes } from '@/src/lib/api';
import { useActualRound, useCurrentRound, useRoundBank, useRoundStatus, useSideBank } from '@/src/lib/query';
import { usePlaceBet } from '@/src/lib/query/mutations';
import { useSelectedStone } from '@/src/lib/query/state';
import { arrayFrom } from '@betfinio/abi';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { BetValue } from 'betfinio_app/BetValue';
import { Button } from 'betfinio_app/button';
import { Input } from 'betfinio_app/input';
import { useBalance } from 'betfinio_app/lib/query/token';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useAccount } from 'wagmi';
import cash from '../../assets/Roulette/cash.svg';
import crystal1 from '../../assets/Roulette/crystal1.svg';
import crystal2 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

const BetAmount = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'controls' });
	const [betPercentage, setBetPercentage] = useState(0);
	const { data: selected, setSelectedStone } = useSelectedStone();
	const { data: round = 0 } = useCurrentRound();
	const { data: actualRound = 0 } = useActualRound();
	const { mutate: placeBet, isPending } = usePlaceBet();
	const { address } = useAccount();
	const { data: balance = 0n } = useBalance(address);
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bank = 0n } = useRoundBank(round);
	const [amount, setAmount] = useState<string>('10000');

	const [_, end] = getRoundTimes(round);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const [potentialWin, setPotentialWin] = useState<bigint>(0n);

	useEffect(() => {
		setPotentialWin(BigInt(amount) * 5n);
	}, [amount]);

	useEffect(() => {
		logger.info('actualRound', actualRound);
	}, [actualRound]);

	const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBetPercentage(Math.min(Number(e.target.value), 100));
		if (e.target.value === '0') {
			setAmount('1000');
			return;
		}
		setAmount(((balance * BigInt(e.target.value)) / 100n / 10n ** 18n).toString());
	};

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
		setBetPercentage(Math.min(Number((BigInt(e.target.value) * 100n * 10n ** 18n) / balance), 100));
	};

	const handleCrystalClick = (crystal: number) => {
		setSelectedStone(crystal);
	};

	const handleSpin = () => {
		placeBet({ amount: Number(amount), side: selected, round: round });
	};
	const isEmpty = bank === 0n;

	const pie = useMemo(() => {
		return [
			{
				id: 1,
				value: isEmpty ? 20 : (Number(sideBank[0]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--topaz-bg))',
				borderColor: 'hsl(var(--topaz-border))',
			},
			{
				id: 2,
				value: isEmpty ? 20 : (Number(sideBank[1]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--zircon-bg))',
				borderColor: 'hsl(var(--zircon-border))',
			},
			{
				id: 3,
				value: isEmpty ? 20 : (Number(sideBank[2]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--citrine-bg))',
				borderColor: 'hsl(var(--citrine-border))',
			},
			{
				id: 4,
				value: isEmpty ? 20 : (Number(sideBank[3]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--emerald-bg))',
				borderColor: 'hsl(var(--emerald-border))',
			},
			{
				id: 5,
				value: isEmpty ? 20 : (Number(sideBank[4]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--ruby-bg))',
				borderColor: 'hsl(var(--ruby-border))',
			},
		];
	}, [sideBank, round]);

	return (
		<div className="w-full">
			{isMobile ? (
				<div className="flex flex-col items-center space-y-4 px-4">
					{/* Bet Amount Section */}
					<div className="w-full ">
						<span className="text-white font-semibold mb-2 block">{t('betAmount')}</span>
						<div className="flex items-center px-4 space-x-2 border border-gray-500 rounded-lg p-2 w-full h-10">
							<img src={cash} alt="cash" className="h-5" />
							<Input className="text-white text-xs border-0 w-full" value={amount} onChange={handleAmountChange} type="number" min={1000} />
						</div>
						<div className="relative mt-2 h-6">
							<div className="w-full bg-gray-700 h-px rounded-full mt-1 relative">
								<div className="absolute bg-yellow-400 h-px rounded-full" style={{ width: `${betPercentage}%` }} />
								<div className="absolute bg-yellow-400 w-2.5 h-2.5 top-[-4px] rounded-full" style={{ left: `calc(${betPercentage}% - 5px)` }} />
								<input
									type="range"
									min="0"
									max="100"
									value={betPercentage}
									onChange={handleSliderChange}
									className="absolute w-full h-px opacity-0 cursor-pointer"
								/>
							</div>
							<div className="flex justify-between text-gray-500 text-xs mt-2">
								<span>0%</span>
								<span className="text-yellow-400 font-semibold text-sm">{betPercentage.toFixed(2)}%</span>
								<span>100%</span>
							</div>
						</div>
					</div>

					{/* Crystal List below Bet Amount Section */}
					<div className="grid grid-cols-5 gap-3 w-full py-6">
						{pie.map((item, index) => (
							<div
								key={index}
								className={`flex flex-col items-center justify-center h-16 border-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in ${selected === item.id ? 'border-yellow-400' : ''}`}
								style={{
									borderColor: item.borderColor,
									backgroundColor: 'rgba(255, 255, 255, 0.05)',
								}}
								onClick={() => handleCrystalClick(item.id)}
							>
								<img src={images[`crystal${index + 1}`]} alt={'stone'} className="h-7 mb-1" />
								<span className="text-white text-sm font-medium tabular-nums">{isEmpty ? 0 : item.value.toFixed(2)}%</span>
							</div>
						))}
					</div>

					{/* Button Section */}
					<div className="w-full">
						<Button className={'hover:scale-105 duration-200 transition-all flex gap-1 w-full'} type="button" disabled={isPending} onClick={handleSpin}>
							{isPending ? (
								<LoaderIcon className={'animate-spin'} />
							) : (
								<>
									{t('placeBet')} <BetValue value={Number(potentialWin)} withIcon iconClassName={'border border-gray-800 rounded-full'} />
								</>
							)}
						</Button>
					</div>

					{/* Mini Crystal List below the Button */}
					<div className="flex space-x-2 mt-4 h-10 w-full justify-between items-start">
						{arrayFrom(5).map((crystal, index) => (
							<div
								key={index}
								className={`relative flex items-center justify-center border-1 border-[#151A2A]  w-[44px] h-[25px] bg-primaryLight rounded-md cursor-pointer hover:scale-110 transition-all ease-in ${
									selected === (crystal + 1) ? 'border-2 border-yellow-400' : ''
								}`}
								onClick={() => handleCrystalClick(crystal + 1)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleCrystalClick(crystal + 1);
									}
								}}
							>
								<img src={images[`crystal${crystal + 1}`]} alt={`crystal-${index}`} className="h-[15px] z-20" />
								{index === 0 && (
									<div className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-blue-500 opacity-70 blur-sm z-10 hover:scale-110 transition-all ease-linear" />
								)}
							</div>
						))}
					</div>
				</div>
			) : end < Date.now() / 1000 ? (
				<OldRound round={round} />
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 w-full"
				>
					<ProbabilitiesChart round={round} pie={pie} />

					{/* Bet Amount Section */}
					<div className={cx('flex flex-col h-[110px] w-full max-w-[200px]')}>
						<span className="text-white font-semibold mb-2">{t('betAmount')}</span>
						<div className="flex items-center px-4 space-x-2 border border-gray-500 rounded-lg p-2 w-full h-[40px]">
							<img src={cash} alt="cash" className="h-[20px]" />
							<Input className="text-white text-[12px] border-0 w-full" value={amount} onChange={handleAmountChange} type="number" min={1000} />
						</div>
						<div className="relative mt-2 h-[24px]">
							<div className="w-full bg-gray-700 h-px rounded-full mt-1 relative">
								<div className="absolute bg-yellow-400 h-px rounded-full" style={{ width: `${betPercentage}%` }} />
								<div className="absolute bg-yellow-400 w-2.5 h-2.5 top-[-4px] rounded-full" style={{ left: `calc(${betPercentage}% - 5px)` }} />
								<input
									type="range"
									min="0"
									max="100"
									value={betPercentage}
									onChange={handleSliderChange}
									className="absolute w-full h-px opacity-0 cursor-pointer"
								/>
							</div>
							<div className="flex justify-between text-gray-500 text-xs mt-2">
								<span>0%</span>
								<span className="text-yellow-400 font-semibold text-sm">{betPercentage.toFixed(2)}%</span>
								<span>100%</span>
							</div>
						</div>
					</div>

					{/* Button Section */}
					<div className="flex flex-col items-center w-full max-w-[320px] gap-2">
						<Button
							className={'hover:scale-105 duration-200 transition-all flex gap-1 w-full max-w-[320px] '}
							type="button"
							disabled={isPending}
							onClick={handleSpin}
						>
							{isPending ? (
								<LoaderIcon className={'animate-spin'} />
							) : (
								<>
									{t('placeBet')} <BetValue value={Number(potentialWin)} withIcon iconClassName={'border border-gray-800 rounded-full'} />
								</>
							)}
						</Button>

						{/* Crystal List below Bet Amount Section */}
						<div className="grid grid-cols-5 gap-3 w-full ">
							{pie.map((item, index) => (
								<div
									key={index}
									className={`relative flex items-center justify-center px-2 py-1.5 bg-primaryLight rounded-md cursor-pointer ${
										selected === item.id ? 'border-2 border-yellow-400' : ''
									}`}
									onClick={() => handleCrystalClick(item.id)}
									tabIndex={0}
									role="button"
								>
									<img src={images[`crystal${item.id}`]} alt={`crystal-${index}`} className="h-[15px] z-20" />
								</div>
							))}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

const OldRound: FC<{ round: number }> = ({ round }) => {
	const [_, end] = getRoundTimes(round);
	const { data: actualRound = 0 } = useActualRound();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: status = 0 } = useRoundStatus(round);

	const handleClick = () => {
		navigate({ to: '/stones', search: { round: actualRound } });
		queryClient.invalidateQueries({ queryKey: ['stones', 'currentRound'] });
	};
	const { t } = useTranslation('stones', { keyPrefix: 'oldRound' });

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<div className={'w-full border border-yellow-400/50 rounded-lg p-4 flex flex-row items-center justify-between'}>
				<div>Round ended {DateTime.fromSeconds(end).toFormat('MM/dd T')}</div>
				<Button onClick={handleClick}>{t('goToCurrentRound')}</Button>
			</div>
			{status > 0 && <BetRanking round={round} />}
		</motion.div>
	);
};

export default BetAmount;
