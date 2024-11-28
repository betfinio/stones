import BetsTab from '@/src/components/BetHistory/BetsTab';
import BonusTab from '@/src/components/BetHistory/BonusTab';
import PlayersTab from '@/src/components/BetHistory/PlayersTab';
import { useCurrentRound } from '@/src/lib/query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@betfinio/components/ui';
import { useTranslation } from 'react-i18next';

const BetHistory = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'history.tabs' });
	const { data: round = 0 } = useCurrentRound();
	return (
		<div className="w-full min-h-[300px] lg:h-[650px] p-2 md:p-3 border border-border rounded-lg bg-card">
			<Tabs defaultValue={'bets'} className={'md:max-w-[350px]'}>
				<TabsList className={'w-full bg-transparent justify-between gap-2 grid grid-cols-3'}>
					<TabsTrigger value={'bets'}>{t('bets')}</TabsTrigger>
					<TabsTrigger value={'players'}>{t('players')}</TabsTrigger>
					<TabsTrigger value={'bonuses'}>{t('bonus')}</TabsTrigger>
				</TabsList>
				<TabsContent value={'players'} className={'overflow-hidden'}>
					<PlayersTab round={round} />
				</TabsContent>
				<TabsContent value={'bets'} className={'overflow-hidden'}>
					<BetsTab round={round} />
				</TabsContent>
				<TabsContent value={'bonuses'} className={'overflow-hidden'}>
					<BonusTab round={round} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default BetHistory;
