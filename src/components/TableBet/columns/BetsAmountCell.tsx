import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import { useRoundBank } from '@/src/lib/query';

const BetsAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bank = 0n } = useRoundBank(round);
	return (
		<div>
			<BetValue value={bank} withIcon />
		</div>
	);
};

export default BetsAmountCell;
