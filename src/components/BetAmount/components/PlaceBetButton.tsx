import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Button } from '@betfinio/components/ui';
import { useAllowanceModal } from 'betfinio_context/lib/context';
import { useAllowance } from 'betfinio_context/lib/query';
import { LoaderIcon } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { usePotentialWinWithBonus } from '@/src/lib/gql';
import { useBetAmount, useCurrentRound } from '@/src/lib/query';
import { usePlaceBet } from '@/src/lib/query/mutations';
import { useSelectedStone } from '@/src/lib/query/state';

const PlaceBetButton: FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'controls' });
	const { address = ZeroAddress } = useAccount();
	const { data: selected } = useSelectedStone();
	const { data: round = 0 } = useCurrentRound();
	const { data: amount = 10000 } = useBetAmount();
	const { requestAllowance, setResult, requested } = useAllowanceModal();
	const { mutate: placeBet, isPending, data, isSuccess } = usePlaceBet();
	const { data: allowance = 0n } = useAllowance(address);

	const { win, bonus } = usePotentialWinWithBonus(amount, selected);
	const winAmount = Number(win + bonus);

	useEffect(() => {
		if (data && isSuccess) {
			setResult?.(data);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (requested) {
			handleSpin();
		}
	}, [requested]);

	const handleSpin = () => {
		if (allowance < BigInt(amount)) {
			requestAllowance?.('bet', BigInt(amount) * 10n ** 18n);
			return;
		}
		placeBet({ amount: Number(amount), side: selected, round: round });
	};

	return (
		<Button
			className={`hover:scale-105 duration-200 transition-all flex gap-1 w-full ${!isMobile ? 'max-w-[320px]' : ''}`}
			disabled={isPending || amount <= 0n}
			type="button"
			onClick={handleSpin}
		>
			{isPending ? (
				<LoaderIcon className={'animate-spin'} />
			) : (
				<>
					{t('placeBet')} <BetValue value={winAmount} withIcon iconClassName={'border border-border rounded-full'} />
				</>
			)}
		</Button>
	);
};

export default PlaceBetButton;
