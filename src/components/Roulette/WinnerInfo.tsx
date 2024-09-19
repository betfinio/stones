import logger from '@/src/config/logger';
import { useDistributedInRound, useRoundBank, useRoundBetsByPlayer, useRoundStatus, useRoundWinner, useSideBank } from '@/src/lib/query';
import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from 'betfinio_app/BetValue';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useAccount } from 'wagmi';

const WinnerInfo: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const { data: status } = useRoundStatus(round);
	const { data: distributed } = useDistributedInRound(round);
	const { data: bank } = useRoundBank(round);
	logger.log('status', status, distributed, bank);

	const getContent = () => {
		if (status === 2) {
			// winner selected, but not distributed
			return <WinnerNotDistributed scale={scale} round={round} />;
		}
		if (status === 1) {
			// wheel is spinning
			return <div>Winner is being decided</div>;
		}
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
				top: `-${420 * scale}px`,
				fontSize: `${20 * scale}px`,
				zIndex: 5,
			}}
		>
			<div
				className="absolute rounded-full opacity-50 blur-2xl bg-blue-700"
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
	const { address = ZeroAddress } = useAccount();
	const { data: winnerSide = 0 } = useRoundWinner(round);
	const { data: bank = 0n } = useRoundBank(round);
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bets = [] } = useRoundBetsByPlayer(round, address);
	// get only winning bets
	const winBets = bets.filter((bet) => bet.side === winnerSide);

	// calculate whole bet amount on win side by player
	const betAmount = winBets.reduce((acc, bet) => acc + Number(bet.amount), 0);
	// calculate win amount - fee - bonus
	const myWin = (betAmount / Number(sideBank[winnerSide - 1])) * (Number(bank) * 0.914);

	if (myWin > 0) {
		return (
			<div className={'z-[6]'}>
				<BetValue value={BigInt(myWin)} />
			</div>
		);
	}
};

export default WinnerInfo;
