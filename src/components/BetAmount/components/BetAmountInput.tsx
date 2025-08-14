import { valueToNumber, ZeroAddress } from '@betfinio/abi';
import { type NumberFormatValues, NumericInput, Slider } from '@betfinio/components/ui';
import { useBalance } from 'betfinio_context/lib/query';
import { cx } from 'class-variance-authority';
import { type FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
			setBetPercentage(Math.min(Number((BigInt(amount) * 100n * 10n ** 18n) / balance), 100));
		}
	}, [amount, balance]);

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

	return (
		<div className={cx('w-full', isMobile ? '' : 'flex flex-col h-[110px] w-full max-w-[200px]', balance <= 0n && 'pointer-events-none grayscale')}>
			<span className="text-foreground font-semibold mb-2 block">{t('betAmount')}</span>
			<div>
				<NumericInput
					className={cx(
						'text-center bg-background py-3 font-semibold text-sm text-foreground disabled:cursor-not-allowed duration-300 px-4 border border-border rounded-lg p-2 w-full',
						isMobile ? 'h-10' : 'h-[40px]',
						valueToNumber(balance) < Number(amount) && 'text-destructive',
					)}
					disabled={isPending}
					placeholder={valueToNumber(balance) < Number(amount) ? t('placeholder.balance') : t('placeholder.Amount')}
					value={amount}
					onValueChange={handleAmountChange}
				/>
			</div>
			<div className={cx('relative mt-2', isMobile ? 'mt-4 h-6' : 'h-[24px]')}>
				<Slider min={1000} max={valueToNumber(balance) - 1} value={[amount]} defaultValue={[10000]} onValueChange={handleSliderChange} />
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
