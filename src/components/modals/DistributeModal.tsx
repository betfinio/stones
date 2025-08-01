import { Bet } from '@betfinio/components/icons';
import { cn as cx } from '@betfinio/components/lib';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Separator } from '@betfinio/components/ui';
import { getTransactionLink } from 'betfinio_context/lib/helpers';
import { Calculator, CircleCheck, Coins, Loader, X } from 'lucide-react';
import { createContext, type FC, type PropsWithChildren, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useExecuteResult, useSettleLostBets } from '@/src/lib/query/mutations';

type DistributeState = 'settleLostBets' | 'executeResult' | 'result';

interface DistributeContextProps {
	requestDistribute: (round: number) => void;
	state: DistributeState;
	round?: number;
	requested: boolean;
	setResult?: (executeResultTx: Address, settleBetsTx: Address) => void;
}

const DistributeContext = createContext<DistributeContextProps>({
	requestDistribute: () => {},
	state: 'settleLostBets',
	requested: false,
});

export const DistributeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<DistributeState>('settleLostBets');
	const [open, setOpen] = useState(false);
	const [requested, setRequested] = useState(false);
	const [round, setRound] = useState<number | undefined>();
	const [executeResultTx, setExecuteResultTx] = useState<Address | undefined>();
	const [settleBetsTx, setSettleBetsTx] = useState<Address | undefined>();

	const requestDistribute = (round: number) => {
		setState('settleLostBets');
		setOpen(true);
		setRequested(false);
		setRound(round);
		setExecuteResultTx(undefined);
		setSettleBetsTx(undefined);
	};

	const handleRequested = () => {
		open && setRequested(true);
	};

	const setResult = (executeResultTx: Address, settleBetsTx: Address) => {
		setExecuteResultTx(executeResultTx);
		setSettleBetsTx(settleBetsTx);
		setState('result');
		setRequested(false);
		setOpen(false);
	};

	return (
		<DistributeContext.Provider
			value={{
				requestDistribute,
				state,
				round,
				requested,
				setResult,
			}}
		>
			{children}
			<DistributeModal
				open={open}
				onClose={() => setOpen(false)}
				onStateChange={setState}
				executeResultTx={executeResultTx}
				settleBetsTx={settleBetsTx}
				onRequested={handleRequested}
				onExecuteResultComplete={(tx) => {
					setExecuteResultTx(tx);
					setState('result');
				}}
				onSettleBetsComplete={(tx) => {
					setSettleBetsTx(tx);
					setState('executeResult');
				}}
			/>
		</DistributeContext.Provider>
	);
};

export const useDistributeModal = () => {
	return useContext(DistributeContext);
};

interface DistributeModalProps {
	open: boolean;
	onClose: () => void;
	onStateChange: (state: DistributeState) => void;
	executeResultTx?: Address;
	settleBetsTx?: Address;
	onRequested: () => void;
	onExecuteResultComplete: (tx: Address) => void;
	onSettleBetsComplete: (tx: Address) => void;
}

function DistributeModal({ open, onClose, executeResultTx, settleBetsTx, onRequested, onExecuteResultComplete, onSettleBetsComplete }: DistributeModalProps) {
	const { state, round = 0 } = useDistributeModal();
	const { t } = useTranslation('stones', { keyPrefix: 'distributeModal' });

	const { mutate: executeResult, isPending: isExecutingResult } = useExecuteResult();
	const { mutate: settleLostBets, isPending: isSettlingBets } = useSettleLostBets();

	const handleExecuteResult = () => {
		executeResult(
			{ round },
			{
				onSuccess: (tx) => {
					onExecuteResultComplete(tx);
					onRequested();
				},
			},
		);
	};

	const handleSettleLostBets = () => {
		settleLostBets(
			{ round },
			{
				onSuccess: (tx) => {
					onSettleBetsComplete(tx);
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className={'rounded-xl'}>
				<DialogTitle className={'hidden'} />
				<DialogDescription className={'hidden'} />
				<div className={'p-4 text-foreground'} style={{ minWidth: '360px' }}>
					<div className={'flex items-center flex-row justify-end gap-2'}>
						<div className={'grow'} />
						<DialogClose className={'cursor-pointer p-1 rounded-full bg-muted/10'}>
							<X className={'w-4 h-4'} />
						</DialogClose>
					</div>
					<div className={'flex flex-col items-start'}>
						<div className={'text-muted-foreground text-sm'}>{t('roundDistribution')}</div>
						<div className={'flex flex-row justify-between w-full py-2'}>
							<div className={'text-xl'}>Round #{round}</div>
							<Bet className={'w-6 h-6 text-primary'} />
						</div>
						<Separator />
						<div className={'py-2 flex flex-col items-start gap-2 w-full'}>
							{/* Step 1: Settle Lost Bets */}
							<div className={cx('flex flex-row items-center justify-between w-full gap-2', state === 'settleLostBets' && 'text-secondary-foreground')}>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										{isSettlingBets ? (
											<Loader className={'w-6 h-6 animate-spin'} />
										) : settleBetsTx ? (
											<CircleCheck className={'w-6 h-6 text-green-500'} />
										) : (
											<Coins className={'w-6 h-6'} />
										)}
									</div>
								</div>
								<div className={'grow'}>{isSettlingBets ? t('settlingBets') : t('settleLostBets')}</div>
								{state === 'settleLostBets' && (
									<Button className={'h-auto rounded-full py-1'} disabled={isSettlingBets} onClick={handleSettleLostBets}>
										{t('settle')}
									</Button>
								)}
							</div>

							{/* Connector line */}
							{state === 'settleLostBets' && <div className={'border-r border-border h-6 w-5'} />}

							{/* Step 2: Execute Result */}
							<div
								className={cx('flex flex-row items-center justify-between w-full gap-2', {
									'text-secondary-foreground': state === 'executeResult',
									'text-gray-400': state === 'settleLostBets',
								})}
							>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										{isExecutingResult ? (
											<Loader className={'w-6 h-6 animate-spin'} />
										) : executeResultTx ? (
											<CircleCheck className={'w-6 h-6 text-green-500'} />
										) : (
											<Calculator className={'w-6 h-6'} />
										)}
									</div>
								</div>
								<div className={'grow'}>{isExecutingResult ? t('executingResult') : t('executeResult')}</div>
								{state === 'executeResult' && (
									<Button className={'h-auto rounded-full py-1'} disabled={isExecutingResult} onClick={handleExecuteResult}>
										{t('execute')}
									</Button>
								)}
							</div>

							{/* Connector line */}
							{state === 'executeResult' && <div className={'border-r border-border h-6 w-5'} />}

							{/* Step 3: Result */}
							<div className={cx('flex flex-row items-center gap-2', state !== 'result' ? 'text-gray-500' : 'text-green-500')}>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										<CircleCheck className={'w-6 h-6'} />
									</div>
								</div>
								<div className={'grow'}>
									{executeResultTx && settleBetsTx ? (
										<div className={'flex flex-col gap-1'}>
											{getTransactionLink(settleBetsTx, 'Settle Bets')}
											{getTransactionLink(executeResultTx, 'Execute Result')}
										</div>
									) : (
										t('result')
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
