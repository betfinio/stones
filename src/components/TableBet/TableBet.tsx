import AllRoundsTable from '@/src/components/TableBet/AllRoundsTable.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { useTranslation } from 'react-i18next';

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
