import { Button } from '@betfinio/components/ui';
import { useNavigate } from '@tanstack/react-router';
import { DateTime } from 'luxon';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import BetRanking from '@/src/components/BetRanking/BetRanking';
import { getRoundTimes } from '@/src/lib/api';
import { useActualRound, useCurrentRound, useInterval, useRoundStatus } from '@/src/lib/query';
import { RoundStatusEnum } from '@/src/lib/types';

const OldRound = () => {
	const { data: round = 0 } = useCurrentRound();
	const { data: interval = 300 } = useInterval();
	const [_, end] = getRoundTimes(round, interval);
	const { data: actualRound = 0 } = useActualRound();
	const navigate = useNavigate();
	const { data: status = 0 } = useRoundStatus(round);
	const { t } = useTranslation('stones', { keyPrefix: 'oldRound' });

	const handleClick = () => {
		navigate({ to: '/games/stones', search: { round: actualRound } });
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<div className={'w-full border border-border/50 rounded-lg p-2 md:p-3 lg:p-4 flex flex-row items-center text-sm lg:text-base justify-between'}>
				<div>Round ended {DateTime.fromSeconds(end).toFormat('MM/dd T')}</div>
				<Button onClick={handleClick}>{t('goToCurrentRound')}</Button>
			</div>
			{status === RoundStatusEnum.Settled && <BetRanking round={round} />}
		</motion.div>
	);
};

export default OldRound;
