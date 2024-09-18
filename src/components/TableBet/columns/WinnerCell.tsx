import { useRoundWinner } from '@/src/lib/query';
import { useSpin } from '@/src/lib/query/mutations.ts';
import { getStoneImage } from '@/src/lib/utils.ts';
import { LoaderIcon } from 'lucide-react';
import type { FC } from 'react';

const WinnerCell: FC<{ round: number }> = ({ round }) => {
	const { data: winner = 0 } = useRoundWinner(round);
	const { mutate: spin } = useSpin();

	const handleRequestCalculate = () => {
		spin({ round });
	};

	return (
		<div className={'text-gray-400'} onClick={handleRequestCalculate}>
			{winner > 0 ? <img src={getStoneImage(winner)} alt={'winner'} className={'w-5 h-5'} /> : <LoaderIcon className={'animate-spin'} />}
		</div>
	);
};

export default WinnerCell;
