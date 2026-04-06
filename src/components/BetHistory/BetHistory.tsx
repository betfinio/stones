import { Tabs, TabsContent, TabsList, TabsTrigger } from '@betfinio/components/ui';
import { useTranslation } from 'react-i18next';
import BetsTab from '@/src/components/BetHistory/BetsTab';
import PlayersTab from '@/src/components/BetHistory/PlayersTab';
import { useCurrentRound } from '@/src/lib/query';

const BetHistory = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'history.tabs' });
	const { data: round = 0 } = useCurrentRound();
	return (
		<div className="w-full flex flex-col">
			<div className="min-h-[300px] lg:h-[650px] p-2 md:p-3 border border-border rounded-lg bg-card">
				<Tabs defaultValue={'bets'} className={''}>
					<TabsList className={'w-full bg-transparent justify-between gap-2 grid grid-cols-2'}>
						<TabsTrigger value={'bets'}>{t('bets')}</TabsTrigger>
						<TabsTrigger value={'players'}>{t('players')}</TabsTrigger>
					</TabsList>
					<TabsContent value={'players'} className={'overflow-hidden'}>
						<PlayersTab round={round} />
					</TabsContent>
					<TabsContent value={'bets'} className={'overflow-hidden'}>
						<BetsTab round={round} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default BetHistory;
