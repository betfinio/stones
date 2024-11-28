import { useRoundBank } from '@/src/lib/query';
import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';

const StakingEarningCell: FC<{ round: number }> = ({ round }) => {
	const { data: bank = 0n } = useRoundBank(round);
	return (
		<div>
			<BetValue value={(bank * 360n) / 10000n} withIcon />
		</div>
	);
};

export default StakingEarningCell;
