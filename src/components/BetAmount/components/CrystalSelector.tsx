import { arrayFrom } from '@betfinio/abi';
import type { FC } from 'react';
import { useSelectedStone } from '@/src/lib/query/state';
import crystal1 from '../../../assets/Roulette/crystal1.svg';
import crystal2 from '../../../assets/Roulette/crystal2.svg';
import crystal3 from '../../../assets/Roulette/crystal3.svg';
import crystal4 from '../../../assets/Roulette/crystal4.svg';
import crystal5 from '../../../assets/Roulette/crystal5.svg';

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

const CrystalSelector: FC<{
	isMobile?: boolean;
	pie?: Array<{ id: number; value: number; color: string; borderColor: string }>;
}> = ({ isMobile = false, pie }) => {
	const { data: selected, setSelectedStone } = useSelectedStone();

	const handleCrystalClick = (crystal: number) => {
		setSelectedStone(crystal);
	};

	if (isMobile) {
		return (
			<div className="flex space-x-2 mt-4 h-10 w-full justify-between items-start">
				{arrayFrom(5).map((crystal, index) => (
					<div
						key={index}
						className={`relative flex items-center justify-center border-1 border-border w-[44px] h-[25px] bg-card rounded-md cursor-pointer hover:scale-110 transition-all ease-in ${
							selected === (crystal + 1) ? 'border-2 border-border' : ''
						}`}
						onClick={() => handleCrystalClick(crystal + 1)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleCrystalClick(crystal + 1);
							}
						}}
					>
						<img src={images[`crystal${crystal + 1}`]} alt={`crystal-${index}`} className="h-[15px] z-20" />
						{index === 0 && (
							<div className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-bonus opacity-70 blur-xs z-10 hover:scale-110 transition-all ease-linear" />
						)}
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-5 gap-3 w-full">
			{pie?.map((item, index) => (
				<div
					key={index}
					className={`relative flex items-center justify-center px-2 py-1.5 bg-card rounded-md cursor-pointer ${
						selected === item.id ? 'border-2 border-border' : ''
					}`}
					onClick={() => handleCrystalClick(item.id)}
					tabIndex={0}
					role="button"
				>
					<img src={images[`crystal${item.id}`]} alt={`crystal-${index}`} className="h-[15px] z-20" />
				</div>
			))}
		</div>
	);
};

export default CrystalSelector;
