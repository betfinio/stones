import Time from '@/src/components/Roulette/Time';
import logger from '@/src/config/logger';
import { STONES } from '@/src/lib/global.ts';
import { useCurrentRound, useSideBank } from '@/src/lib/query';
import { useSelectedStone } from '@/src/lib/query/state.ts';
import { StonesContract } from '@betfinio/abi';
import { BetValue } from 'betfinio_app/BetValue';
import { Button } from 'betfinio_app/button';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useWatchContractEvent } from 'wagmi';
import arrowdown from '../../assets/Roulette/arrow-down.svg';
import cash from '../../assets/Roulette/cash.svg';
import neonImage from '../../assets/Roulette/neon-glow.png';
import ComplexRoulette from './ComplexRoulette';
import CrystalAnimation1 from './Crystals/CrystalAnimation1';
import CrystalAnimation2 from './Crystals/CrystalAnimation2';
import CrystalAnimation3 from './Crystals/CrystalAnimation3';
import CrystalAnimation4 from './Crystals/CrystalAnimation4';
import CrystalAnimation5 from './Crystals/CrystalAnimation5';

const crystals = [
	{ name: 1, image: CrystalAnimation1, angle: 180 },
	{ name: 1, image: CrystalAnimation1, angle: 0 },
	{ name: 2, image: CrystalAnimation2, angle: 216 },
	{ name: 2, image: CrystalAnimation2, angle: 36 },
	{ name: 3, image: CrystalAnimation3, angle: 252 },
	{ name: 3, image: CrystalAnimation3, angle: 72 },
	{ name: 4, image: CrystalAnimation4, angle: 288 },
	{ name: 4, image: CrystalAnimation4, angle: 108 },
	{ name: 5, image: CrystalAnimation5, angle: 324 },
	{ name: 5, image: CrystalAnimation5, angle: 144 },
];

const baseSize = 1000; // Tamanho base para cálculo de escala

