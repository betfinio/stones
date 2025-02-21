import { EffectsLayer } from '@/src/components/Roulette/EffectsLayer.tsx';
import Time from '@/src/components/Roulette/Time';
import WinnerInfo from '@/src/components/Roulette/WinnerInfo.tsx';
import logger from '@/src/config/logger';
import { getRoundTimes } from '@/src/lib/api';
import { STONES } from '@/src/lib/global.ts';
import { useActualRound, useCurrentRound, useRoundBank, useRoundBets, useRoundStatus, useRoundWinner, useSideBank } from '@/src/lib/query';
import { useSelectedStone } from '@/src/lib/query/state.ts';
import { shootConfetti } from '@/src/lib/utils.ts';
import { StonesABI, ZeroAddress, arrayFrom } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Bet } from '@betfinio/ui';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useAccount, useWatchContractEvent } from 'wagmi';
import arrowdown from '../../assets/Roulette/arrow-down.svg';
import neonImage from '../../assets/Roulette/neon-glow.png';
import ComplexRoulette from './ComplexRoulette';
import CrystalAnimation1 from './Crystals/CrystalAnimation1';
import CrystalAnimation2 from './Crystals/CrystalAnimation2';
import CrystalAnimation3 from './Crystals/CrystalAnimation3';
import CrystalAnimation4 from './Crystals/CrystalAnimation4';
import CrystalAnimation5 from './Crystals/CrystalAnimation5';

const arrowRotations = [
	0,
	10,
	0,
	15,
	0,
	20,
	0,
	30,
	0,
	40,
	0,
	45,
	...[...arrayFrom(90).map(() => [0, 45])].flat(),
	0,
	30,
	0,
	30,
	0,
	20,
	0,
	10,
	0,
	10,
	0,
	5,
	0,
	5,
	0,
	0,
	0,
	0,
	0,
	0,
];
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

const baseSize = 1000;

