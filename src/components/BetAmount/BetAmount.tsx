import { useMediaQuery } from 'react-responsive';
import { useDebounce } from 'use-debounce';
import { useActualRound, useCurrentRound } from '@/src/lib/query';
import DesktopBetSection from './sections/DesktopBetSection';
import MobileBetSection from './sections/MobileBetSection';
import OldRound from './sections/OldRound';

const BetAmount = () => {
	const { data: actualRound = 0 } = useActualRound();
	const { data: round = 0 } = useCurrentRound();

	const [isEnded] = useDebounce(actualRound !== round, 100);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	return <div className="w-full">{isEnded ? <OldRound /> : isMobile ? <MobileBetSection /> : <DesktopBetSection />}</div>;
};

export default BetAmount;
