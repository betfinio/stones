import { useCurrentRound, useStonesInfo } from '@/src/lib/query';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'betfinio_app/carousel';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useMediaQuery } from 'react-responsive';
import bets from '../../assets/CardList/bets.svg';
import users from '../../assets/CardList/users.svg';
import volume from '../../assets/CardList/volume.svg';
import cash from '../../assets/Roulette/cash.svg';
import crystal1 from '../../assets/Roulette/crystal1.svg';
import crystal2 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';
import cardData from '../../mocks/mockCards.json';

type CrystalKeys = 'crystal1' | 'crystal2' | 'crystal3' | 'crystal4' | 'crystal5';

const images: Record<CrystalKeys, string> = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

export const CardList = () => {
	// Define breakpoints using react-responsive
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const isTablet = useMediaQuery({ minWidth: 750, maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 749 });
	const { data: round = 0 } = useCurrentRound();
	const { data: stones = [] } = useStonesInfo(round);
	console.log(stones);

	let itemBasis: string;
	if (isDesktop) {
		itemBasis = 'basis-1/5'; // 5 slides on desktop
	} else if (isTablet) {
		itemBasis = 'basis-1/3'; // 3 slides on tablet
	} else if (isMobile) {
		itemBasis = 'basis-1/2'; // 2 slides on mobile
	}

	return (
		<div className={`relative w-full tabular-nums ${isMobile && 'pb-8'}`}>
			<Carousel>
				<CarouselContent className="-ml-4 pt-6 pb-4">
					{cardData.cards.map((card) => (
						<CarouselItem key={card.id} className={`pl-4 ${itemBasis}`}>
							<div className="group relative flex-shrink-0 text-white transition-all duration-300 transform hover:scale-105 w-36 mx-auto overflow-visible">
								{/* Container giving the appearance of the crystal "floating" outside */}
								<div className="relative z-20">
									<div className="absolute left-1/2 transform -translate-x-1/2 -top-5 w-20 h-20 flex justify-center items-center">
										<img src={images[card.image as CrystalKeys]} alt={`crystal-${card.id}`} className="h-16 z-40" />
										<div className="absolute w-14 h-14 rounded-full bg-blue-500 opacity-65 blur-xl" />
									</div>
								</div>

								{/* The card content below the crystal */}
								<div className="relative z-10 mt-8 text-center bg-primaryLight rounded-xl w-full p-4 pt-16">
									<span className="block text-md font-normal tabular-nums">1x</span>
									<button
										type="button"
										className="border-2 border-yellow-500 text-white text-sm px-1 py-2 rounded-lg mt-2 transition-all duration-300 ease-out group-hover:bg-yellow-500 group-hover:text-black w-full"
									>
										Choose
									</button>
									<div className="flex w-fit items-center mt-4 h-4 mx-auto mb-2">
										<img src={cash} alt="cash" className="h-4" />
										<span className="text-sm font-medium">{card.price}</span>
									</div>
									<span className="block text-[hsl(var(--bonus-text))] text-sm font-medium whitespace-nowrap">{card.bonus}</span>
									<div className="mt-2 space-y-1 text-sm text-gray-400">
										<div className="flex items-center justify-center space-x-1 text-nowrap">
											<img src={users} alt="users" className="h-3" />
											<span className="text-xs opacity-60">{card.bids}</span>
										</div>
										<div className="flex items-center justify-center space-x-1 text-nowrap">
											<img src={bets} alt="bets" className="h-3" />
											<span className="text-xs opacity-60">{card.bets}</span>
										</div>
										<div className="flex w-fit mx-auto items-center justify-center space-x-1 text-nowrap">
											<img src={volume} alt="volume" className="h-3" />
											<span className="text-xs opacity-60">{card.volume}</span>
										</div>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{isMobile && (
					<>
						<CarouselPrevious className="absolute top-[102%] bottom-0 left-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowLeftLong className="w-6 h-6 text-[#FFC800]" />
						</CarouselPrevious>
						<CarouselNext className="absolute top-[102%] bottom-0 right-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowRightLong className="w-6 h-6 text-[#FFC800]" />
						</CarouselNext>
					</>
				)}
			</Carousel>
		</div>
	);
};

export default CardList;
