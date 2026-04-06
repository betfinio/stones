import { cn } from '@betfinio/components/lib';
import { Link } from '@tanstack/react-router';
import type { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useStonesFee } from '@/src/lib/query';

export const FeeNotice: FC<{ className?: string }> = ({ className }) => {
	const { data } = useStonesFee();
	const { t } = useTranslation('stones');

	if (!data) return null;

	const feePercent = Number(data.feeBps) / 100;

	return (
		<div className={cn('text-center text-sm text-muted-foreground py-2', className)}>
			<Trans
				t={t}
				i18nKey="feeStaking"
				values={{ fee: feePercent }}
				components={{
					b: <strong className="text-foreground font-medium" />,
					pool: <Link to="/staking/liquidity-pool" className="underline hover:opacity-80" />,
				}}
			/>
		</div>
	);
};
