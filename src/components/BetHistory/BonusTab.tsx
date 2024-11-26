import BonusItem from '@/src/components/BetHistory/BonusItem';
import { useRoundBank, useRoundBets } from '@/src/lib/query';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { List } from 'react-virtualized';

const BonusTab: FC<{ round: number }> = ({ round }) => {
	const { data: bets = [] } = useRoundBets(round);
	const { data: totalRoundBank = 0n } = useRoundBank(round);

	const betsWithBonuses = useMemo(() => {
		const BONUS_PERCENTAGE = 5n;
		const PERCENTAGE_BASE = 100n;
		const bonusBank = (totalRoundBank * BONUS_PERCENTAGE) / PERCENTAGE_BASE;

		const betsBySide = bets.reduce((acc, bet) => {
			if (!acc[bet.side]) acc[bet.side] = [];
			acc[bet.side].push(bet);
			return acc;
		}, {});

		const betsWithCalculatedBonuses = [];

		for (const sideBets of Object.values(betsBySide)) {
			sideBets.sort((a, b) => Number(a.created) - Number(b.created));

			let totalBonusShares = 0n;
			let sideBank = 0n;

			const betBonusShares = sideBets.map((bet, index) => {
				const betAmount = BigInt(bet.amount);
				sideBank += betAmount;
				const bonusShare = sideBank;
				totalBonusShares += bonusShare;
				return {
					bet,
					bonusShare,
					betIndex: index,
				};
			});

			for (const { bet, betIndex } of betBonusShares) {
				const adjustedBonusShare = BigInt(bet.amount) * BigInt(sideBets.length - betIndex);
				const potentialBonus = totalBonusShares > 0n ? (adjustedBonusShare * bonusBank) / totalBonusShares : 0n;
				betsWithCalculatedBonuses.push({
					...bet,
					potentialBonus,
				});
			}
		}

		return betsWithCalculatedBonuses;
	}, [bets, totalRoundBank]);

	const renderRow = ({ index, style }) => {
		const player = betsWithBonuses[index];
		return (
			<div key={player.address} style={style}>
				<BonusItem bet={player} round={round} />
			</div>
		);
	};

	const isMobile = useMediaQuery({ maxWidth: 749 });

	return (
		bets.length > 0 && (
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
		)
	);
};

export default BonusTab;
