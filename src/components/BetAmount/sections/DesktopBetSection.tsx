import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useCurrentRound, useRoundBank, useSideBank } from '@/src/lib/query';
import BetAmountInput from '../components/BetAmountInput';
import CrystalSelector from '../components/CrystalSelector';
import PlaceBetButton from '../components/PlaceBetButton';
import ProbabilitiesChart from '../components/ProbabilitiesChart';

const DesktopBetSection = () => {
	const { data: round = 0 } = useCurrentRound();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: bank = 0n } = useRoundBank(round);

	const isEmpty = bank === 0n;

	const pie = useMemo(() => {
		return [
			{
				id: 1,
				value: isEmpty ? 20 : (Number(sideBank[0]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--topaz-bg))',
				borderColor: 'hsl(var(--topaz-border))',
			},
			{
				id: 2,
				value: isEmpty ? 20 : (Number(sideBank[1]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--zircon-bg))',
				borderColor: 'hsl(var(--zircon-border))',
			},
			{
				id: 3,
				value: isEmpty ? 20 : (Number(sideBank[2]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--citrine-bg))',
				borderColor: 'hsl(var(--citrine-border))',
			},
			{
				id: 4,
				value: isEmpty ? 20 : (Number(sideBank[3]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--emerald-bg))',
				borderColor: 'hsl(var(--emerald-border))',
			},
			{
				id: 5,
				value: isEmpty ? 20 : (Number(sideBank[4]) * 100) / Number(bank || 1n),
				color: 'hsl(var(--ruby-bg))',
				borderColor: 'hsl(var(--ruby-border))',
			},
		];
	}, [sideBank, bank, isEmpty]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex flex-col md:flex-row justify-center items-center md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full"
		>
			<ProbabilitiesChart round={round} pie={pie} />

			<BetAmountInput isMobile={false} />

			<div className="flex flex-col items-center w-full max-w-[320px] gap-2">
				<PlaceBetButton isMobile={false} />

				<CrystalSelector isMobile={false} pie={pie} />
			</div>
		</motion.div>
	);
};

export default DesktopBetSection;
