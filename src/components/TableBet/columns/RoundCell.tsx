import type { FC } from 'react';

const RoundCell: FC<{ round: number }> = ({ round }) => {
	return <div className={'text-tertiary-foreground'}>#{round}</div>;
};

export default RoundCell;
