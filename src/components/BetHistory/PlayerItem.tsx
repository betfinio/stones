import { ETHSCAN } from '@/src/lib/global.ts';
import { useRoundBank } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types.ts';
import { truncateEthAddress } from '@betfinio/abi';
import { Fox } from '@betfinio/ui';
import { BetValue } from 'betfinio_app/BetValue';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useAccount } from 'wagmi';

const PlayerItem: FC<{ bet: StonesBet; round: number; className?: string }> = ({ bet, round, className }) => {
	const { data: bank = 0n } = useRoundBank(round);

	const share = Number(bet.amount * 100n) / Number(bank);
	const betsNumber = 0;
	const { address } = useAccount();
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.5, type: 'spring' }}
			className={cx('rounded-lg flex bg-primary justify-between', className)}
		>
			<div className={'py-3 px-2 flex justify-between items-center grow gap-2'}>
				<div className={'flex items-start gap-[10px]'}>
					<Fox className={'w-5 h-5'} />
					<div className={'flex flex-col text-[#6A6F84] text-xs gap-2'}>
						<a
							href={`${ETHSCAN}/address/${bet.player}`}
							target={'_blank'}
							className={cx('font-semibold text-sm !text-gray-300 hover:underline', bet.player.toLowerCase() === address?.toLowerCase() && '!text-yellow-400')}
							rel="noreferrer"
						>
							{truncateEthAddress(bet.player)}
						</a>
						<span className={cx('opacity-0', betsNumber > 0 && 'opacity-100')}>{betsNumber} bets</span>
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
