import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import BetsCountCell from '@/src/components/TableBet/columns/BetsCountCell.tsx';
import BonusAmountCell from '@/src/components/TableBet/columns/BonusAmountCell.tsx';
import RoundCell from '@/src/components/TableBet/columns/RoundCell.tsx';
import StakingEarningCell from '@/src/components/TableBet/columns/StakingEarningCell.tsx';
import WinnerCell from '@/src/components/TableBet/columns/WinnerCell.tsx';
import { useRounds } from '@/src/lib/query';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from 'betfinio_app/DataTable';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<{ round: number }>();

const AllRoundsTable = () => {
	const { data: rounds = [] } = useRounds();

	const { t } = useTranslation('', { keyPrefix: 'stones.table.columns' });

	const columns = [
		columnHelper.accessor('round', {
			header: t('round'),
			meta: {
				className: 'h-[50px] w-[100px]',
			},
			cell: (props) => <RoundCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'betsCount',
			header: t('bets'),
			cell: (props) => <BetsCountCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'betsAmount',
			header: t('betsAmount'),
			cell: (props) => <BetsAmountCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'bonus',
			header: t('bonus'),
			cell: (props) => <BonusAmountCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'staking',
			header: t('staking'),
			cell: (props) => <StakingEarningCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'winner',
			header: t('winner'),
			cell: (props) => <WinnerCell round={props.getValue()} />,
		}),
	];

	return <DataTable columns={columns} data={rounds} />;
};

export default AllRoundsTable;