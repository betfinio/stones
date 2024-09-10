import { createFileRoute } from '@tanstack/react-router';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'betfinio_app/carousel';

export const Route = createFileRoute('/test')({
	component: () => (
		<div className={'border border-red-roulette'}>
			<Carousel>
				<CarouselContent className={'gap-10'}>
					<CarouselItem className="basis-1/3 border border-green-500 max-w-[300px] aspect-square">test1</CarouselItem>
					<CarouselItem className="basis-1/3 border border-blue-500 max-w-[300px] aspect-square">test2</CarouselItem>
					<CarouselItem className="basis-1/3 border border-yellow-500 max-w-[300px] aspect-square">test3</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	),
});
