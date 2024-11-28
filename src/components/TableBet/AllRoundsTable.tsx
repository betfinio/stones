import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import BetsCountCell from '@/src/components/TableBet/columns/BetsCountCell.tsx';
import BonusAmountCell from '@/src/components/TableBet/columns/BonusAmountCell.tsx';
import RoundCell from '@/src/components/TableBet/columns/RoundCell.tsx';
import StakingEarningCell from '@/src/components/TableBet/columns/StakingEarningCell.tsx';
import WinnerCell from '@/src/components/TableBet/columns/WinnerCell.tsx';
import { useRounds } from '@/src/lib/query';
import { DataTable } from '@betfinio/components/shared';
import { useNavigate } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<{ round: number }>();

const AllRoundsTable = () => {
	const { data: rounds = [] } = useRounds();
	const { t } = useTranslation('stones', { keyPrefix: 'table.columns' });
	const navigate = useNavigate();

	const columns = [
		columnHelper.accessor('round', {
			header: t('round'),
			meta: {
				className: 'w-[100px]',
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
			meta: {
				className: 'md:table-cell hidden',
			},
			cell: (props) => <BonusAmountCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'staking',
			header: t('staking'),
			meta: {
				className: 'md:table-cell hidden',
			},
			cell: (props) => <StakingEarningCell round={props.getValue()} />,
		}),
		columnHelper.accessor('round', {
			id: 'winner',
			header: t('winner'),
			cell: (props) => <WinnerCell round={props.getValue()} />,
		}),
	];

	const handleClick = (row: { round: number }) => {
		navigate({ to: '/stones', search: { round: row.round } });
	};

	return <DataTable columns={columns} data={rounds} onRowClick={handleClick} />;
};

export default AllRoundsTable;
