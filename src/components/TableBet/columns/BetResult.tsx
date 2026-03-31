import { cn } from '@betfinio/components';
import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import type { Address } from 'viem';
import { useBetPayout } from '@/src/lib/query';

const BetResult: FC<{ bet: Address }> = ({ bet }) => {
	const { data: payout = 0n } = useBetPayout(bet);
	return <BetValue value={payout} withIcon className={cn(payout > 0n ? 'text-success' : 'text-destructive')} />;
};

export default BetResult;
