import { ZeroAddress } from '@betfinio/abi';
import { BetValue, DataTable } from '@betfinio/components/shared';
import { useNavigate } from '@tanstack/react-router';
import { type ColumnDef, createColumnHelper, type Table } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import BetResult from '@/src/components/TableBet/columns/BetResult.tsx';
import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import RoundCell from '@/src/components/TableBet/columns/RoundCell.tsx';
import WinnerCell from '@/src/components/TableBet/columns/WinnerCell.tsx';
import { useCurrentRound, usePlayerBets } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types.ts';
import { getStoneImage } from '@/src/lib/utils.ts';

const columnHelper = createColumnHelper<StonesBet>();

const MyBetsTable = () => {
	const { address = ZeroAddress } = useAccount();
	const { data: rounds = [] } = usePlayerBets(address);
	const { t } = useTranslation('stones', { keyPrefix: 'table.columns' });
	const { t: tShared } = useTranslation('shared', { keyPrefix: 'tables' });
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
		columnHelper.accessor('amount', {
			id: 'myBet',
			header: t('myBet'),
			cell: (props) => <BetValue value={props.getValue()} withIcon />,
		}),
		columnHelper.accessor('round', {
			id: 'betsAmount',
			meta: {
				className: 'md:table-cell hidden',
			},
			header: t('betsAmount'),
			cell: (props) => <BetsAmountCell round={props.getValue()} />,
		}),
		columnHelper.accessor('created', {
			id: 'created',
			header: t('created'),
			meta: {
				className: 'md:table-cell hidden',
			},
			cell: (props) => DateTime.fromSeconds(Number(props.getValue())).toFormat('yyyy-MM-dd HH:mm:ss'),
		}),
		columnHelper.accessor('result', {
			header: t('result'),
			cell: (props) => <BetResult bet={props.row.original.address} />,
		}),
		columnHelper.accessor('side', {
			header: t('side'),
			cell: (props) => <img src={getStoneImage(props.getValue())} alt={'bet'} className={'w-5 h-5'} />,
		}),
		columnHelper.accessor('round', {
			id: 'winner',
			header: t('winner'),
			cell: (props) => <WinnerCell round={props.getValue()} />,
		}),
	] as ColumnDef<StonesBet>[];

	const handleClick = (row: { round: number }) => {
		navigate({ to: '/games/stones', search: { round: row.round } });
	};

	useEffect(() => {
		const rowIndex = rounds.findIndex((round) => round.round === currentRound);

		tableRef.current?.setState((state) => {
			return { ...state, rowSelection: { [rowIndex]: true } };
		});
	}, [rounds, currentRound]);

	return <DataTable columns={columns} data={rounds} onRowClick={handleClick} t={tShared} />;
};

export default MyBetsTable;
