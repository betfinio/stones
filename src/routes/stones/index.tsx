import BetAmount from '@/src/components/BetAmount/BetAmount.tsx';
import BetHistory from '@/src/components/BetHistory/BetHistory.tsx';
import BetSummary from '@/src/components/BetSummary/BetSummary.tsx';
import CardList from '@/src/components/CardList/CardList.tsx';
import Roulette from '@/src/components/Roulette/Roulette.tsx';
import TableBet from '@/src/components/TableBet/TableBet.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stones/')({
	component: () => <Index />,
});

function Index() {
	return (
		<div className="w-full p-2 md:p-3 lg:p-4  rounded-md text-white h-full flex flex-col overflow-auto">
			<div className="w-full flex flex-col lg:flex-row justify-center gap-2 md:gap-3 lg:gap-4">
				<div className="flex flex-col w-full">
					<Roulette />
					<CardList />
					<BetAmount />
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

				<div className="hidden lg:flex lg:flex-col gap-2 md:gap-3 lg:gap-4">
					<div className="bg-primaryLight rounded-xl border border-gray-800 flex items-center justify-center">
						<BetHistory />
					</div>
					<div className="bg-primaryLight rounded-xl border overflow-hidden border-gray-800 flex items-center justify-center">
						<BetSummary />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Index;
