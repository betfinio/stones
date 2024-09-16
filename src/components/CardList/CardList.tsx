import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';
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
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCurrentRound, useStonesInfo } from '@/src/lib/query';

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
	let centerSlidePercentage = 0;
	if (isDesktop) {
		centerSlidePercentage = 100 / 5; // 5 slides on desktop
	} else if (isTablet) {
		centerSlidePercentage = 100 / 3; // 3 slides on tablet
	} else if (isMobile) {
		centerSlidePercentage = 100 / 2; // 2 slides on mobile
	}

	return (
		<div className="relative w-full">
			<Carousel
				className=""
				showThumbs={false}
				showArrows={!isDesktop}
				showIndicators={false}
				centerMode={true}
				centerSlidePercentage={centerSlidePercentage}
				swipeable={true}
				emulateTouch={true}
				showStatus={false}
				renderArrowPrev={(clickHandler, hasPrev) =>
					hasPrev && (
						<div
							className="absolute top-72 bottom-0 left-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20"
							onClick={clickHandler}
						>
							<FaArrowLeftLong className="w-6 h-6 text-[#FFC800]" />
						</div>
					)
				}
				renderArrowNext={(clickHandler, hasNext) =>
					hasNext && (
						<div
							className="absolute top-72 bottom-0 right-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20"
							onClick={clickHandler}
						>
							<FaArrowRightLong className="w-6 h-6 text-[#FFC800]" />
						</div>
					)
				}
			>
				{cardData.cards.map((card) => (
					<div key={card.id} className="px-2 mt-16 pb-16">
						<div className="group relative bg-primaryLight p-4 rounded-xl h-fit flex-shrink-0 text-white transition-all duration-300 transform hover:scale-105 max-w-[143px] mx-auto">
							<div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-[#7366FF] via-[#7366ff21] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 z-0" />
							<div className="relative z-10">
								<div className="absolute left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] flex justify-center items-center">
									<img src={images[card.image as CrystalKeys]} alt={`crystal-${card.id}`} className="h-[60px] z-40 absolute -top-16" />
									<div className="absolute -top-14 w-[60px] h-[60px] rounded-full bg-blue-500 opacity-[0.65] blur-xl" />
								</div>
								<div className="mt-6 text-center">
									<span className="block text-lg font-semibold">1 x</span>
									<button
										type="button"
										className="border-2 border-yellow-500 text-white text-[12px] px-3 py-1 rounded-lg mt-2 transition-all duration-300 ease-out group-hover:bg-yellow-500 group-hover:text-black"
									>
										Choose
									</button>
									<div className="flex w-fit items-center mt-2 h-[18px] mx-auto mb-4">
										<img src={cash} alt="cash" className="h-[12px]" />
										<span className="text-[12px]  font-medium">{card.price}</span>
									</div>
									<span className="block text-blue-500 text-[12px] font-[600]">{card.bonus}</span>
									<div className="mt-4 space-y-1 text-sm text-gray-400">
										<div className="flex items-center justify-center space-x-4">
											<div className="flex items-center justify-center space-x-1 text-nowrap">
												<img src={users} alt="users" className="h-[12px]" />
												<span className="text-[9px]">{card.bids}</span>
											</div>
											<div className="flex items-center justify-center space-x-1 text-nowrap">
												<img src={bets} alt="bets" className="h-[12px]" />
												<span className="text-[9px]">{card.bets}</span>
											</div>
										</div>
										<div className="flex w-fit mx-auto items-center justify-center space-x-1 text-nowrap">
											<img src={volume} alt="volume" className="h-[12px]" />
											<span className="text-[9px]">{card.volume}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default CardList;
