import CardItem from '@/src/components/CardList/CardItem.tsx';
import { arrayFrom } from '@betfinio/abi';
import BetAmountInput from '../components/BetAmountInput';
import CrystalSelector from '../components/CrystalSelector';
import PlaceBetButton from '../components/PlaceBetButton';

const MobileBetSection = () => {
	return (
		<div className="flex flex-col items-center space-y-4 px-4">
			<div className="grid grid-cols-5 gap-2 w-full">
				{arrayFrom(5).map((card) => (
					<CardItem key={card} stone={card + 1} />
				))}
			</div>

			<BetAmountInput isMobile={true} />

			<div className="w-full">
				<PlaceBetButton isMobile={true} />
			</div>

			<CrystalSelector isMobile={true} />
		</div>
	);
};

export default MobileBetSection;