const Wheel = () => {
	const controls = useAnimation();
	const arrowControls = useAnimation();

	const queryClient = useQueryClient();

	const { address = ZeroAddress } = useAccount();
	const { data: currentRound = 0 } = useCurrentRound();
	const { data: actualRound = 0 } = useActualRound();
	const { data: selectedStone, setSelectedStone } = useSelectedStone();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(currentRound);
	const { data: bank = 0n } = useRoundBank(currentRound);
	const { data: bets = [] } = useRoundBets(currentRound);
	const { data: winner = 0 } = useRoundWinner(currentRound);

	const [scale, setScale] = useState(1);

	const containerRef = useRef<HTMLDivElement>(null);

	const [showWinnerMessage, setShowWinnerMessage] = useState(false);
	const [showCountdown, setShowCountdown] = useState(true);

	const { data: status = 0 } = useRoundStatus(currentRound);
	const [_, end] = getRoundTimes(currentRound);
	useEffect(() => {
		if (status > 0 || end < Date.now() / 1000) {
			setShowWinnerMessage(true);
			setShowCountdown(false);
			setSelectedStone(winner || 1);
		} else if (actualRound === currentRound) {
			setShowCountdown(true);
			setShowWinnerMessage(false);
		}
	}, [status, currentRound, end, actualRound, winner]);

	useEffect(() => {
		const angle = crystals.find((crystal) => crystal.name === selectedStone)?.angle || 0;
		rotateWheel(-angle);
	}, [selectedStone]);

	useWatchContractEvent({
		abi: StonesABI,
		address: STONES,
		eventName: 'RequestedCalculation',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('Request detected', logs[0]);
			const round = Number.parseInt(logs[0].topics[1] || '0x0', 16);
			if (round !== currentRound) return;
			setShowCountdown(false);
			setShowWinnerMessage(false);
			startSpin();
		},
	});
	useWatchContractEvent({
		abi: StonesABI,
		address: STONES,
		eventName: 'WinnerCalculated',
		strict: true,
		onLogs: async (logs) => {
			logger.warn('Winner detected', logs[0]);
			const round = Number(logs[0].args.round);
			const side = Number(logs[0].args.side);
			if (round !== currentRound) return;
			const angle = crystals.find((crystal) => crystal.name === side)?.angle || 0;
			stopSpin(-angle).then(async () => {
				setSelectedStone(side);
				if (bets.find((bet) => bet.side === side && bet.player === address)) {
					shootConfetti();
				}
				setShowWinnerMessage(true);
				await queryClient.invalidateQueries({ queryKey: ['stones', 'round', round] });
			});
		},
	});

	const startSpin = () => {
		arrowControls
			.start({
				rotate: arrowRotations,
				transition: {
					duration: 26,
					ease: [0.2, 0, 0.8, 1],
				},
			})
			.then();
		return controls.start({
			rotate: 360 * 30,
			transition: {
				duration: 26,
				ease: [0.2, 0, 0.8, 1],
			},
		});
	};
	const stopSpin = async (angle: number) => {
		controls.stop();
		controls.set({ rotate: 0 });
		arrowControls.stop();
		arrowControls.start({
			rotate: [0, 30, 0, 30, 0, 20, 0, 10, 0, 10, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0],
			transition: {
				duration: 2,
				ease: [0.33, 1, 0.68, 1],
			},
		});
		await controls.start({
			rotate: 360 + angle,
			transition: {
				duration: 2,
				ease: [0.33, 1, 0.68, 1],
			},
		});
		arrowControls.stop();
	};

	const rotateWheel = (targetAngle: number) => {
		let rotationNeeded = targetAngle;
		if (rotationNeeded <= 0) {
			rotationNeeded += 360;
		}
		return controls.start({
			rotate: rotationNeeded,
			transition: {
				duration: 0.5,
				ease: [0.33, 1, 0.68, 1],
			},
		});
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
			key={'container'}
			ref={containerRef}
			className="relative mx-auto overflow-hidden"
			style={{
				width: '100%',
				height: `${500 * scale}px`,
				paddingTop: `${500 * scale}px`,
			}}
		>
			<EffectsLayer round={currentRound} />
			<div className={'relative w-full mx-auto aspect-square z-[3]'}>
				<motion.div
					key="wheel"
					className="relative mx-auto -translate-y-full cursor-pointer"
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
									onClick={() => setSelectedStone(crystal.name)}
									className="relative flex flex-col items-center justify-center space-y-2"
								>
									<div className="text-xs text-foreground transform -scale-y-100 -scale-x-100 space-x-[3%]">
										<motion.div
											className="absolute rounded-full bg-bonus opacity-[0.85] blur-xl"
											style={{
												width: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
												height: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
												top: `${-46 * scale}px`, // Ajusta a posição vertical conforme a escala
												left: `${22 * scale}px`, // Ajusta a posição horizontal conforme a escala
												transform: 'translate(-50%, -50%)',
											}}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{
												duration: 3, // Tempo total da animação
												ease: 'easeInOut', // Suavidade para a entrada e saída
												times: [0, 0.5, 1], // Define os momentos das transições
											}}
										/>
										<div className={'flex items-center gap-1 justify-center'}>
											<Bet className="z-20 aspect-square md:w-4 md:h-4 h-3 w-3 text-secondary-foreground" />
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
												<BetValue value={sideBank[crystal.name - 1] || 0n} className={'text-xs md:text-lg'} />
											</motion.span>
										</div>

										<div>
											<span className="text-xs opacity-60">{(Number((sideBank[crystal.name - 1] ?? 0n) * 100n) / Number(bank) || 0).toFixed(2)}%</span>
										</div>
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
					{showCountdown && <Time round={currentRound} scale={scale} />}
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
					{showWinnerMessage && <WinnerInfo round={currentRound} scale={scale} />}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Wheel;
