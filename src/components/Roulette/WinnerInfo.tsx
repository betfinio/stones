import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { cx } from 'class-variance-authority';
import { motion } from 'motion/react';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useRoundBank, useRoundBets, useRoundStatus } from '@/src/lib/query';
import { RoundStatusEnum } from '@/src/lib/types';

const WinnerInfo: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { data: status, isLoading: isStatusLoading } = useRoundStatus(round);

	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const getContent = () => {
		if (isStatusLoading) {
			return null;
		}
		if (status === RoundStatusEnum.Cancelled) {
			return (
				<div
					className={cx('flex flex-col')}
					style={{
						fontSize: `${17 * scale * 2}px`,
						lineHeight: `${17 * scale * 2}px`,
					}}
				>
					<span>{t('roundCancelled')}</span>
					<span
						style={{
							fontSize: `${10 * scale * 2}px`,
							lineHeight: `${14 * scale * 2}px`,
						}}
						className={'font-light text-tertiary-foreground'}
					>
						{t('betsRefunded')}
					</span>
				</div>
			);
		}
		if (status === RoundStatusEnum.Settled) {
			return <WinnerSettled scale={scale} round={round} />;
		}
		if (status === RoundStatusEnum.SpinRequested || status === RoundStatusEnum.ResultReady) {
			return <div>{t('winnerIsBeingDecided')}</div>;
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
					className={'font-light text-tertiary-foreground'}
				>
					{t('waitingForSpin')}!
				</span>
			</div>
		);
	};

	return (
		<motion.div
			key="winnerMessage"
			className="absolute w-full flex flex-col items-center justify-center text-center text-foreground"
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
				className="absolute rounded-full opacity-30 blur-2xl bg-destructive"
				style={{
					width: `${300 * scale}px`,
					height: `${300 * scale}px`,
				}}
			/>
			{getContent()}
		</motion.div>
	);
};

/**
 * V2: Read payout directly from bet clones (set on-chain during resolution).
 * No formula needed — Bet.payout() is the definitive source.
 */
const WinnerSettled: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const { address = ZeroAddress } = useAccount();
	const { data: bank = 0n } = useRoundBank(round);
	const { data: allBets = [], isFetching: isAllBetsFetching } = useRoundBets(round);

	const myWin = useMemo(() => {
		const myBets = allBets.filter((bet) => bet.player.toLowerCase() === address.toLowerCase());
		return myBets.reduce((acc, bet) => acc + (bet.payout ?? 0n), 0n);
	}, [allBets, address]);

	if (isAllBetsFetching) return null;

	if (myWin > 0n) {
		return (
			<motion.div
				initial={{ scale: 0, y: -7 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				className={'z-6 flex flex-col items-center text-sm sm:text-base lg:text-2xl'}
			>
				{t('win')}:
				<BetValue prefix={'Win: '} className={'text-secondary-foreground scale-110'} value={myWin} withIcon />
			</motion.div>
		);
	}

	return (
		<div
			className={'z-6'}
			style={{
				fontSize: `${36 * scale}px`,
			}}
		>
			<span>{t('roundIsOver')}!</span>

			<div
				style={{
					fontSize: `${10 * scale * 2}px`,
					lineHeight: `${14 * scale * 2}px`,
				}}
				className={'font-light text-tertiary-foreground flex flex-row justify-center items-center gap-1'}
			>
				{t('couldWin')}:
				<BetValue className={'text-secondary-foreground '} value={bank} withIcon />
			</div>
		</div>
	);
};

export default WinnerInfo;
