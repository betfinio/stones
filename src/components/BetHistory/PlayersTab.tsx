import PlayerItem from '@/src/components/BetHistory/PlayerItem';
import { useRoundBets } from '@/src/lib/query';
import { motion } from 'framer-motion';
import type { CSSProperties, FC } from 'react';
import { FixedSizeList as List } from 'react-window';

const PlayersTab: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
		const player = bets[index];
		return (
			<div style={style}>
				<PlayerItem bet={player} round={round} />
			</div>
		);
	};

	return bets.length > 0 ? (
		<motion.div animate={{ opacity: 100, x: 0 }} initial={{ opacity: 0, x: 100 }} className={'flex flex-col gap-2 '}>
			<List itemCount={bets.length} itemSize={74} width={'100%'} height={570}>
				{Row}
			</List>
		</motion.div>
	) : (
		<div className={'items-center flex justify-center text-gray-500'}>No bets yet</div>
	);
};

export default PlayersTab;
