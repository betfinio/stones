import { useRoundBank, useRoundBets, useRoundBetsByPlayer, useRoundStatus, useRoundWinner, useSideBank, useSideBonusShares } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { type FC, useMemo } from 'react';
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

const WinnerNotDistributed: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'winner' });

	const { address = ZeroAddress } = useAccount();
	const { data: winnerSide = 1, isFetching } = useRoundWinner(round);
	const { data: bank = 0n } = useRoundBank(round);
	const { data: sideBank = [1n, 1n, 1n, 1n, 1n] } = useSideBank(round);
	const { data: sideBonusShares = [1n, 1n, 1n, 1n, 1n] } = useSideBonusShares(round);
	const { data: playerBets = [], isFetching: isBetsFetching } = useRoundBetsByPlayer(round, address);
	const { data: allBets = [], isFetching: isAllBetsFetching } = useRoundBets(round);

	const { win, bonus } = useMemo(() => {
		const allWinBets = allBets.filter((bet) => bet.side === winnerSide);
		const sortedWinBets = allWinBets.sort((a, b) => Number(a.created) - Number(b.created));
		const totalBonusShares = sideBonusShares[winnerSide - 1];
		const totalWinBetsCount = allWinBets.length;

		const { bonus: totalBonus, amount: totalAmount } = sortedWinBets.reduce(
			(acc, bet, index) => {
				if (bet.player.toLowerCase() === address.toLowerCase()) {
					const betAmount = BigInt(bet.amount);
					const bonusShare = betAmount * BigInt(totalWinBetsCount - index);
					return { bonus: acc.bonus + bonusShare, amount: acc.amount + betAmount };
				}
				return acc;
			},
			{ bonus: 0n, amount: 0n },
		);

		const bonusBank = (bank * 5n) / 100n;

		const myBonus = totalBonusShares > 0n ? (totalBonus * bonusBank) / totalBonusShares : 0n;

		const totalWinBank = (bank * 914n) / 1000n;
		const sideTotalBank = sideBank[winnerSide - 1];
		const myWin = sideTotalBank > 0n ? (totalAmount * totalWinBank) / sideTotalBank : 0n;
		return { win: myWin, bonus: myBonus };
	}, [round, winnerSide, bank, sideBank, sideBonusShares, playerBets, allBets]);

	if (isFetching || isBetsFetching || isAllBetsFetching) return null;

	if (win > 0) {
		return (
			<motion.div
				initial={{ scale: 0, y: -7 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				className={'z-[6] flex flex-col items-center text-sm sm:text-base lg:text-2xl'}
			>
				{t('win')}:
				<BetValue prefix={'Win: '} className={'text-secondary-foreground scale-110'} value={BigInt(win)} withIcon />
				<div className={'!text-bonus scale-[0.9] flex flex-row items-center gap-1'}>
					+<BetValue prefix={'Bonus: '} iconClassName={'!text-bonus'} value={BigInt(bonus)} withIcon />
				</div>
			</motion.div>
		);
	}

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
