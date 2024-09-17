import { ETHSCAN } from '@/src/lib/global';
import { useRoundBank } from '@/src/lib/query';
import type { StonesBet } from '@/src/lib/types';
import { getStoneImage } from '@/src/lib/utils';
import { truncateEthAddress } from '@betfinio/abi';
import { BetValue } from 'betfinio_app/BetValue';
import { useCustomUsername, useUsername } from 'betfinio_app/lib/query/username';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const BetItem: FC<{ bet: StonesBet; round: number; className?: string }> = ({ bet, round, className }) => {
	const { data: bank = 0n } = useRoundBank(round);
	const share = Number(bet.amount * 100n) / Number(bank);
	const { address } = useAccount();
	const image = getStoneImage(bet.side);
	const { data: username } = useUsername(bet.player);
	const { data: customUsername } = useCustomUsername(address, bet.player);
	return (
		<div className={cx('rounded-lg flex bg-primary justify-between', className)}>
			<div className={'py-3 px-2 flex justify-between items-center grow gap-2'}>
				<div className={'flex items-start gap-[10px]'}>
					<img src={image} alt={'stone'} className={'w-5 h-5'} />
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
					<span className={'font-semibold text-sm'}>{share.toFixed(2)}%</span>
					<span>
						<BetValue precision={2} value={bet.amount} withIcon />
					</span>
				</div>
			</div>
		</div>
	);
};

export default BetItem;
