import BetItem from '@/src/components/BetHistory/BetItem';
import { useRoundBets } from '@/src/lib/query';
import type { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { List } from 'react-virtualized';

const BetsTab: FC<{ round: number }> = ({ round }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'history.tabs' });
	const { data: bets = [] } = useRoundBets(round);

	const renderRow = ({ index, style }: { index: number; style: CSSProperties }) => {
		const bet = bets[index];
		return (
			<div key={bet.address} style={style}>
				<BetItem bet={bet} round={round} />
			</div>
		);
	};

	const isMobile = useMediaQuery({ maxWidth: 749 });

	return bets.length > 0 ? (
		<div className={'flex flex-col gap-2 '}>
			<List
				height={isMobile ? 370 : 570}
				width={1}
				containerStyle={{ width: '100%', maxWidth: '100%' }}
				style={{ width: '100%' }}
				rowCount={bets.length}
				rowHeight={74}
				rowRenderer={renderRow}
				overscanRowCount={3}
			/>
		</div>
	) : (
		<div className={'items-center flex justify-center text-tertiary-foreground'}>{t('noData')}</div>
	);
};

export default BetsTab;
