import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

const ExplosionAnimation = () => {
	const [explode, setExplode] = useState(false);

	const pathVariants = {
		initial: {
			x: 0,
			y: 0,
			scale: 1,
			opacity: 1,
		},
		exploded: (i: number) => ({
			x: Math.cos(i) * 200, // Movimenta o pedaço para uma direção baseada no índice
			y: Math.sin(i) * 200, // Movimenta o pedaço para uma direção baseada no índice
			scale: 0.5, // Reduz o tamanho para 50%
			opacity: 0, // Desaparece gradualmente
			transition: {
				x: { type: 'spring', stiffness: 50, damping: 20 },
				y: { type: 'spring', stiffness: 50, damping: 20 },
				scale: { duration: 1 },
				opacity: { duration: 1.5 },
			},
		}),
	};

	const triggerExplosion = () => {
		setExplode(true);
		setTimeout(() => setExplode(false), 2000); // Reset da explosão após 2 segundos
	};

	return (
		<div style={{ position: 'relative', width: '550px', height: '550px' }} onClick={triggerExplosion}>
			<AnimatePresence>
				<motion.svg
					className="w-full h-full"
					key="crystal"
					width="43"
					height="76"
					viewBox="0 0 43 76"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					initial="initial"
					animate={explode ? 'exploded' : 'initial'}
				>
					<title className="hidden">Crystal Explosion Animation</title>
					<motion.path
						variants={pathVariants}
						custom={0}
						d="M16.6274 1.74493L20.9886 5.54117L23.8502 2.56971L20.9886 0.753906L16.6274 1.74493Z"
						fill="url(#paint0_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={1}
						d="M22.8959 36.9007L20.9885 5.54128L23.8502 2.56982L38.0585 31.5364L42.6581 32.2796L37.3427 39.5413H29.3016L22.8959 36.9007Z"
						fill="url(#paint1_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={2}
						opacity="0.5"
						d="M22.8959 36.9005L16.3542 43.5036L0 33.4351L3.61203 30.8761L15.9668 3.22021L16.6274 1.74487L19.1312 3.92352L20.9885 5.54112L22.8959 36.9005Z"
						fill="url(#paint2_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={3}
						d="M29.3016 39.5412L23.7143 50.6007L16.3542 43.5037L22.8959 36.9006L29.3016 39.5412Z"
						fill="url(#paint3_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={4}
						d="M42.6581 32.2795L35.0249 67.2705L37.3427 39.5412L42.6581 32.2795Z"
						fill="url(#paint4_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={5}
						d="M29.3016 39.541L23.7142 50.6005L23.3051 75.523L29.4376 70.2418L29.3696 68.7569L35.0249 67.2704L37.3427 39.541H29.3016Z"
						fill="url(#paint5_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={6}
						d="M0 33.4351L9.40334 70.4065L23.305 75.523L23.7142 50.6005L16.3542 43.5035L0 33.4351Z"
						fill="url(#paint6_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={7}
						d="M29.4376 70.2418L29.3016 39.541L23.7142 50.6005L23.3051 75.523L29.4376 70.2418Z"
						fill="url(#paint7_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={8}
						d="M29.3016 39.5412L23.7143 50.6007L16.3542 43.5037L22.8959 36.9006L29.3016 39.5412Z"
						fill="url(#paint8_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={9}
						d="M22.8959 36.9007L3.61203 30.8762L0 33.4353L16.3542 43.5037L22.8959 36.9007Z"
						fill="url(#paint9_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={10}
						d="M22.8959 36.9007L34.549 35.2511L38.0585 31.5364L42.6582 32.2796L37.3427 39.5413H29.3016L22.8959 36.9007Z"
						fill="url(#paint10_linear_1_2185)"
					/>
					<motion.path
						variants={pathVariants}
						custom={11}
						d="M20.9885 5.54129L34.549 35.2511L38.0585 31.5364L23.8502 2.56982L20.9885 5.54129Z"
						fill="url(#paint11_linear_1_2185)"
					/>
				</motion.svg>
			</AnimatePresence>
		</div>
	);
};

export default ExplosionAnimation;
