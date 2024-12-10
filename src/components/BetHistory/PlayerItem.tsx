import { ETHSCAN } from '@/src/lib/global';
import { useRoundBank, useRoundBets } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types';
import { truncateEthAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Fox } from '@betfinio/ui';
import { useCustomUsername, useUsername } from 'betfinio_app/lib/query/username';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const PlayerItem: FC<{ bet: StonesBet; round: number; className?: string }> = ({ bet, round, className }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'history' });

	const { data: bank = 0n } = useRoundBank(round);
	const share = Number(bet.amount * 100n) / Number(bank);
	const { data: bets = [] } = useRoundBets(round);
	const { address } = useAccount();
	const betsNumber = bets.filter((b) => b.player === bet.player).length;
	const { data: username } = useUsername(bet.player);
	const { data: customUsername } = useCustomUsername(address, bet.player);
	return (
		<motion.div
			key={bet.player}
			layout
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
			exit={{ opacity: 0, y: 10 }}
			className={cx('rounded-lg flex bg-background justify-between', className)}
		>
			<div className={'py-3 px-2 flex justify-between items-center grow gap-2'}>
				<div className={'flex items-start gap-2.5'}>
					<Fox className={'w-5 h-5'} />
					<div className={'flex flex-col text-tertiary-foreground text-xs gap-2'}>
						<a
							href={`${ETHSCAN}/address/${bet.player}`}
							target={'_blank'}
							className={cx(
								'font-semibold text-sm text-tertiary-foreground hover:underline',
								bet.player.toLowerCase() === address?.toLowerCase() && '!text-secondary-foreground',
							)}
							rel="noreferrer"
						>
							{customUsername || username || truncateEthAddress(bet.player)}
						</a>
						<span className={cx('opacity-0', betsNumber > 0 && 'opacity-100')}>{t('betCount', { count: betsNumber })}</span>
					</div>
				</div>
				<div className={'flex flex-col items-end text-xs gap-2'}>
					<span className={'font-semibold text-sm'}>{share.toFixed(2)}%</span>
					<span>
						<BetValue precision={2} value={bet.amount} withIcon />
					</span>
				</div>
			</div>
		</motion.div>
	);
};

export default PlayerItem;
