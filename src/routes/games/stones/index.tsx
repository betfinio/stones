import { SonnerToaster, TooltipProvider, toast } from '@betfinio/components/ui';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { decodeAbiParameters } from 'viem';
import { useWatchContractEvent } from 'wagmi';
import BetAmount from '@/src/components/BetAmount/BetAmount.tsx';
import BetHistory from '@/src/components/BetHistory/BetHistory.tsx';
import BetSummary from '@/src/components/BetSummary/BetSummary.tsx';
import CardList from '@/src/components/CardList/CardList.tsx';
import Roulette from '@/src/components/Roulette/Roulette.tsx';
import TableBet from '@/src/components/TableBet/TableBet.tsx';
import logger from '@/src/config/logger.ts';
import { PvPGameABI } from '@/src/lib/abi/PvPGameABI.ts';
import { animateNewBet } from '@/src/lib/api';
import { STONES } from '@/src/lib/global.ts';
import { useCurrentRound } from '@/src/lib/query';
import { RoundStatusEnum } from '@/src/lib/types.ts';

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
	const { t } = useTranslation('stones', { keyPrefix: 'winner' });
	useEffect(() => {
		if (search.round === 0 && currentRound > 0) {
			navigate({ to: '/games/stones', search: { round: currentRound } });
		} else {
			queryClient.setQueryData(['stones', 'currentRound'], search.round);
		}
	}, [search, currentRound]);

	useWatchContractEvent({
		abi: PvPGameABI,
		address: STONES,
		eventName: 'BetPlaced',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('BetPlaced detected', logs[0]);
			const roundId = Number(logs[0].args.roundId);
			if (roundId !== currentRound) return;

			// Decode side from event data
			let side = 0;
			const data = logs[0].args.data;
			if (data && data !== '0x') {
				try {
					const decoded = decodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], data);
					side = Number(decoded[1]);
				} catch {
					side = 0;
				}
			}

			// Ensure round exists in the table cache (subgraph may lag)
			queryClient.setQueryData<{ round: number; winnerSide: number; status: RoundStatusEnum }[]>(['stones', 'rounds'], (old) => {
				if (!old) return [{ round: roundId, winnerSide: 0, status: RoundStatusEnum.Open }];
				if (old.some((r) => r.round === roundId)) return old;
				return [{ round: roundId, winnerSide: 0, status: RoundStatusEnum.Open }, ...old];
			});

			animateNewBet(side, 0, queryClient, roundId);
			queryClient.invalidateQueries({ queryKey: ['stones'] });
		},
	});

	useWatchContractEvent({
		abi: PvPGameABI,
		address: STONES,
		eventName: 'RoundCancelled',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('RoundCancelled detected', logs[0]);
			const roundId = Number(logs[0].args.roundId);
			if (roundId !== currentRound) return;
			toast.warning(t('roundCancelledToast'));
			await queryClient.invalidateQueries({ queryKey: ['stones'] });
		},
	});

	return (
		<TooltipProvider>
			<div className={'w-full h-full max-w-screen-2xl mx-auto'}>
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
	);
}

export default StonesPage;
