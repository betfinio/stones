import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@betfinio/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { type MouseEvent, useMemo } from 'react';
import { getRoundTimes } from '@/src/lib/api';
import { useInterval, useRoundStatus } from '@/src/lib/query';
import { useRefundRound, useResolveRound, useSpin } from '@/src/lib/query/mutations';
import { RoundStatusEnum } from '@/src/lib/types';

const REFUND_TIMEOUT = 24 * 60 * 60; // 24 hours in seconds

interface ActionOption {
	handler: (e: MouseEvent) => void;
	title: string;
}

function RoundActions({ round }: { round: number }) {
	const { mutate: spin } = useSpin();
	const { mutate: settle } = useResolveRound();
	const { mutate: refund } = useRefundRound();
	const { data: interval = 300 } = useInterval();
	const { data: status = 0 } = useRoundStatus(round);

	const handleSpin = (e: MouseEvent) => {
		e.stopPropagation();
		const result = confirm('Are you sure you want to request the spin?');
		if (result) {
			spin({ round });
		}
	};

	const handleRefund = (e: MouseEvent) => {
		e.stopPropagation();
		const result = confirm('Are you sure you want to refund the round?');
		if (result) {
			refund({ round });
		}
	};

	const handleSettle = (e: MouseEvent) => {
		e.stopPropagation();
		const result = confirm('Settle this round to distribute payouts?');
		if (result) {
			settle({ round });
		}
	};

	const actions: ActionOption[] = useMemo(() => {
		const options: ActionOption[] = [];
		const now = Math.floor(Date.now() / 1000);
		const [, roundEnd] = getRoundTimes(round, interval);
		const roundEnded = roundEnd > 0 && roundEnd <= now;

		// Open round that has ended can be spun
		if (status === RoundStatusEnum.Open && roundEnded) {
			options.push({
				handler: handleSpin,
				title: 'Spin',
			});
		}
		if (status === RoundStatusEnum.ResultReady) {
			options.unshift({
				handler: handleSettle,
				title: 'Settle',
			});
		}
		// Refund only available after REFUND_TIMEOUT past round end
		if (status === RoundStatusEnum.Open && roundEnd > 0 && now >= roundEnd + REFUND_TIMEOUT) {
			options.push({
				handler: handleRefund,
				title: 'Refund',
			});
		}
		return options;
	}, [status, interval, round]);

	if (actions.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-row items-center justify-center gap-2 lg:gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{actions.map((action) => (
						<DropdownMenuItem key={action.title} onClick={action.handler}>
							{action.title}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default RoundActions;
