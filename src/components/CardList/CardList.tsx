import CardItem from '@/src/components/CardList/CardItem.tsx';
import { useActualRound, useCurrentRound } from '@/src/lib/query';
import { arrayFrom } from '@betfinio/abi';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'betfinio_app/carousel';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useMediaQuery } from 'react-responsive';

export const CardList = () => {
	const { data: actualRound = 0 } = useActualRound();
	const { data: currentRound = 0 } = useCurrentRound();
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const isTablet = useMediaQuery({ minWidth: 750, maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 749 });

	let itemBasis: string;
	if (isDesktop) {
		itemBasis = 'basis-1/5'; // 5 slides on desktop
	} else if (isTablet) {
		itemBasis = 'basis-1/3'; // 3 slides on tablet
	} else if (isMobile) {
		itemBasis = 'basis-1/2'; // 2 slides on mobile
	}

	return (
		<motion.div className={cx('relative w-full flex mb-8', actualRound !== currentRound && 'h-0 w-0 overflow-hidden')}>
			<Carousel
				className={cx('w-full', isMobile && 'mb-8')}
				opts={{ loop: isMobile || isTablet, slidesToScroll: isMobile ? 2 : isTablet ? 2 : 1, dragFree: isTablet }}
			>
				<CarouselContent className="py-6">
					{arrayFrom(5).map((card) => (
						<CarouselItem key={card} className={`${itemBasis}`}>
							<CardItem stone={card + 1} />
						</CarouselItem>
					))}
				</CarouselContent>
				{isMobile && (
					<>
						<CarouselPrevious className="absolute top-[108%] left-0 flex justify-center items-center  opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowLeftLong className="w-6 h-6 text-yellow-400" />
						</CarouselPrevious>
						<CarouselNext className="absolute top-[108%] right-0 flex justify-center items-center opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowRightLong className="w-6 h-6 text-yellow-400" />
						</CarouselNext>
					</>
				)}
			</Carousel>
		</motion.div>
	);
};

export default CardList;
