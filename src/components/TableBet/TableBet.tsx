import AllRoundsTable from '@/src/components/TableBet/AllRoundsTable.tsx';
import MyBetsTable from '@/src/components/TableBet/MyBetsTable.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@betfinio/components/ui';
import { useTranslation } from 'react-i18next';

const TableBet = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'table' });
	return (
		<div className={'w-full'}>
			<Tabs defaultValue={'rounds'}>
				<TabsList>
					<TabsTrigger value={'rounds'}>{t('tabs.rounds')}</TabsTrigger>
					<TabsTrigger value={'bets'}>{t('tabs.bets')}</TabsTrigger>
				</TabsList>
				<TabsContent value={'rounds'}>
					<AllRoundsTable />
				</TabsContent>
				<TabsContent value={'bets'}>
					<MyBetsTable />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TableBet;
