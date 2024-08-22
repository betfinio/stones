import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import BetAmount from '../components/BetAmount/BetAmount';
import BetHistory from '../components/BetHistory/BetHistory';
import BetSummary from '../components/BetSummary/BetSummary';
import CardList from '../components/CardList/CardList';
import Wheel from '../components/Roulette/Wheel';
import TableBet from '../components/TableBet/TableBet';

export const Route = createFileRoute('/popup')({
	component: () => <Popup />,
});

function Popup() {
	return (
		<div className="border border-red-roulette px-4 py-2 rounded-md text-white h-full flex flex-col overflow-auto">
			<div className="flex flex-row justify-between">
				<div className="flex-grow flex flex-col w-full">
					<Wheel /> {/* Usando o componente da roleta */}
					<CardList />
					<BetAmount />
					<TableBet />
				</div>
				<div className="w-[290px] ml-6 flex flex-col">
					<div className="bg-[#131624] rounded-xl h-[670px] flex items-center justify-center">
						{/* Conteúdo da seção lateral */}
						<BetHistory />
					</div>
					<div className="bg-[#131624] rounded-xl mt-4 h-[116px] flex items-center justify-center">
						{/* Bloco abaixo da seção lateral */}
						<BetSummary />
					</div>
				</div>
			</div>
		</div>
	);
}
