import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import type { Address } from 'viem';
import { useBetResult } from '@/src/lib/query';

const BetResult: FC<{ bet: Address }> = ({ bet }) => {
	const { data: result = 0n } = useBetResult(bet);
	return <BetValue value={result} withIcon />;
};

export default BetResult;
