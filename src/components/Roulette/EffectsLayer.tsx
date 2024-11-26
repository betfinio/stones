import { useObserveBet } from '@/src/lib/query';
import { getStoneImage } from '@/src/lib/utils.ts';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

export const EffectsLayer: FC<{ round: number }> = ({ round }) => {
	const {
		query: { data: observedBetData },
		resetObservedBet,
	} = useObserveBet(round);

	const [stones, setStones] = useState<
		Array<{
			x: number;
			y: number;
			id: string;
			stoneType: number;
			createdAt: number;
			duration: number;
		}>
	>([]);

	const ref = useRef<HTMLDivElement | null>(null);

	const ANIMATION_DURATION = 4000;

	const generateParticles = () => {
		if (!ref.current) return [];
		const { width, height } = ref.current.getBoundingClientRect();

		return Array.from({ length: 30 }, () => ({
			x: Math.floor(Math.random() * (width + 40)) - 20,
			y: Math.floor(Math.random() * (height + 40)) - 20,
		}));
	};

	useEffect(() => {
		const stoneType = observedBetData?.stone;
		if (!stoneType) return;

		const createdAt = Date.now();
		const duration = ANIMATION_DURATION / 1000;

		const newParticles = generateParticles().map((particle) => ({
			...particle,
			id: Math.random().toString(36).substr(2, 9),
			stoneType,
			createdAt,
			duration,
		}));

		setStones((prevStones) => [...prevStones, ...newParticles]);

		const timeoutId = setTimeout(() => {
			resetObservedBet();
		}, ANIMATION_DURATION);

		return () => clearTimeout(timeoutId);
	}, [observedBetData?.stone]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setStones((prevStones) => prevStones.filter((particle) => Date.now() - particle.createdAt < ANIMATION_DURATION));
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div ref={ref} className="absolute inset-0 duration-300 overflow-hidden">
			<AnimatePresence>
				{stones.map((particle) => (
					<motion.div
						key={particle.id}
						initial={{ opacity: 0, y: 300 }}
						animate={{ opacity: 1, y: -500 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: particle.duration,
							delay: Math.random() * 0.3,
						}}
						className="w-5 h-5 absolute"
						style={{ left: particle.x, top: particle.y }}
					>
						<img src={getStoneImage(particle.stoneType)} alt={`stone${particle.stoneType}`} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};
