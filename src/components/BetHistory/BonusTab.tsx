import BonusItem from '@/src/components/BetHistory/BonusItem';
import { useRoundBets } from '@/src/lib/query';
import { motion } from 'framer-motion';
import type { CSSProperties, FC } from 'react';
import { FixedSizeList as List } from 'react-window';

const BonusTab: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
		const player = bets[index];
		return (
			<div style={style}>
				<BonusItem bet={player} round={round} />
			</div>
		);
	};

	return (
		bets.length > 0 && (
			<motion.div animate={{ opacity: 100, x: 0 }} exit={{ opacity: 0, x: -100 }} initial={{ opacity: 0, x: 100 }} className={'flex flex-col gap-2 '}>
				<List itemCount={bets.length} itemSize={74} width={'100%'} height={570}>
					{Row}
				</List>
			</motion.div>
		)
	);
};

export default BonusTab;
