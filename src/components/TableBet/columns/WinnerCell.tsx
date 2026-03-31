import { LoaderIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoundStatus, useRoundWinner } from '@/src/lib/query';
import { useSpin } from '@/src/lib/query/mutations.ts';
import { RoundStatusEnum } from '@/src/lib/types.ts';
import { getStoneImage } from '@/src/lib/utils.ts';

const WinnerCell: FC<{ round: number }> = ({ round }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'status' });
	const { data: winner = 0 } = useRoundWinner(round);
	const { data: status = 0 } = useRoundStatus(round);
	const { mutate: spin } = useSpin();

	const handleRequestCalculate = () => {
		if (status === RoundStatusEnum.Settled || status === RoundStatusEnum.Cancelled) return;
		spin({ round });
	};
	return (
		<div className={'text-tertiary-foreground'} onClick={handleRequestCalculate}>
			{status === RoundStatusEnum.Settled ? (
				<img src={getStoneImage(winner)} alt={'winner'} className={'w-5 h-5'} />
			) : status === RoundStatusEnum.Cancelled ? (
				<span className={'text-destructive text-xs'}>{t('refunded')}</span>
			) : status === RoundStatusEnum.SpinRequested || status === RoundStatusEnum.ResultReady ? (
				<LoaderIcon className={'animate-spin'} />
			) : (
				t('waiting')
			)}
		</div>
	);
};

export default WinnerCell;
