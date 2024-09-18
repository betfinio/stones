import { useRoundBank } from '@/src/lib/query';
import { BetValue } from 'betfinio_app/BetValue';
import type { FC } from 'react';

const BonusAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bank = 0n } = useRoundBank(round);
	return (
		<div className={'text-blue-400'}>
			<BetValue value={(bank * 5n) / 100n} withIcon iconClassName={'!text-blue-400'} />
		</div>
	);
};

export default BonusAmountCell;
