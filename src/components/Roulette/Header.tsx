import { useCurrentRound, useRoundBank } from '@/src/lib/query';
import { BetValue } from '@betfinio/components/shared';
import { Separator } from '@betfinio/components/ui';
import { useChatbot } from 'betfinio_app/chatbot';
import { CircleAlert, TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { data: round = 0 } = useCurrentRound();
	const { data: bank = 0n } = useRoundBank(round);
	const { t } = useTranslation('stones', { keyPrefix: 'header' });
	const { maximize } = useChatbot();

	const handleReport = useCallback(() => {
		maximize();
	}, []);
	return (
		<div className="flex w-full justify-between items-center bg-card text-foreground p-4 rounded-lg border border-border h-[80px]">
			<div className="flex items-center justify-between gap-4">
				<div className="flex flex-col items-start">
					<span className="text-sm lg:text-base">{t('roundId')}</span>
					<span className="text-sm  font-semibold text-tertiary-foreground">#{round}</span>
				</div>
				<Separator orientation={'vertical'} className={'h-8'} />
				<div className="flex flex-col items-start">
					<span className=" font-semibold text-secondary-foreground text-sm lg:text-base">{t('winningPool')}</span>
					<span className="text-sm font-semibold">
						<BetValue value={bank} withIcon iconClassName={'w-3 h-3'} />
					</span>
				</div>
				<Separator orientation={'vertical'} className={'h-8'} />
				<div className="flex-col items-start hidden md:flex">
					<span className=" font-semibold text-bonus">{t('bonusPool')}</span>
					<span className="text-sm  font-semibold">
						<BetValue value={(bank * 5n) / 100n} withIcon iconClassName={'w-3 h-3'} />
					</span>
				</div>
			</div>
			<div className="flex items-center space-x-6">
				<a
					href={'https://betfin.gitbook.io/betfin-public/games-guide/stones'}
					target={'_blank'}
					rel="noreferrer"
					className="flex flex-col items-center cursor-pointer hover:text-secondary-foreground"
				>
					<CircleAlert className={'w-6 h-6'} />
					<span className="hidden lg:block text-xs">{t('howToPlay')}</span>
				</a>
				<div className="flex flex-col items-center cursor-pointer hover:text-secondary-foreground" onClick={handleReport}>
					<TriangleAlert className={'w-6 h-6'} />
					<span className="hidden lg:block text-xs">{t('report')}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
