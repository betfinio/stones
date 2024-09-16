import mockBetSummary from '../../mocks/mockBetSummary.json';
import {useCurrentRound, useRoundBank, useRoundBets} from '@/src/lib/query';
import {BetValue} from 'betfinio_app/BetValue';
import {Stones} from '@betfinio/ui/dist/icons/StoneBet';
import {UserIcon} from 'lucide-react';
import {MoneyHand} from '@betfinio/ui';
import {useTranslation} from 'react-i18next';
import {useAccount} from 'wagmi';
import {ZeroAddress} from '@betfinio/abi'; // Define a type for the icon keys

const BetSummary = () => {
	const { betInfo } = mockBetSummary;
	const { data: round = 0 } = useCurrentRound();
	const { data: bank = 0n } = useRoundBank(round);
	const { data: bets = [] } = useRoundBets(round);
	const { address = ZeroAddress } = useAccount();

	const myBet = bets.reduce((acc, bet) => (bet.player.toLowerCase() === address.toLowerCase() ? acc + bet.amount : acc), 0n);
	const { t } = useTranslation('', { keyPrefix: 'stones.info' });

	return (
		<div className="w-full bg-primaryLight p-4 rounded-lg">
			<div className="flex justify-between mb-4 bg-primary p-2 rounded-lg">
				<div className="flex items-center font-semibold text-yellow-400  flex-row gap-2">
					<BetValue value={bank} />
					<Stones />
				</div>
				<div className="flex items-center font-semibold text-green-400 flex-row gap-2">
					{bets.length}
					<UserIcon className={'w-4 h-4'} />
				</div>
				<div className="flex items-center font-semibold text-blue-400  flex-row gap-2">
					<BetValue value={(bank * 5n) / 100n} />
					<MoneyHand className={'w-4 h-4'} />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 text-sm ">
				{/* Left Box */}
				<div className="bg-primary p-2 rounded-lg flex flex-col items-center">
					<span className="text-gray-500 font-light mb-1">{t('yourBet')}</span>
					<span className=" font-semibold">
						<BetValue value={myBet} withIcon />
					</span>
				</div>

				{/* Right Box */}
				<div className="bg-primary p-2 rounded-lg flex flex-col items-center">
					<span className="text-gray-500 font-light mb-1">{t('potentialWin')}</span>
					<span className="font-semibold text-yellow-400 flex flex-row gap-1">
						<BetValue value={(bank * 9640n) / 10000n} />({(Number((bank * 9640n) / 10000n) / Number(myBet || 1n) || 0).toFixed(2)}x)
					</span>
				</div>
			</div>
		</div>
	);
};

export default BetSummary;
