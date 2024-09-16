import Header from './Header';
import Wheel from './Wheel';

const Roulette = () => {
	return (
		<div className="relative w-full flex flex-col items-center justify-center">
			<Header />
			<div className="relative w-full flex justify-center overflow-hidden">
				<Wheel />
			</div>
		</div>
	);
};

export default Roulette;
