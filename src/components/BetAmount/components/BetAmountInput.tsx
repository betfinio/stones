import { valueToNumber, ZeroAddress } from '@betfinio/abi';
import { type NumberFormatValues, NumericInput, Slider } from '@betfinio/components/ui';
import { useBalance } from 'betfinio_context/lib/query';
import { cx } from 'class-variance-authority';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { useBetAmount } from '@/src/lib/query';
import { usePlaceBet, useSetBetAmount } from '@/src/lib/query/mutations';

const BetAmountInput: FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'controls' });
	const { address = ZeroAddress } = useAccount();
	const { data: balance = 0n } = useBalance(address);
	const [betPercentage, setBetPercentage] = useState(0);
	const { data: amount = 10000 } = useBetAmount();
	const { mutate: setAmount } = useSetBetAmount();
	const { isPending } = usePlaceBet();

	useEffect(() => {
		if (balance > 0n) {
			setBetPercentage(Math.min(Number((parseEther(amount.toString()) * 100n) / balance), 100));
		}
	}, [amount, balance]);

	const handleSliderChange = (values: number[]) => {
		const value = values[0];
		setBetPercentage(Number(((value / valueToNumber(balance)) * 100).toFixed(2)));
		setAmount(Math.floor(value).toString());
	};

	// Логика для определения параметров слайдера в зависимости от баланса
	const sliderParams = useMemo(() => {
		const balanceNumber = valueToNumber(balance);
		if (balanceNumber <= 1000) {
			return {
				min: 0,
				max: 100,
				value: 0,
			};
		}
		return {
			min: 1000,
			max: balanceNumber - 1,
			value: Number(amount),
		};
	}, [balance, amount]);

	const handleAmountChange = (valueObj: NumberFormatValues) => {
		const { value } = valueObj;
		setAmount(value);

		if (balance > 0n) {
			setBetPercentage(Math.min(Number((parseEther(value) * 100n) / balance), 100));
		} else {
			setBetPercentage(0);
		}
	};

	return (
		<div className={cx('w-full', isMobile ? '' : 'flex flex-col h-[110px] w-full max-w-[200px]')}>
			<span className="text-foreground font-semibold mb-2 block">{t('betAmount')}</span>
			<div>
				<NumericInput
					placeholder={t('placeholder.Amount')}
					hasError={valueToNumber(balance) < Number(amount) && address !== ZeroAddress}
					value={amount}
					onValueChange={handleAmountChange}
				/>
			</div>
			<div className={cx('relative mt-2', isMobile ? 'mt-4 h-6' : 'h-[24px]', balance <= 0n && 'grayscale pointer-events-none')}>
				<Slider
					min={sliderParams.min}
					max={sliderParams.max}
					value={[balance > 0n ? sliderParams.value : 0]}
					defaultValue={[sliderParams.value]}
					onValueChange={handleSliderChange}
					disabled={isPending || balance <= 0n}
				/>
				<div className="flex justify-between text-tertiary-foreground text-xs mt-2">
					<span>0%</span>
					<span className="text-secondary-foreground font-semibold text-sm">{Math.round(betPercentage)}%</span>
					<span>100%</span>
				</div>
			</div>
		</div>
	);
};

export default BetAmountInput;
