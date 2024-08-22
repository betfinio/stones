import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider, { type Settings } from 'react-slick';
import bets from '../../assets/CardList/bets.svg';
import users from '../../assets/CardList/users.svg';
import volume from '../../assets/CardList/volume.svg';
import cash from '../../assets/Roulette/cash.svg';
import crystal2 from '../../assets/Roulette/crystal1.svg';
import crystal1 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';
import cardData from '../../mocks/mockCards.json';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CrystalKeys = 'crystal1' | 'crystal2' | 'crystal3' | 'crystal4' | 'crystal5';

const images: Record<CrystalKeys, string> = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

// NextArrow component
const NextArrow = ({ onClick, currentSlide, slideCount }: any) => {
	const isDisabled = currentSlide >= slideCount - 1;
	return (
		<FaArrowRight
			onClick={onClick}
			className={`cursor-pointer text-lg ${isDisabled ? 'text-[#47486D]' : 'text-[#FFC800]'}`}
			style={{ position: 'absolute', bottom: '-25px', right: '10px' }}
		/>
	);
};

// PrevArrow component
const PrevArrow = ({ onClick, currentSlide }: any) => {
	const isDisabled = currentSlide === 0;
	return (
		<FaArrowLeft
			onClick={onClick}
			className={`cursor-pointer text-lg ${isDisabled ? 'text-[#47486D]' : 'text-[#FFC800]'}`}
			style={{ position: 'absolute', bottom: '-25px', left: '10px' }}
		/>
	);
};

const CardList = () => {
	const [sliderRef, setSliderRef] = useState<Slider | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	const settings: Settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const handleResize = () => {
		if (containerRef.current) {
			setContainerWidth(containerRef.current.offsetWidth);
			if (sliderRef) {
				sliderRef.slickGoTo(0); // Reset the carousel to the first slide
			}
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [sliderRef]);

	return (
		<div className="relative w-full" ref={containerRef}>
			<Slider ref={setSliderRef} {...settings}>
				{cardData.cards.map((card) => (
					<div key={card.id} className="px-2 mt-20 mb-4">
						<div className="group relative bg-[#131624] p-4 rounded-xl h-fit flex-shrink-0 text-white transition-all duration-300 transform hover:scale-105">
							<div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-[#7366FF] via-[#7366ff21] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 z-0" />
							<div className="relative z-10">
								<div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] flex justify-center items-center">
									<img src={images[card.image as CrystalKeys]} alt={`crystal-${card.id}`} className="h-[60px] z-40 absolute -top-6" />
									<div className="absolute inset-0 -top-[30px] rounded-full bg-blue-500 opacity-[0.45] blur-xl" />
								</div>
								<div className="mt-4 text-center">
									<span className="block text-lg text-[14px]">1 x</span>
									<button
										type="button"
										className="border-2 border-yellow-500 text-white text-[12px] px-6 py-2 rounded-lg mt-2 transition-all duration-300 ease-out group-hover:bg-yellow-500 group-hover:text-black"
									>
										Choose
									</button>
									<div className="flex items-center justify-center mt-2 space-x-1 h-[18px]">
										<img src={cash} alt="cash" className="h-[12px]" />
										<span className="text-[12px] leading-[16.56px]">{card.price}</span>
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
										<div className="flex items-center justify-center space-x-1 text-nowrap">
											<img src={volume} alt="volume" className="h-[12px]" />
											<span className="text-[9px]">{card.volume}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default CardList;
