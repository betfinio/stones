import { StonesABI, TokenABI } from '@betfinio/abi';
import { SonnerToaster, TooltipProvider } from '@betfinio/components/ui';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { wagmiConfig } from 'betfinio_context/config';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { useWatchContractEvent } from 'wagmi';
import BetAmount from '@/src/components/BetAmount/BetAmount.tsx';
import BetHistory from '@/src/components/BetHistory/BetHistory.tsx';
import BetSummary from '@/src/components/BetSummary/BetSummary.tsx';
import CardList from '@/src/components/CardList/CardList.tsx';
import { DistributeProvider } from '@/src/components/modals/DistributeModal';
import Roulette from '@/src/components/Roulette/Roulette.tsx';
import TableBet from '@/src/components/TableBet/TableBet.tsx';
import logger from '@/src/config/logger.ts';
import { animateNewBet, fetchBetInfo } from '@/src/lib/api';
import { STONES, TOKEN } from '@/src/lib/global.ts';
import { useCurrentRound } from '@/src/lib/query';

export const Route = createFileRoute('/games/stones/')({
	component: () => <StonesPage />,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			round: (Number(search.round) as number) || 0,
		};
	},
});

export function StonesPage() {
	const search = Route.useSearch();
	const { data: currentRound = 0 } = useCurrentRound();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (search.round === 0 && currentRound > 0) {
			navigate({ to: '/games/stones', search: { round: currentRound } });
		} else {
			queryClient.setQueryData(['stones', 'currentRound'], search.round);
		}
	}, [search, currentRound]);

	useWatchContractEvent({
		abi: StonesABI,
		address: STONES,
		eventName: 'BetCreated',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('Request detected', logs[0]);
			const round = Number(logs[0].args.round);
			if (round !== currentRound) return;

			const bet = logs[0]?.args?.bet as Address;
			const betInfo = await fetchBetInfo(bet, wagmiConfig);
			animateNewBet(Number(betInfo.side), 0, queryClient, round);
			queryClient.invalidateQueries({ queryKey: ['stones'] });
		},
	});

	useWatchContractEvent({
		abi: TokenABI,
		address: TOKEN,
		eventName: 'Transfer',
		strict: true,
		args: { from: STONES },
		onLogs: async (logs) => {
			logger.warn('Transfer detected', logs[0]);
			queryClient.invalidateQueries({ queryKey: ['stones', 'rounds'] });
		},
	});
	return (
		<DistributeProvider>
			<TooltipProvider>
				<div className={'stones w-full h-full max-w-screen-2xl mx-auto'}>
					<div className="w-full p-2 md:py-3 lg:py-4 rounded-md text-foreground h-full 2xl:px-0 overflow-hidden grid grid-cols-12 gap-2">
						<div className={'col-span-12 lg:col-span-8'}>
							<Roulette />
						</div>
						<AnimatePresence>
							<div key={'amount'} className={'col-span-12 lg:col-span-8 lg:mb-0 md:mb-10'}>
								<BetAmount />
							</div>
							<div key={'cards'} className={'col-span-12 md:col-span-8 overflow-hidden'}>
								<CardList />
							</div>
							<div key={'history'} className={'col-span-12 md:col-span-4 flex flex-col gap-2 lg:col-span-4 lg:row-start-1 lg:col-start-9 lg:row-span-3'}>
								<BetHistory />
								<BetSummary />
							</div>
							<div key={'table'} className={'col-span-12 w-full'}>
								<TableBet />
							</div>
							<a target={'_blank'} rel={'noreferrer '} href="https://chain.link/vrf" className={'w-full max-w-[200px] col-span-12 lg:col-span-4'}>
								<img src="https://chain.link/badge-randomness-black" alt="randomness secured with chainlink" />
							</a>
						</AnimatePresence>
					</div>
				</div>
				<SonnerToaster />
			</TooltipProvider>
		</DistributeProvider>
	);
}

export default StonesPage;
