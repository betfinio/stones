import confetti from 'canvas-confetti';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import arrowdown from '../../assets/Roulette/arrow-down.svg';
import cash from '../../assets/Roulette/cash.svg';
import crystal1 from '../../assets/Roulette/crystal1.svg';
import crystal2 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';
import wheelImage from '../../assets/Roulette/finished-roullet.png';
import rouletteData from '../../mocks/mockRoulette.json';

const crystals = [
	{ name: 'Zircon', image: crystal2, angle: 0 },
	{ name: 'Zircon', image: crystal2, angle: 180 },
	{ name: 'Topaz', image: crystal1, angle: 30 },
	{ name: 'Topaz', image: crystal1, angle: 150 },
	{ name: 'Citrine', image: crystal3, angle: 210 },
	{ name: 'Citrine', image: crystal3, angle: 330 },
	{ name: 'Ruby', image: crystal5, angle: 60 },
	{ name: 'Ruby', image: crystal5, angle: 120 },
	{ name: 'Ruby', image: crystal5, angle: 270 },
	{ name: 'Emerald', image: crystal4, angle: 90 },
	{ name: 'Emerald', image: crystal4, angle: 240 },
	{ name: 'Emerald', image: crystal4, angle: 300 },
];

const baseSize = 1000; // Tamanho base para cálculo de escala

