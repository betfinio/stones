import type { FC } from 'react';

const RoundCell: FC<{ round: number }> = ({ round }) => {
	return <div className={'text-gray-400'}>#{round}</div>;
};

export default RoundCell;
