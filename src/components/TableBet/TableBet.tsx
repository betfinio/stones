import AllRoundsTable from '@/src/components/TableBet/AllRoundsTable.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { useTranslation } from 'react-i18next';
import crystal1 from '../../assets/Roulette/crystal1.svg';
import crystal2 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';

interface TableRow {
	date: string;
	round: string;
	sum: string;
	stone: string;
	winning: string;
	bonus: string;
	transactionId: string;
}

interface MockTableData {
	myBets: TableRow[];
	allRounds: TableRow[];
}

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

const TableBet = () => {
	const { t } = useTranslation('', { keyPrefix: 'stones.table' });
	return (
		<div>
			<Tabs defaultValue={'rounds'}>
				<TabsList>
					<TabsTrigger value={'rounds'}>{t('tabs.rounds')}</TabsTrigger>
					<TabsTrigger value={'bets'}>{t('tabs.bets')}</TabsTrigger>
				</TabsList>
				<TabsContent value={'rounds'}>
					<AllRoundsTable />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TableBet;
