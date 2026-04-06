import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Button } from '@betfinio/components/ui';
import { cx } from 'class-variance-authority';
import { motion } from 'motion/react';
import { type CSSProperties, type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { getRoundTimes } from '@/src/lib/api';
import { useInterval, useRoundBank, useRoundBets, useRoundStatus, useRoundWinner } from '@/src/lib/query';
import { useResolveRound, useSpin } from '@/src/lib/query/mutations.ts';
import { RoundStatusEnum } from '@/src/lib/types';

const winnerMessageWrapClass = 'z-[6] max-w-[min(92vw,16rem)] sm:max-w-[min(90vw,20rem)] px-2 text-center text-pretty break-words leading-snug';

function winnerMessageFontStyle(scale: number): CSSProperties {
	return { fontSize: `${Math.max(11, 13 * scale)}px`, lineHeight: 1.35 };
}

const WinnerInfo: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { data: status, isLoading: isStatusLoading } = useRoundStatus(round);
	const { data: previewWinner = 0 } = useRoundWinner(round);
	const { data: interval = 300 } = useInterval();
	const { mutate: settle, isPending: isSettling } = useResolveRound();
	const { mutate: requestSpin, isPending: isSpinning } = useSpin();

	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const [, roundEnd] = getRoundTimes(round, interval);
	const roundEnded = roundEnd > 0 && roundEnd <= Math.floor(Date.now() / 1000);
	const winnerKnown = previewWinner >= 1 && previewWinner <= 5;
	const canRequestSpin = status === RoundStatusEnum.Open && roundEnded && !winnerKnown;

	const settleCallToAction = () => (
		<div className={cx(winnerMessageWrapClass, 'flex flex-col items-center gap-2')} style={winnerMessageFontStyle(scale)}>
			<span className="font-light text-tertiary-foreground">{t('pendingSettlement')}</span>
			<Button type="button" size="sm" variant="secondary" className="shrink-0" disabled={isSettling} onClick={() => settle({ round })}>
				{t('settleRound')}
			</Button>
		</div>
	);

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

		// VRF in flight — no winning side in UI yet
		if (status === RoundStatusEnum.SpinRequested && !winnerKnown) {
			return (
				<div className={winnerMessageWrapClass} style={winnerMessageFontStyle(scale)}>
					{t('winnerIsBeingDecided')}
				</div>
			);
		}

		// Winner is known ( indexer, chain, cache, or session ) while round is not settled —
		// handles ResultReady and stale Open after VRF before status refetches.
		if (winnerKnown) {
			return settleCallToAction();
		}

		if (status === RoundStatusEnum.ResultReady) {
			return (
				<div className={winnerMessageWrapClass} style={winnerMessageFontStyle(scale)}>
					{t('winnerIsBeingDecided')}
				</div>
			);
		}

		return (
			<div className={cx('flex flex-col items-center gap-2', winnerMessageWrapClass)}>
				<div
					className="flex flex-col items-center"
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
				{canRequestSpin ? (
					<Button type="button" size="sm" variant="secondary" className="shrink-0" disabled={isSpinning} onClick={() => requestSpin({ round })}>
						{t('spinRound')}
					</Button>
				) : null}
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
