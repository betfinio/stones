import BetItem from '@/src/components/BetHistory/BetItem';
import { useRoundBets } from '@/src/lib/query';
import { motion } from 'framer-motion';
import type { CSSProperties, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FixedSizeList as List } from 'react-window';

const BetsTab: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
		const player = bets[index];
		return (
			<div style={style}>
				<BetItem bet={player} round={round} />
			</div>
		);
	};

	const isMobile = useMediaQuery({ maxWidth: 749 });

	return bets.length > 0 ? (
		<motion.div animate={{ opacity: 100, x: 0 }} initial={{ opacity: 0, x: -100 }} className={'flex flex-col gap-2 '}>
			<List itemCount={bets.length} itemSize={74} width={'100%'} height={isMobile ? 370 : 570}>
				{Row}
			</List>
		</motion.div>
	) : (
		<div className={'items-center flex justify-center text-gray-500'}>No bets yet</div>
	);
};

export default BetsTab;
