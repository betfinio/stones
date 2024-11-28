import { useCurrentRound, useRoundBank, useRoundBets } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Bet, MoneyHand } from '@betfinio/ui';
import { UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const BetSummary = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'info' });

	const { data: round = 0 } = useCurrentRound();
	const { data: bank = 0n } = useRoundBank(round);
	const { data: bets = [] } = useRoundBets(round);
	const { address = ZeroAddress } = useAccount();

	const myBet = bets.reduce((acc, bet) => (bet.player.toLowerCase() === address.toLowerCase() ? acc + bet.amount : acc), 0n);

	const xFactor = myBet === 0n ? 0 : Number((bank * 9640n) / 10000n) / Number(myBet || 1n) || 0;

	const potential = myBet === 0n ? 0 : (bank * 9640n) / 10000n;
	return (
		<div className="w-full bg-card p-4 rounded-lg border border-border">
			<div className="flex justify-between mb-4 bg-background p-2 rounded-lg">
				<div className="flex items-center font-semibold text-secondary-foreground  flex-row gap-2">
					<BetValue value={bank} />
					<Bet className={'text-secondary-foreground w-4 h-4'} />
				</div>
				<div className="flex items-center font-semibold text-success flex-row gap-2">
					{bets.length}
					<UserIcon className={'w-4 h-4'} />
				</div>
				<div className="flex items-center font-semibold text-bonus  flex-row gap-2">
					<BetValue value={(bank * 5n) / 100n} />
					<MoneyHand className={'w-4 h-4'} />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 text-sm ">
				{/* Left Box */}
				<div className="bg-background p-2 rounded-lg flex flex-col items-center">
					<span className="text-tertiary-foreground font-light mb-1">{t('yourBet')}</span>
					<span className=" font-semibold">
						<BetValue value={myBet} withIcon />
					</span>
				</div>

				{/* Right Box */}
				<div className="bg-background p-2 rounded-lg flex flex-col items-center">
					<span className="text-tertiary-foreground font-light mb-1">{t('potentialWin')}</span>
					<span className="font-semibold text-secondary-foreground flex flex-row gap-1">
						<BetValue value={potential} />({xFactor.toFixed(2)}x)
					</span>
				</div>
			</div>
		</div>
	);
};

export default BetSummary;
