import rouletteData from '../../mocks/mockRoulette.json';
import Header from './Header';
import Wheel from './Wheel';

const Roulette = () => {
	return (
		<div className="relative w-full flex flex-col items-center justify-center">
			{/* Header */}
			<Header roundID={rouletteData.roundID} winningPool={rouletteData.winningPool} bonusPool={rouletteData.bonusPool} />

			{/* Wheel */}
			<div className="relative w-full flex justify-center overflow-hidden">
				<Wheel />
			</div>
		</div>
	);
};

export default Roulette;
