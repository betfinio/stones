import CardItem from '@/src/components/CardList/CardItem.tsx';
import { useActualRound, useCurrentRound } from '@/src/lib/query';
import { arrayFrom } from '@betfinio/abi';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@betfinio/components/ui';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useMediaQuery } from 'react-responsive';

export const CardList = () => {
	const { data: actualRound = 0 } = useActualRound();
	const { data: currentRound = 0 } = useCurrentRound();
	const isXl = useMediaQuery({ minWidth: 1440 });
	const isDesktop = useMediaQuery({ minWidth: 1220 });
	const isTablet = useMediaQuery({ minWidth: 769 });
	const isMobile = useMediaQuery({ maxWidth: 768 });

	let itemBasis: string;
	if (isXl) {
		itemBasis = 'basis-1/5 pl-2'; // 5 slides on desktop
	} else if (isDesktop) {
		itemBasis = 'basis-1/4'; // 5 slides on desktop
	} else if (isTablet) {
		itemBasis = 'basis-1/3'; // 3 slides on tablet
	} else if (isMobile) {
		itemBasis = 'basis-1/3 pl-2'; // 2 slides on mobile
	}

	return (
		<motion.div className={cx('relative w-full hidden md:flex mb-8', actualRound !== currentRound && 'h-0 w-0 overflow-hidden')}>
			<Carousel className={cx('w-full', isMobile && 'mb-8')}>
				<CarouselContent className="py-6 ml-0.5">
					{arrayFrom(5).map((card) => (
						<CarouselItem key={card} className={`${itemBasis}`}>
							<CardItem stone={card + 1} />
						</CarouselItem>
					))}
				</CarouselContent>
				{isMobile && (
					<>
						<CarouselPrevious className="absolute top-[108%] left-0 flex justify-center items-center  opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowLeftLong className="w-6 h-6 text-secondary-foreground" />
						</CarouselPrevious>
						<CarouselNext className="absolute top-[108%] right-0 flex justify-center items-center opacity-50 hover:opacity-100 cursor-pointer z-20 rounded-md">
							<FaArrowRightLong className="w-6 h-6 text-secondary-foreground" />
						</CarouselNext>
					</>
				)}
			</Carousel>
		</motion.div>
	);
};

export default CardList;
