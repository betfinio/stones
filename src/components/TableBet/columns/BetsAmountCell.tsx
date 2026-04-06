import { BetValue } from '@betfinio/components/shared';
import type { FC } from 'react';
import { useRoundTotalBankFromGame, useTotalProbability } from '@/src/lib/query';

const BetsAmountCell: FC<{ round: number }> = ({ round }) => {
	const { data: totalProbability = 0n } = useTotalProbability(round);
	const { data: pvpTotalBank = 0n } = useRoundTotalBankFromGame(round);
	const displayTotal = totalProbability > 0n ? totalProbability : pvpTotalBank;
	return (
		<div>
			<BetValue value={displayTotal} withIcon />
		</div>
	);
};

export default BetsAmountCell;
