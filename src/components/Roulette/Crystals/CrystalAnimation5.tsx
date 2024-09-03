import { motion } from 'framer-motion';

const CrystalAnimation5 = () => {
	const pathVariants = {
		hidden: { opacity: 0, pathLength: 0, scale: 0.8, x: '0%', y: '-50%' },
		visible: (i: number) => ({
			opacity: 1,
			pathLength: 1,
			scale: 1,
			x: 0,
			y: 0,
			transition: {
				delay: i * 0.02,
				duration: 0.5,
				ease: 'easeInOut',
			},
		}),
	};

	return (
		<motion.svg
			width="43"
			height="60"
			viewBox="0 0 43 76"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			initial="hidden"
			animate="visible"
			className="w-full h-full"
		>
			<title className="hidden">Crystal Animation 5</title>
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
			<motion.path variants={pathVariants} custom={4} d="M42.6581 32.2795L35.0249 67.2705L37.3427 39.5412L42.6581 32.2795Z" fill="url(#paint4_linear_1_2185)" />
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
			<motion.path
				variants={pathVariants}
				custom={12}
				opacity="0.15"
				d="M22.8959 36.9005L34.549 35.251L37.3427 39.5411H29.3016L22.8959 36.9005Z"
				fill="#ED2424"
			/>
			<motion.path variants={pathVariants} custom={13} d="M20.3613 4.99448L22.8959 36.9005L21.3208 5.17989L20.8859 4.81226L20.3613 4.99448Z" fill="#FF7071" />
			<motion.path
				variants={pathVariants}
				custom={14}
				d="M21.7941 48.7513L23.3384 50.89L23.3051 75.5232L23.9695 50.8069L25.0995 47.8562L23.6116 50.3322L21.7941 48.7513Z"
				fill="#FF9898"
			/>
			{/* Continue adding the remaining paths following the same pattern */}
			<defs>
				<linearGradient id="paint0_linear_1_2185" x1="20.0183" y1="0.020232" x2="20.7318" y2="4.47805" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C92C2D" />
					<stop offset="1" stopColor="#FF2222" />
				</linearGradient>
				<linearGradient id="paint1_linear_1_2185" x1="32.6588" y1="36.2356" x2="30.0567" y2="1.5072" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CA2021" />
					<stop offset="0.5" stopColor="#FB7374" />
					<stop offset="1" stopColor="#CC2526" />
				</linearGradient>
				<linearGradient id="paint2_linear_1_2185" x1="10.0721" y1="22.0624" x2="21.6096" y2="22.7121" gradientUnits="userSpaceOnUse">
					<stop stopColor="#EE5E5F" />
					<stop offset="1" stopColor="#BE0000" />
				</linearGradient>
				<linearGradient id="paint3_linear_1_2185" x1="16.3544" y1="43.7508" x2="29.3016" y2="43.7508" gradientUnits="userSpaceOnUse">
					<stop stopColor="#EE5E5F" />
					<stop offset="1" stopColor="#E11717" />
				</linearGradient>
				<linearGradient id="paint4_linear_1_2185" x1="35.0255" y1="49.7752" x2="42.6576" y2="49.7752" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CA2224" />
					<stop offset="1" stopColor="#F03C3E" />
				</linearGradient>
				<linearGradient id="paint5_linear_1_2185" x1="23.3049" y1="57.5326" x2="37.3424" y2="57.5326" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CA1D1F" />
					<stop offset="1" stopColor="#F45C5E" />
				</linearGradient>
				<linearGradient id="paint6_linear_1_2185" x1="0" y1="54.4792" x2="23.7138" y2="54.4792" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CE282A" />
					<stop offset="1" stopColor="#BC2B2D" />
				</linearGradient>
				<linearGradient id="paint7_linear_1_2185" x1="31.3051" y1="58.5168" x2="19.2214" y2="56.9857" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C12729" />
					<stop offset="1" stopColor="#EF4344" />
				</linearGradient>
				<linearGradient id="paint8_linear_1_2185" x1="24.9232" y1="34.0916" x2="19.8559" y2="45.6651" gradientUnits="userSpaceOnUse">
					<stop stopColor="#D72223" />
					<stop offset="1" stopColor="#DA2E2F" />
				</linearGradient>
				<linearGradient id="paint9_linear_1_2185" x1="12.1086" y1="33.4302" x2="8.71162" y2="39.185" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C81D1E" />
					<stop offset="1" stopColor="#FF797A" />
				</linearGradient>
				<linearGradient id="paint10_linear_1_2185" x1="31.3413" y1="31.5275" x2="37.4289" y2="39.8914" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CA2223" />
					<stop offset="1" stopColor="#F55354" />
				</linearGradient>
				<linearGradient id="paint11_linear_1_2185" x1="36.4042" y1="33.6081" x2="16.4797" y2="6.3787" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C61D1E" />
					<stop offset="0.5" stopColor="#ED4D4F" />
					<stop offset="1" stopColor="#CF2829" />
				</linearGradient>
				<linearGradient id="paint12_linear_1_2185" x1="16.3544" y1="43.7508" x2="29.3016" y2="43.7508" gradientUnits="userSpaceOnUse">
					<stop stopColor="#DF1314" />
					<stop offset="1" stopColor="#EE5E5F" />
				</linearGradient>
			</defs>
		</motion.svg>
	);
};

export default CrystalAnimation5;
