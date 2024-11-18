import PlayerItem from '@/src/components/BetHistory/PlayerItem';
import { useRoundBets } from '@/src/lib/query';
import { mapBetsToAuthors } from '@/src/lib/utils.ts';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { List } from 'react-virtualized';

const PlayersTab: FC<{ round: number }> = ({ round }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'history.tabs' });
	const { data: bets = [] } = useRoundBets(round);

	const players = useMemo(() => {
		return mapBetsToAuthors([...bets]).sort((a, b) => Number(b.amount - a.amount));
	}, [bets]);

	const renderRow = ({ index, style }) => {
		const player = players[index];
		return (
			<div key={player.player} style={style}>
				<PlayerItem bet={player} round={round} />
			</div>
		);
	};
	console.log(bets, players);

	const isMobile = useMediaQuery({ maxWidth: 749 });
	return bets.length > 0 ? (
		<div className={'flex flex-col gap-2 '}>
			<List
				height={isMobile ? 370 : 570}
				width={1}
				containerStyle={{ width: '100%', maxWidth: '100%' }}
				style={{ width: '100%' }}
				rowCount={players.length}
				rowHeight={74}
				rowRenderer={renderRow}
				overscanRowCount={3}
			/>
		</div>
	) : (
		<div className={'items-center flex justify-center text-gray-500'}>{t('noData')}</div>
	);
};

export default PlayersTab;
