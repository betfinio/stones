import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import BetHistory from '../components/BetHistory/BetHistory';
import BetRanking from '../components/BetRanking/BetRanking';
import BetSummary from '../components/BetSummary/BetSummary';
import Roulette from '../components/Roulette/Roulette';
import TableBet from '../components/TableBet/TableBet';

export const Route = createFileRoute('/finished')({
	component: () => <Finished />,
});

function Finished() {
	return (
		<div className="w-full border px-4 py-2 rounded-md text-white h-full flex flex-col overflow-auto">
			<div className="w-full flex flex-col lg:flex-row justify-between">
				<div className="flex-grow flex flex-col w-full">
					<Roulette />
					<BetRanking />
					{/* Mover BetHistory e BetSummary para baixo de BetAmount em telas menores */}
					<div className="lg:hidden">
						<div className="bg-primaryLight rounded-xl lg:h-[670px] flex items-center justify-center">
							<BetHistory />
						</div>
						<div className="bg-primaryLight rounded-xl mt-8 mb-14 h-[80px] sm:h-[100px] md:h-[100px] flex items-center justify-center">
							<BetSummary />
						</div>
					</div>
					<TableBet />
				</div>
				<div className="hidden lg:flex lg:flex-col">
					<div className="bg-primaryLight rounded-xl h-[670px] flex items-center justify-center">
						<BetHistory />
					</div>
					<div className="bg-primaryLight rounded-xl mt-4 h-[116px] flex items-center justify-center">
						<BetSummary />
					</div>
				</div>
			</div>
		</div>
	);
}
