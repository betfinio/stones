import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import { useTotalProbability } from '@/src/lib/query';

const BetsAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: totalProbability = 0n } = useTotalProbability(round);
	return (
		<div>
			<BetValue value={totalProbability} withIcon />
		</div>
	);
};

export default BetsAmountCell;
