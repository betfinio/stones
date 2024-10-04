import BetResult from '@/src/components/TableBet/columns/BetResult.tsx';
import BetsAmountCell from '@/src/components/TableBet/columns/BetsAmountCell.tsx';
import RoundCell from '@/src/components/TableBet/columns/RoundCell.tsx';
import WinnerCell from '@/src/components/TableBet/columns/WinnerCell.tsx';
import { usePlayerBets } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types.ts';
import { getStoneImage } from '@/src/lib/utils.ts';
import { ZeroAddress } from '@betfinio/abi';
import { useNavigate } from '@tanstack/react-router';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BetValue } from 'betfinio_app/BetValue';
import { DataTable } from 'betfinio_app/DataTable';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const columnHelper = createColumnHelper<StonesBet>();

const MyBetsTable = () => {
	const { address = ZeroAddress } = useAccount();
	const { data: rounds = [] } = usePlayerBets(address);
	const { t } = useTranslation('', { keyPrefix: 'stones.table.columns' });
	const navigate = useNavigate();

	const columns: ColumnDef<StonesBet, never>[] = [
		columnHelper.accessor('round', {
			header: t('round'),
			meta: {
				className: 'h-[50px] w-[100px]',
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
	];

	const handleClick = (row: { round: number }) => {
		navigate({ to: '/stones', search: { round: row.round } });
	};

	return <DataTable columns={columns} data={rounds} onRowClick={handleClick} />;
};

export default MyBetsTable;
