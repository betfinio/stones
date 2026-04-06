import { cn } from '@betfinio/components';
import { Fox } from '@betfinio/components/icons';
import { BetValue } from '@betfinio/components/shared';
import { useUsername } from 'betfinio_context/lib/query';
import { cx } from 'class-variance-authority';
import { MoveRightIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { ETHSCAN } from '@/src/lib/global';
import { useRoundBets, useTotalProbability } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types';

const PlayerItem: FC<{ bet: StonesBet; round: number; className?: string }> = ({ bet, round, className }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'history' });
	const { data: totalProbability = 0n } = useTotalProbability(round);
	const share = totalProbability === 0n ? 0 : Number(bet.amount * 100n) / Number(totalProbability);
	const { data: bets = [] } = useRoundBets(round);
	const { address } = useAccount();
	const betsNumber = bets.filter((b) => b.player === bet.player).length;
	const { data: username } = useUsername(bet.player, address);
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
								bet.player.toLowerCase() === address?.toLowerCase() && 'text-secondary-foreground!',
							)}
							rel="noreferrer"
						>
							{username}
						</a>
						<span className={cx('opacity-0', betsNumber > 0 && 'opacity-100')}>{t('betCount', { count: betsNumber })}</span>
					</div>
				</div>
				<div className={'flex flex-col items-end text-xs gap-2'}>
					<span className={'font-semibold text-sm'}>{share.toFixed(2)}%</span>
					<div className={'flex gap-2 items-center'}>
						<span>
							<BetValue iconClassName={'size-3'} precision={2} value={bet.amount} withIcon className="w-2" />
						</span>
						<MoveRightIcon
							className={cn('size-3', {
								hidden: [0, 1].includes(bet.status ?? 0),
							})}
						/>

						<span
							className={cn({
								hidden: [0, 1].includes(bet.status ?? 0),
							})}
						>
							<BetValue
								iconClassName={'size-3'}
								precision={2}
								value={bet.result ?? 0n}
								withIcon
								className={cn({
									'text-destructive': bet.result === 0n,
									'text-success': bet.result && bet.result > 0n,
								})}
							/>
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default PlayerItem;
