import { DataTable } from '@betfinio/components';
import { useNavigate } from '@tanstack/react-router';
import { createColumnHelper, type Table } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import BetsCountCell from '@/src/components/TableBet/columns/BetsCountCell.tsx';
import RoundCell from '@/src/components/TableBet/columns/RoundCell.tsx';
import WinnerCell from '@/src/components/TableBet/columns/WinnerCell.tsx';
import { useCurrentRound, useRounds } from '@/src/lib/query';

const columnHelper = createColumnHelper<{ round: number }>();

const AllRoundsTable = () => {
	const { data: rounds = [] } = useRounds();
	const { t: tShared } = useTranslation('shared', { keyPrefix: 'tables' });
	const { t } = useTranslation('stones', { keyPrefix: 'table.columns' });
	const navigate = useNavigate();
	const tableRef = useRef<Table<{ round: number }>>(null);
	const { data: currentRound = 0 } = useCurrentRound();

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
			id: 'winner',
			header: t('winner'),
			cell: (props) => <WinnerCell round={props.getValue()} />,
		}),
	];

	const handleClick = (row: { round: number }) => {
		navigate({ to: '/games/stones', search: { round: row.round } });
	};

	useEffect(() => {
		const rowIndex = rounds.findIndex((round) => round.round === currentRound);

		tableRef.current?.setState((state) => {
			return { ...state, rowSelection: { [rowIndex]: true } };
		});
	}, [rounds, currentRound]);

	return <DataTable tableRef={tableRef} columns={columns} data={rounds} onRowClick={handleClick} t={tShared} />;
};

export default AllRoundsTable;
