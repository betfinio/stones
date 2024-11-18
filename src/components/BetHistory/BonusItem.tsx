import { ETHSCAN } from '@/src/lib/global';
import { useRoundBank } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types';
import { truncateEthAddress } from '@betfinio/abi';
import { Fox } from '@betfinio/ui';
import { BetValue } from 'betfinio_app/BetValue';
import { useCustomUsername, useUsername } from 'betfinio_app/lib/query/username';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useAccount } from 'wagmi';
import {motion} from "framer-motion";

const BonusItem: FC<{ bet: StonesBet; round: number; className?: string }> = ({ bet, round, className }) => {
	const { data: bank = 0n } = useRoundBank(round);
	const bonusPool = (bank * 5n) / 100n;
	const { address } = useAccount();
	const { data: username } = useUsername(bet.player);
	const { data: customUsername } = useCustomUsername(address, bet.player);
	return (
		<motion.div
			key={bet.player}
			layout
			initial={{scale: 0}}
			animate={{scale: 1}}
			transition={{type: 'spring', stiffness: 500, damping: 30}}
			exit={{opacity: 0, y: 10}}
			className={cx('rounded-lg flex bg-primary justify-between', className)}>
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
							{customUsername || username || truncateEthAddress(bet.player)}
						</a>
						<a href={`${ETHSCAN}/address/${bet.address}`} target={'_blank'} rel={'noreferrer'}>
							{truncateEthAddress(bet.address)}
						</a>
					</div>
				</div>
				<div className={'flex flex-col items-end text-xs gap-2'}>
					<BetValue precision={2} value={bet.amount} withIcon />
				</div>
			</div>
		</motion.div>
	);
};

export default BonusItem;
