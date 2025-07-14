import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import { useRoundBank } from '@/src/lib/query';

const BonusAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bank = 0n } = useRoundBank(round);
	return (
		<div className={'text-bonus'}>
			<BetValue value={(bank * 5n) / 100n} withIcon iconClassName={'text-bonus!'} />
		</div>
	);
};

export default BonusAmountCell;
