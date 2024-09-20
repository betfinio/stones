import BetAmount from '@/src/components/BetAmount/BetAmount.tsx';
import BetHistory from '@/src/components/BetHistory/BetHistory.tsx';
import BetSummary from '@/src/components/BetSummary/BetSummary.tsx';
import CardList from '@/src/components/CardList/CardList.tsx';
import Roulette from '@/src/components/Roulette/Roulette';
import TableBet from '@/src/components/TableBet/TableBet.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stones/')({
	component: () => <Index />,
});

function Index() {
	return (
		<div className="w-full p-2 md:p-3 lg:p-4 rounded-md text-white h-full  overflow-hidden grid grdi-cols-12 gap-2">
			<div className={'col-span-12 lg:col-span-8'}>
				<Roulette />
			</div>
			<div className={'col-span-12 lg:col-span-8 lg:col-row-2 lg:mb-0 md:mb-10'}>
				<BetAmount />
			</div>
			<div className={'col-span-12 md:col-span-8 overflow-hidden'}>
				<CardList />
			</div>
			<div className={'col-span-12 md:col-span-4 flex flex-col gap-2 lg:col-span-4 lg:row-start-1 lg:col-start-9 lg:row-span-3'}>
				<BetHistory />
				<BetSummary />
			</div>
			<div className={'col-span-12'}>
				<TableBet />
			</div>
			{/*<div className="w-full grid grid-cols-12 gap-2 md:gap-3 lg:gap-4">*/}
			{/*	<div className="w-full col-span-12 xl:col-span-9">*/}
			{/*		<Roulette />*/}
			{/*		<BetAmount />*/}
			{/*		<CardList />*/}
			{/*		<div className="lg:hidden">*/}
			{/*			<div className="bg-primaryLight rounded-xl flex items-center justify-center">*/}
			{/*				<BetHistory />*/}
			{/*			</div>*/}
			{/*			<div className="bg-primaryLight rounded-xl mt-8 mb-14 h-[80px] sm:h-[100px] md:h-[100px] flex items-center justify-center">*/}
			{/*				<BetSummary />*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className="hidden lg:flex lg:flex-col gap-2 md:gap-3 lg:gap-4 xl:col-span-3">*/}
			{/*		<div className="bg-primaryLight rounded-xl border border-gray-800 flex items-center justify-center">*/}
			{/*			<BetHistory />*/}
			{/*		</div>*/}
			{/*		<div className="bg-primaryLight rounded-xl border overflow-hidden border-gray-800 flex items-center justify-center">*/}
			{/*			<BetSummary />*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
			{/*<TableBet />*/}
		</div>
	);
}

export default Index;
