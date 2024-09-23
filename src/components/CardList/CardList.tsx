import CardItem from '@/src/components/CardList/CardItem.tsx';
import { useActualRound, useCurrentRound } from '@/src/lib/query';
import { arrayFrom } from '@betfinio/abi';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'betfinio_app/carousel';
import { cx } from 'class-variance-authority';
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
		<div className={cx('relative w-full flex', actualRound !== currentRound && 'h-0')}>
			<Carousel className={cx('w-full', isMobile && 'mb-8')} opts={{ loop: true, slidesToScroll: 1, dragFree: isDesktop }}>
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
		</div>
	);
};

export default CardList;
