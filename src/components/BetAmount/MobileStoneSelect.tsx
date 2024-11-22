import CardItem from '@/src/components/CardList/CardItem.tsx';
import { arrayFrom } from '@betfinio/abi';

export const MobileStoneSelect = () => {
	return (
		<div className="grid grid-cols-5 gap-2 w-full">
			{arrayFrom(5).map((card) => (
				<CardItem key={card} stone={card + 1} />
			))}
		</div>
	);
};
