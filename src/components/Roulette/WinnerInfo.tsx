import { useRoundBank, useRoundBetsByPlayer, useRoundStatus, useRoundWinner, useSideBank } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from 'betfinio_app/BetValue';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

const WinnerInfo: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { data: status } = useRoundStatus(round);

	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const getContent = () => {
		if (status === 2) {
			// winner selected, but not distributed
			return <WinnerNotDistributed scale={scale} round={round} />;
		}
		if (status === 1) {
			// wheel is spinning
			return <div>{'winnerIsBeingDecided'}</div>;
		}
		return (
			<div
				className={cx('flex flex-col')}
				style={{
					fontSize: `${17 * scale * 2}px`,
					lineHeight: `${17 * scale * 2}px`,
				}}
			>
				<span>{t('roundIsOver')}!</span>
				<span
					style={{
						fontSize: `${10 * scale * 2}px`,
						lineHeight: `${14 * scale * 2}px`,
					}}
					className={'font-light text-gray-500'}
				>
					{t('waitingForSpin')}!
				</span>
			</div>
		);
	};

	return (
		<motion.div
			key="winnerMessage"
			className="absolute w-full flex flex-col items-center justify-center text-center text-white"
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1.2 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.3, stiffness: 500 }}
			style={{
				top: `-${450 * scale}px`,
				fontSize: `${20 * scale}px`,
				zIndex: 5,
			}}
		>
			<div
				className="absolute rounded-full opacity-30 blur-2xl bg-red-500"
				style={{
					width: `${300 * scale}px`,
					height: `${300 * scale}px`,
				}}
			/>
			{getContent()}
		</motion.div>
	);
};

const WinnerNotDistributed: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	// manually calculate win and bonus amount
	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const { address = ZeroAddress } = useAccount();
	const { data: winnerSide = 0, isFetching } = useRoundWinner(round);
	const { data: bank = 0n } = useRoundBank(round);
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bets = [], isFetching: isBetsFetching } = useRoundBetsByPlayer(round, address);
	// get only winning bets
	const winBets = bets.filter((bet) => bet.side === winnerSide);

	// calculate whole bet amount on win side by player
	const betAmount = winBets.reduce((acc, bet) => acc + Number(bet.amount), 0);
	// calculate win amount - fee - bonus
	const myWin = (betAmount / Number(sideBank[winnerSide - 1])) * (Number(bank) * 0.914);
	// calculate bonus todo
	const myBonus = 0n;
	if (myWin > 0) {
		return (
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={'z-[6] flex flex-col items-center text-base lg:text-2xl'}>
				{t('win')}:
				<BetValue prefix={'Win: '} className={'text-yellow-400 scale-110'} value={BigInt(myWin)} withIcon />
				<div className={'!text-blue-500 scale-[0.9] flex flex-row items-center gap-1'}>
					+<BetValue prefix={'Bonus: '} iconClassName={'!text-blue-500'} value={BigInt(myBonus)} withIcon />
				</div>
			</motion.div>
		);
	}

	if (isFetching || isBetsFetching) return null;

	return (
		<div
			className={'z-[6]'}
			style={{
				fontSize: `${36 * scale}px`,
			}}
		>
			{t('lose')}
		</div>
	);
};

export default WinnerInfo;
