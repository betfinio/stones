import PlayerItem from '@/src/components/BetHistory/PlayerItem.tsx';
import { useRoundBets } from '@/src/lib/query';
import type { FC } from 'react';

const PlayersTab: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);

	return (
		<div className={'flex flex-col gap-2 '}>
			{bets.map((bet) => (
				<PlayerItem round={round} key={bet.player} bet={bet} />
			))}
		</div>
	);
};

export default PlayersTab;
