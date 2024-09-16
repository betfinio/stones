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
