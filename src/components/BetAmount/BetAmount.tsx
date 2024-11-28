import { MobileStoneSelect } from '@/src/components/BetAmount/MobileStoneSelect.tsx';
import ProbabilitiesChart from '@/src/components/BetAmount/ProbabilitiesChart.tsx';
import BetRanking from '@/src/components/BetRanking/BetRanking.tsx';
import logger from '@/src/config/logger';
import { getRoundTimes } from '@/src/lib/api';
import { useActualRound, useBetAmount, useCurrentRound, useRoundBank, useRoundStatus, useSideBank, useSideBonusShares } from '@/src/lib/query';
import { usePlaceBet, useSetBetAmount } from '@/src/lib/query/mutations';
import { useSelectedStone } from '@/src/lib/query/state';
import { arrayFrom, valueToNumber } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Button, Slider } from '@betfinio/components/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useBalance } from 'betfinio_app/lib/query/token';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import type { NumberFormatValues } from 'react-number-format/types';
import { useMediaQuery } from 'react-responsive';
import { useAccount } from 'wagmi';
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
	const { data: bonusShares = [0n, 0n, 0n, 0n, 0n] } = useSideBonusShares(round);
	const { data: bank = 0n } = useRoundBank(round);
	const { data: amount = 10000 } = useBetAmount();
	const { mutate: setAmount } = useSetBetAmount();
	const [_, end] = getRoundTimes(round);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const potentialWin = useMemo(() => {
		return ((Number(amount) + valueToNumber(bank)) * 91_4) / 100_0;
	}, [amount, bank]);

	const stoneBank = Number(amount) + valueToNumber(sideBank[selected - 1]) || 1;
	const potentialBonus = useMemo(() => {
		const stoneShares = valueToNumber(bonusShares[selected - 1]);

		const totalShares = stoneShares + stoneBank;
		const myShare = Number(amount);
		return ((((valueToNumber(bank) + Number(amount)) / 100) * 5) / totalShares) * myShare;
	}, [bonusShares[selected - 1], bank, selected, amount, stoneBank]);

	useEffect(() => {
		logger.info('actualRound', actualRound);
	}, [actualRound]);

	const handleSliderChange = (values: number[]) => {
		const value = values[0];
		setBetPercentage(Number(((value / valueToNumber(balance)) * 100).toFixed(2)));
		setAmount(Math.floor(value));
	};

	const handleAmountChange = (valueObj: NumberFormatValues) => {
		const { floatValue = 0 } = valueObj;
		setAmount(floatValue);
		setBetPercentage(Math.min(Number((BigInt(floatValue) * 100n * 10n ** 18n) / balance), 100));
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
				end < Date.now() / 1000 ? (
					<OldRound round={round} />
				) : (
					<div className="flex flex-col items-center space-y-4 px-4">
						{/* Bet Amount Section */}
						{/* Crystal List below Bet Amount Section */}
						<MobileStoneSelect />

						<div className={cx('w-full', balance <= 0n && 'pointer-events-none grayscale')}>
							<span className="text-foreground font-semibold mb-2 block">{t('betAmount')}</span>
							<NumericFormat
								className={cx(
									'text-center bg-background py-3 font-semibold text-sm text-foreground disabled:cursor-not-allowed duration-300 px-4 border border-border rounded-lg p-2 w-full h-10',
									valueToNumber(balance) < Number(amount) && 'text-destructive',
								)}
								thousandSeparator={','}
								min={1}
								allowNegative={false}
								maxLength={15}
								disabled={isPending}
								placeholder={valueToNumber(balance) < Number(amount) ? t('placeholder.balance') : t('placeholder.Amount')}
								value={amount}
								onValueChange={handleAmountChange}
							/>
							<div className="relative mt-4 h-6">
								<Slider min={1000} max={valueToNumber(balance) - 1} value={[amount]} defaultValue={[10000]} onValueChange={handleSliderChange} />

								<div className="flex justify-between text-tertiary-foreground text-xs mt-2">
									<span>0%</span>
									<span className="text-secondary-foreground font-semibold text-sm">{Math.round(betPercentage)}%</span>
									<span>100%</span>
								</div>
							</div>
						</div>

						{/* Button Section */}
						<div className="w-full">
							<Button className={'hover:scale-105 duration-200 transition-all flex gap-1 w-full'} type="button" disabled={isPending} onClick={handleSpin}>
								{isPending ? (
									<LoaderIcon className={'animate-spin'} />
								) : (
									<>
										{t('placeBet')} <BetValue value={Number(potentialWin + potentialBonus)} withIcon iconClassName={'border border-border rounded-full'} />
									</>
								)}
							</Button>
						</div>

						{/* Mini Crystal List below the Button */}
						<div className="flex space-x-2 mt-4 h-10 w-full justify-between items-start">
							{arrayFrom(5).map((crystal, index) => (
								<div
									key={index}
									className={`relative flex items-center justify-center border-1 border-border w-[44px] h-[25px] bg-card rounded-md cursor-pointer hover:scale-110 transition-all ease-in ${
										selected === (crystal + 1) ? 'border-2 border-border' : ''
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
										<div className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-bonus opacity-70 blur-sm z-10 hover:scale-110 transition-all ease-linear" />
									)}
								</div>
							))}
						</div>
					</div>
				)
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
					<div className={cx('flex flex-col h-[110px] w-full max-w-[200px]', balance <= 0n && 'pointer-events-none grayscale')}>
						<span className="text-foreground font-semibold mb-2">{t('betAmount')}</span>
						<div>
							<NumericFormat
								className={cx(
									'text-center bg-background py-3 font-semibold text-sm text-foreground disabled:cursor-not-allowed duration-300 px-4 border border-border rounded-lg p-2 w-full h-[40px]',
									valueToNumber(balance) < Number(amount) && 'text-destructive',
								)}
								thousandSeparator={','}
								min={1}
								allowNegative={false}
								maxLength={15}
								disabled={isPending || balance <= 0n}
								placeholder={valueToNumber(balance) < Number(amount) ? t('placeholder.balance') : t('placeholder.Amount')}
								value={amount}
								onValueChange={handleAmountChange}
							/>
						</div>
						<div className="relative mt-2 h-[24px]">
							<Slider min={1000} max={valueToNumber(balance) - 1} value={[amount]} defaultValue={[10000]} onValueChange={handleSliderChange} />
							<div className="flex justify-between text-tertiary-foreground text-xs mt-2">
								<span>0%</span>
								<span className="text-secondary-foreground font-semibold text-sm">{Math.round(betPercentage)}%</span>
								<span>100%</span>
							</div>
						</div>
					</div>

					{/* Button Section */}
					<div className="flex flex-col items-center w-full max-w-[320px] gap-2">
						<Button
							className={'hover:scale-105 duration-200 transition-all flex gap-1 w-full max-w-[320px] '}
							type="button"
							disabled={isPending || balance <= 0n}
							onClick={handleSpin}
						>
							{isPending ? (
								<LoaderIcon className={'animate-spin'} />
							) : (
								<>
									{t('placeBet')} <BetValue value={Number(potentialWin + potentialBonus)} withIcon iconClassName={'border border-border rounded-full'} />
								</>
							)}
						</Button>

						{/* Crystal List below Bet Amount Section */}
						<div className="grid grid-cols-5 gap-3 w-full ">
							{pie.map((item, index) => (
								<div
									key={index}
									className={`relative flex items-center justify-center px-2 py-1.5 bg-card rounded-md cursor-pointer ${
										selected === item.id ? 'border-2 border-border' : ''
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
			<div className={'w-full border border-border/50 rounded-lg p-4 flex flex-row items-center justify-between'}>
				<div>Round ended {DateTime.fromSeconds(end).toFormat('MM/dd T')}</div>
				<Button onClick={handleClick}>{t('goToCurrentRound')}</Button>
			</div>
			{status > 0 && <BetRanking round={round} />}
		</motion.div>
	);
};

export default BetAmount;
