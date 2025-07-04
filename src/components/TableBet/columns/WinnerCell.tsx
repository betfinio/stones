import { LoaderIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoundStatus, useRoundWinner } from '@/src/lib/query';
import { useSpin } from '@/src/lib/query/mutations.ts';
import { getStoneImage } from '@/src/lib/utils.ts';

const WinnerCell: FC<{ round: number }> = ({ round }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'status' });
	const { data: winner = 0 } = useRoundWinner(round);
	const { data: status = 0 } = useRoundStatus(round);
	const { mutate: spin } = useSpin();

	const handleRequestCalculate = () => {
		spin({ round });
	};
	console.log(status, 'status');
	return (
		<div className={'text-tertiary-foreground'} onClick={handleRequestCalculate}>
			{status === 2 ? (
				<img src={getStoneImage(winner)} alt={'winner'} className={'w-5 h-5'} />
			) : status === 1 ? (
				<LoaderIcon className={'animate-spin'} />
			) : (
				t('waiting')
			)}
		</div>
	);
};

export default WinnerCell;