const Wheel = () => {
	const controls = useAnimation();
	const arrowControls = useAnimation();

	const { data: round = 0 } = useCurrentRound();
	const { data: selectedStone = 1 } = useSelectedStone();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);

	const [isSpinning, setIsSpinning] = useState(false);
	const [scale, setScale] = useState(1);

	const containerRef = useRef<HTMLDivElement>(null);

	const [showWinnerMessage, setShowWinnerMessage] = useState(false);
	const [showCountdown, setShowCountdown] = useState(true);

	useEffect(() => {
		const angle = crystals.find((crystal) => crystal.name === selectedStone)?.angle || 0;
		rotateWheel(-angle);
	}, [selectedStone]);

	useWatchContractEvent({
		abi: StonesContract.abi,
		address: STONES,
		eventName: 'RequestedCalculation',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('Request detected', logs[0]);
			const round = Number.parseInt(logs[0].topics[1] || '0x0', 16);
			console.log(round);
		},
	});

	const startSpin = async () => {
		await controls.start({
			rotate: 360 * 20,
			transition: {
				duration: 20, // Aceleração e desaceleração suave
				ease: [0.33, 1, 0.68, 1], // Ease mais suave, simulando aceleração e desaceleração
			},
		});
	};
	const stopSpin = async (angle: number) => {
		controls.stop();
		await controls.start({
			rotate: 360 + angle,
			transition: {
				duration: 2, // Aceleração e desaceleração suave
				ease: [0.33, 1, 0.68, 1], // Ease mais suave, simulando aceleração e desaceleração
			},
		});
	};

	const rotateWheel = async (targetAngle: number) => {
		let rotationNeeded = targetAngle;
		if (rotationNeeded <= 0) {
			rotationNeeded += 360;
		}
		await controls.start({
			rotate: rotationNeeded,
			transition: {
				duration: 0.5,
				ease: [0.33, 1, 0.68, 1],
			},
		});
	};

	const spinWheel = async (targetAngle: number, spins = 4) => {
		if (isSpinning) return;
		setIsSpinning(true);

		let rotationNeeded = targetAngle;
		if (rotationNeeded <= 0) {
			rotationNeeded += 360;
		}

		const extraSpins = 360 * spins; // Adiciona 4 voltas completas
		const finalRotation = extraSpins + rotationNeeded;

		// Iniciar a animação da seta com oscilações mais realistas
		arrowControls
			.start({
				rotate: [
					0, 10, 0, 15, 0, 20, 0, 30, 0, 40, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 30, 0, 30, 0, 20, 0,
					10, 0, 10, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0,
				],
				transition: {
					duration: 3, // Oscilações iniciais rápidas
					ease: [0.33, 1, 0.68, 1],
				},
			})
			.then();

		// Iniciar o giro da roleta
		await controls.start({
			rotate: finalRotation,
			transition: {
				duration: 3, // Aceleração e desaceleração suave
				ease: [0.33, 1, 0.68, 1], // Ease mais suave, simulando aceleração e desaceleração
			},
		});

		setIsSpinning(false);

		// setShowCountdown(false);
		// setShowWinnerMessage(true);
		// shootConfetti();

		// setTimeout(() => {
		// 	setShowWinnerMessage(false);
		//
		// 	const remainder = finalRotation % 360;
		// 	const nearestZeroAngle = finalRotation - remainder;
		//
		// 	controls
		// 		.start({
		// 			rotate: nearestZeroAngle + initialRotation, // Inclui a rotação inicial ao parar
		// 			transition: {
		// 				duration: 1,
		// 				ease: 'easeOut', // Suave ao parar
		// 			},
		// 		})
		// 		.then(() => {
		// 			setCurrentRotation(initialRotation); // Reseta a rotação para a inicial
		// 			controls.set({ rotate: initialRotation }); // Garante que a roleta volte à posição inicial
		// 			setIsSpinning(false);
		// 			setShowCountdown(true);
		//
		// 			// Terminar a animação da seta
		// 			arrowControls.start({
		// 				rotate: 0, // Volta ao ponto neutro
		// 				transition: { duration: 0.3, ease: 'easeOut' },
		// 			});
		// 		});
		// }, 2200);
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
			<Button className={'absolute left-0 top-1/2 z-[100]'} onClick={() => startSpin()}>
				spin
			</Button>
			<Button className={'absolute left-0 top-2/3 z-[100]'} onClick={() => stopSpin(crystals[1].angle)}>
				stop
			</Button>
			<div className={'relative w-full mx-auto aspect-square z-[3]'}>
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
						src={neonImage}
						alt="Neon Glow"
						className="absolute top-0 w-full h-full opacity-100 scale-[1.03]"
						style={{
							objectFit: 'contain',
							zIndex: -1, // Mantém o glow atrás da roleta
						}}
						initial={{ scale: 0, opacity: 0 }} // Início com a imagem bem pequena e invisível
						animate={{ scale: [0, 1.04, 1.03], opacity: [0, 1, 1] }} // Escala da imagem aumenta até o tamanho final
						transition={{
							duration: 1.5, // Tempo total da animação
							ease: 'easeInOut', // Suavidade para a entrada e saída
							times: [0, 0.5, 1], // Define os momentos das transições
						}}
					/>
					<motion.div animate={controls}>
						<ComplexRoulette />
					</motion.div>

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
									className="relative flex flex-col items-center justify-center space-y-[16%]"
								>
									<div className="text-xs text-white transform -scale-y-100 -scale-x-100 flex items-center space-x-[3%]">
										<motion.div
											className="absolute rounded-full bg-[#7366FF] opacity-[0.85] blur-xl"
											style={{
												width: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
												height: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
												top: `${-46 * scale}px`, // Ajusta a posição vertical conforme a escala
												left: `${22 * scale}px`, // Ajusta a posição horizontal conforme a escala
												transform: 'translate(-50%, -50%)',
											}}
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 1, 1] }}
											transition={{
												duration: 3, // Tempo total da animação
												ease: 'easeInOut', // Suavidade para a entrada e saída
												times: [0, 0.5, 1], // Define os momentos das transições
											}}
										/>
										<motion.img
											src={cash}
											alt={`cash-${crystal.name}`}
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 1, 1] }}
											transition={{
												duration: 3, // Tempo total da animação
												ease: 'easeInOut', // Suavidade para a entrada e saída
												times: [0, 0.5, 1], // Define os momentos das transições
											}}
											className="z-20 aspect-square md:w-4 md:h-4 h-3 w-3"
										/>
										<motion.span
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 1, 1] }}
											transition={{
												duration: 3, // Tempo total da animação
												ease: 'easeInOut', // Suavidade para a entrada e saída
												times: [0, 0.5, 1], // Define os momentos das transições
											}}
											className="z-20"
										>
											<BetValue value={sideBank[crystal.name - 1] || 0n} className={'text-base md:text-lg'} />
										</motion.span>
									</div>

									<motion.div
										style={{
											height: `${85 * scale}px`, // Aumentei o tamanho das pedras
											objectFit: 'cover',
											marginBottom: '1px',
											transform: 'scaleY(-1) scaleX(-1)',
										}}
									>
										<crystal.image />
									</motion.div>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>

				<AnimatePresence mode="sync">
					{showCountdown && (
						<>
							<Time round={round} scale={scale} />

							<motion.div
								key="arrow"
								className="absolute w-full flex justify-center items-center"
								style={{
									top: `-${268 * scale}px`,
									zIndex: 5,
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
								zIndex: 5,
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
								className="font-semibold"
								style={{
									fontSize: `${24 * scale}px`,
									zIndex: 6,
								}}
							>
								You win:
							</h2>
							<div
								className="font-semibold"
								style={{
									fontSize: `${40 * scale}px`,
									color: '#FFD700',
									zIndex: 6,
								}}
							>
								500
							</div>
							<p
								className="font-semibold"
								style={{
									fontSize: `${20 * scale}px`,
									color: '#00BFFF',
									zIndex: 6,
								}}
							>
								Bonus
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Wheel;
