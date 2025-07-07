import { getRoundTimes } from '@/src/lib/api';
import { useActualRound, useCurrentRound, useRoundBank, useRoundStatus } from '@/src/lib/query';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDebounce } from 'use-debounce';
import DesktopBetSection from './sections/DesktopBetSection';
import MobileBetSection from './sections/MobileBetSection';
import OldRound from './sections/OldRound';

const BetAmount = () => {
	const { data: actualRound = 0 } = useActualRound();
	const { data: round = 0 } = useCurrentRound();
	const [_, end] = getRoundTimes(round);

	const [isEnded] = useDebounce(actualRound !== round, 100);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	return <div className="w-full">{isEnded ? <OldRound /> : isMobile ? <MobileBetSection /> : <DesktopBetSection />}</div>;
};

export default BetAmount;