const Wheel = () => {
	const controls = useAnimation();
	const arrowControls = useAnimation();
	const [isSpinning, setIsSpinning] = useState(false);
	const [showWinnerMessage, setShowWinnerMessage] = useState(false);
	const [showCountdown, setShowCountdown] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [currentRotation, setCurrentRotation] = useState(0);

	const shootConfetti = () => {
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

	const spinWheel = async (targetAngle: number) => {
		if (isSpinning) return;
		setIsSpinning(true);

		let rotationNeeded = targetAngle - currentRotation;
		if (rotationNeeded <= 0) {
			rotationNeeded += 360;
		}

		const extraSpins = 360 * 4; // Adiciona 4 voltas completas
		const finalRotation = currentRotation + extraSpins + rotationNeeded;

		await controls.start({
			rotate: finalRotation,
			transition: {
				duration: 3,
				ease: [0.5, 0, 0.5, 1],
			},
		});

		setShowCountdown(false);
		setShowWinnerMessage(true);
		shootConfetti();

		setTimeout(() => {
			setShowWinnerMessage(false);

			const remainder = finalRotation % 360;
			const nearestZeroAngle = finalRotation - remainder;

			controls
				.start({
					rotate: nearestZeroAngle,
					transition: {
						duration: 1,
						ease: 'easeOut',
					},
				})
				.then(() => {
					setCurrentRotation(0);
					controls.set({ rotate: 0 });
					setIsSpinning(false);
					setShowCountdown(true);
				});
		}, 2200);
	};

	const handleDebugClick = (angle: number) => {
		spinWheel(angle);
	};

	useEffect(() => {
		const updateContainerSize = () => {
			const container = containerRef.current;
			if (container) {
				const parentWidth = container.offsetWidth;
				const newScale = parentWidth / baseSize;
				setScale(newScale);
			}
		};

		updateContainerSize();
		window.addEventListener('resize', updateContainerSize);

		return () => {
			window.removeEventListener('resize', updateContainerSize);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative mx-auto overflow-hidden"
			style={{
				width: '100%',
				height: `${500 * scale}px`,
				paddingTop: `${500 * scale}px`,
			}}
		>
			<div
				className={`absolute top-[-50%] mx-auto ${isSpinning ? 'cursor-not-allowed' : ''}`}
				style={{
					width: '100%',
					aspectRatio: '1 / 1',
					position: 'relative',
				}}
			>
				<motion.div
					key="wheel"
					className="relative mx-auto -top-[100%] cursor-pointer"
					style={{
						width: '100%',
						height: '100%',
						overflow: 'hidden',
					}}
				>
					<motion.img
						src={wheelImage}
						alt="wheel"
						className="absolute top-0 left-0 z-[0]"
						style={{
							width: '100%',
							height: '100%',
						}}
						animate={controls}
					/>
					<motion.div className="absolute inset-0 flex justify-center items-center" animate={controls}>
						{crystals.map((crystal, index) => (
							<div
								key={index}
								className="absolute text-center"
								style={{
									transform: `rotate(${crystal.angle}deg) translate(0, ${-310 * scale * 1.13}px) rotate(${crystal.angle}deg)`,
								}}
							>
								<div
									style={{
										transform: `rotate(${-crystal.angle}deg)`,
									}}
									className="flex flex-col items-center justify-center space-y-[8%]"
								>
									<div className="text-xs text-white transform -scale-y-100 -scale-x-100 flex items-center space-x-[3%]">
										<img src={cash} alt={`cash-${crystal.name}`} style={{ height: `${15 * scale}px` }} />
										<span style={{ fontSize: `${12 * scale}px` }}>{rouletteData.items[index].price}</span>
									</div>
									<img
										src={crystal.image}
										alt={`item-${crystal.name}`}
										style={{
											height: `${70 * scale}px`,
											objectFit: 'cover',
											marginBottom: '1px',
											transform: 'scaleY(-1) scaleX(-1)',
										}}
									/>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>

				<AnimatePresence mode="sync">
					{showCountdown && (
						<>
							<motion.div
								key="countdown"
								className="absolute flex flex-col text-center w-full text-white"
								style={{
									top: `-${420 * scale}px`,
									fontSize: `${20 * scale}px`,
								}}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<span
									style={{
										fontSize: `${14 * scale * 2}px`,
										lineHeight: `${17 * scale * 2}px`,
										opacity: 0.4,
									}}
								>
									Stop game in
								</span>
								<span
									className="font-medium"
									style={{
										fontSize: `${30 * scale * 1.4}px`,
										lineHeight: `${36 * scale * 1.4}px`,
									}}
								>
									{rouletteData.countdown}
								</span>
							</motion.div>

							<motion.div
								key="arrow"
								className="absolute w-full flex justify-center items-center"
								style={{
									top: `-${268 * scale}px`,
								}}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<motion.img
									src={arrowdown}
									alt="arrow-down"
									className="absolute"
									style={{
										width: `${25 * scale}px`,
										height: `${25 * scale}px`,
										transformOrigin: 'top center',
									}}
									animate={arrowControls}
								/>
							</motion.div>
						</>
					)}

					{showWinnerMessage && (
						<motion.div
							key="winnerMessage"
							className="absolute w-full flex flex-col items-center justify-center text-center text-white"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1.2 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.3, stiffness: 500 }}
							style={{
								top: `-${420 * scale}px`,
								fontSize: `${20 * scale}px`,
							}}
						>
							<div
								className="absolute rounded-full opacity-30 blur-2xl"
								style={{
									width: `${300 * scale}px`,
									height: `${300 * scale}px`,
									background: 'blue',
								}}
							/>
							<h2
								className="font-bold"
								style={{
									fontSize: `${24 * scale}px`,
									zIndex: 20,
								}}
							>
								You win:
							</h2>
							<p
								className="font-bold"
								style={{
									fontSize: `${40 * scale}px`,
									color: '#FFD700',
									zIndex: 20,
								}}
							>
								{rouletteData.winner.amount}
							</p>
							<p
								className="font-semibold"
								style={{
									fontSize: `${20 * scale}px`,
									color: '#00BFFF',
									zIndex: 20,
								}}
							>
								{rouletteData.winner.bonus}
							</p>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="absolute -top-1/2 right-4 w-fit text-xs">
					<select onChange={(e) => handleDebugClick(Number.parseInt(e.target.value))} className="bg-white text-black p-2 rounded" disabled={isSpinning}>
						<option value="" disabled selected>
							Select Crystal
						</option>
						{crystals.map((crystal) => (
							<option key={crystal.name} value={crystal.angle}>
								{crystal.name} ({crystal.angle}°)
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default Wheel;
