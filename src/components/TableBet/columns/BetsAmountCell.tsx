import { useRoundBank } from '@/src/lib/query';
import { BetValue } from 'betfinio_app/BetValue';
import type { FC } from 'react';

const BetsAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bank = 0n } = useRoundBank(round);
	return (
		<div>
			<BetValue value={bank} withIcon />
		</div>
	);
};

export default BetsAmountCell;
