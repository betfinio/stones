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
		<div className="w-full px-4 py-2 rounded-md text-white h-full flex flex-col overflow-auto">
			<div className="w-full flex flex-col lg:flex-row justify-center">
				<div className="flex flex-col max-w-[810px]">
					<Roulette />
					<CardList />
					<BetAmount />

					<div className="lg:hidden">
						<div className="bg-[#131624] rounded-xl lg:h-[670px] flex items-center justify-center">
							<BetHistory />
						</div>
						<div className="bg-[#131624] rounded-xl mt-8 mb-14 h-[80px] sm:h-[100px] md:h-[100px] flex items-center justify-center">
							<BetSummary />
						</div>
					</div>
					<TableBet />
				</div>

				<div className="hidden lg:flex lg:flex-col lg:w-[290px] lg:ml-6">
					<div className="bg-[#131624] rounded-xl h-[670px] flex items-center justify-center">
						<BetHistory />
					</div>
					<div className="bg-[#131624] rounded-xl mt-4 h-[116px] flex items-center justify-center">
						<BetSummary />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Index;
