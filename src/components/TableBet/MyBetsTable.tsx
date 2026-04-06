import { ZeroAddress } from '@betfinio/abi';
import { BetValue, DataTable } from '@betfinio/components/shared';
import { useNavigate } from '@tanstack/react-router';
import { createColumnHelper, type Table } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import BetResult from '@/src/components/TableBet/columns/BetResult.tsx';
import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import RoundActions from '@/src/components/TableBet/columns/RoundActions.tsx';
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
	const tableRef = useRef<Table<StonesBet>>(null);

	const { data: currentRound = 0 } = useCurrentRound();

	const columns = [
		columnHelper.display({
			id: 'round',
			header: t('round'),
			meta: { className: 'w-[100px]' },
			cell: (props) => <RoundCell round={props.row.original.round ?? 0} />,
		}),
		columnHelper.display({
			id: 'myBet',
			header: t('myBet'),
			cell: (props) => <BetValue value={props.row.original.amount} withIcon />,
		}),
		columnHelper.display({
			id: 'betsAmount',
			meta: { className: 'md:table-cell hidden' },
			header: t('betsAmount'),
			cell: (props) => <BetsAmountCell round={props.row.original.round ?? 0} />,
		}),
		columnHelper.display({
			id: 'created',
			header: t('created'),
			meta: { className: 'md:table-cell hidden' },
			cell: (props) => DateTime.fromSeconds(Number(props.row.original.created)).toFormat('yyyy-MM-dd HH:mm:ss'),
		}),
		columnHelper.display({
			id: 'result',
			header: t('result'),
			cell: (props) => <BetResult bet={props.row.original.address} />,
		}),
		columnHelper.display({
			id: 'side',
			header: t('side'),
			cell: (props) => <img src={getStoneImage(props.row.original.side)} alt={'bet'} className={'w-5 h-5'} />,
		}),
		columnHelper.display({
			id: 'winner',
			header: t('winner'),
			cell: (props) => <WinnerCell round={props.row.original.round ?? 0} />,
		}),
		columnHelper.display({
			id: 'actions',
			header: '',
			meta: { className: 'w-[30px]' },
			cell: (props) => <RoundActions round={props.row.original.round ?? 0} />,
		}),
	];

	const handleClick = (row: StonesBet) => {
		navigate({ to: '/games/stones', search: { round: row.round ?? 0 } });
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
