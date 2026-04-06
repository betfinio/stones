import { ZeroAddress } from '@betfinio/abi';
import { Bet } from '@betfinio/components/icons';
import { BetValue } from '@betfinio/components/shared';
import { UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { FeeNotice } from '@/src/components/FeeNotice';
import { useCurrentRound, useRoundBank, useRoundBets, useTotalProbability } from '@/src/lib/query';

const BetSummary = () => {
	const { t } = useTranslation('stones', { keyPrefix: 'info' });

	const { data: round = 0 } = useCurrentRound();
	const { data: totalProbability = 0n } = useTotalProbability(round);
	const { data: roundBank = 0n } = useRoundBank(round);
	const { data: bets = [] } = useRoundBets(round);
	const { address = ZeroAddress } = useAccount();

	const myBet = bets.reduce((acc, bet) => (bet.player.toLowerCase() === address.toLowerCase() ? acc + bet.amount : acc), 0n);

	// V2: full roundBank (already net of Core fee) is distributed proportionally
	const xFactor = myBet === 0n ? 0 : Number(roundBank) / Number(myBet || 1n) || 0;
	const potential = myBet === 0n ? 0n : roundBank;

	return (
		<div className="w-full bg-card p-4 rounded-lg border border-border">
			<div className="flex justify-between mb-4 bg-background p-2 rounded-lg">
				<div className="flex items-center font-semibold text-secondary-foreground flex-row gap-2">
					<BetValue value={totalProbability} />
					<Bet className={'text-secondary-foreground w-4 h-4'} />
				</div>
				<div className="flex items-center font-semibold text-success flex-row gap-2">
					{bets.length}
					<UserIcon className={'w-4 h-4'} />
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

			<div className="mt-3 pt-3 border-t border-border">
				<FeeNotice className="text-xs text-muted-foreground py-0 leading-snug [&_strong]:text-foreground [&_a]:text-primary" />
			</div>
		</div>
	);
};

export default BetSummary;
