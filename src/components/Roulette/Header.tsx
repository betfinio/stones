import { useCurrentRound, useRoundBank } from '@/src/lib/query';
import { BetValue } from 'betfinio_app/BetValue';
import { Separator } from 'betfinio_app/separator';
import { CircleAlert, TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {useChatbot} from "betfinio_app/chatbot";

const Header = () => {
	const { data: round = 0 } = useCurrentRound();
	const { data: bank = 0n } = useRoundBank(round);
	const { t } = useTranslation('stones', { keyPrefix: 'header' });
	const { maximize } = useChatbot();

	const handleReport = useCallback(() => {
		maximize();
	}, []);
	return (
		<div className="flex w-full justify-between items-center bg-primaryLight text-white p-4 rounded-lg border border-gray-800 h-[80px]">
			<div className="flex items-center justify-between gap-4">
				<div className="flex flex-col items-start">
					<span className="text-sm lg:text-base">{t('roundId')}</span>
					<span className="text-sm  font-semibold text-gray-400">#{round}</span>
				</div>
				<Separator orientation={'vertical'} className={'bg-gray-500 h-8'} />
				<div className="flex flex-col items-start">
					<span className=" font-semibold text-yellow-400 text-sm lg:text-base">{t('winningPool')}</span>
					<span className="text-sm font-semibold">
						<BetValue value={bank} withIcon iconClassName={'w-3 h-3'} />
					</span>
				</div>
				<Separator orientation={'vertical'} className={'bg-gray-500 h-8'} />
				<div className="flex-col items-start hidden md:flex">
					<span className=" font-semibold text-blue-500">{t('bonusPool')}</span>
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
					className="flex flex-col items-center cursor-pointer hover:text-yellow-400"
				>
					<CircleAlert className={'w-6 h-6'} />
					<span className="hidden lg:block text-xs">{t('howToPlay')}</span>
				</a>
				<div className="flex flex-col items-center cursor-pointer hover:text-yellow-400" onClick={handleReport}>
					<TriangleAlert className={'w-6 h-6'} />
					<span className="hidden lg:block text-xs">{t('report')}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
