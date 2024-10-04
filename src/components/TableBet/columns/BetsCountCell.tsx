import { useRoundBets } from '@/src/lib/query';
import type { FC } from 'react';

const BetsCountCell: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	return <div>{bets.length}</div>;
};

export default BetsCountCell;
