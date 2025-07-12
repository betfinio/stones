import type { FC } from 'react';
import { useRoundBets } from '@/src/lib/query';

const BetsCountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	return <div>{bets.length}</div>;
};

export default BetsCountCell;
