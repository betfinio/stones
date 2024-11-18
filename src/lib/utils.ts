import Stone1 from '@/src/assets/Roulette/crystal1.svg';
import Stone2 from '@/src/assets/Roulette/crystal2.svg';
import Stone3 from '@/src/assets/Roulette/crystal3.svg';
import Stone4 from '@/src/assets/Roulette/crystal4.svg';
import Stone5 from '@/src/assets/Roulette/crystal5.svg';
import type { StonesAuthor, StonesBet } from '@/src/lib/types.ts';
import confetti from 'canvas-confetti';

export const shootConfetti = () => {
	confetti({
		particleCount: 100,
		angle: -90,
		spread: 360,
		startVelocity: 30,
		origin: { x: 0.5, y: 0.1 },
		colors: ['#FF2A51', '#B100A8', '#FFB300', '#B0D100', '#2462E7'],
	});

	confetti({
		particleCount: 50,
		spread: 360,
		startVelocity: 40,
		gravity: 0,
		decay: 0.96,
		scalar: 2,
		shapes: ['circle'],
		colors: ['#FF2A51', '#B100A8', '#FFB300', '#B0D100', '#2462E7'],
		origin: { x: 0.5, y: 0.4 },
	});
};

export const getStoneImage = (stone: number) => {
	switch (stone) {
		case 1:
			return Stone1;
		case 2:
			return Stone2;
		case 3:
			return Stone3;
		case 4:
			return Stone4;
		case 5:
			return Stone5;
		default:
			return Stone1;
	}
};

export const mapBetsToAuthors = (bets: StonesBet[]): StonesAuthor[] => {
	return [...bets].reduce((acc: StonesAuthor[], val) => {
		const author = acc.findIndex((bet) => bet.player === val.player);
		if (author === -1) {
			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			return [...acc, { ...val, betsNumber: 1 }];
		}
		acc[author].amount += val.amount;
		acc[author].betsNumber += 1;
		return acc;
	}, []);
};
