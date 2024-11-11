import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ComplexRoulette = () => {
	const sections = 10;
	const radius = 150;
	const center = radius;
	const angle = 360 / sections;

	const colors = ['#201C40', '#0F121D'];
	const darkerColors = ['#151232', '#0B0E18'];

	const generateSections = () => {
		const paths = [];
		for (let i = 0; i < sections; i++) {
			const startAngle = i * angle;
			const endAngle = startAngle + angle;

			const start = polarToCartesian(center, center, radius, endAngle);
			const end = polarToCartesian(center, center, radius, startAngle);

			const d = [`M ${center} ${center}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`, 'Z'].join(' ');

			paths.push(
				<motion.path
					key={i}
					d={d}
					fill={colors[i % colors.length]}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						delay: i * 0.1,
						duration: 1.5,
						ease: 'easeOut',
					}}
				/>,
			);
		}
		return paths;
	};

	const generateInnerBorders = () => {
		const borders = [];
		const innerRadius = radius * 0.57;
		for (let i = 0; i < sections; i++) {
			const startAngle = i * angle;
			const endAngle = startAngle + angle;

			const start = polarToCartesian(center, center, innerRadius, endAngle);
			const end = polarToCartesian(center, center, innerRadius, startAngle);

			const d = [`M ${center} ${center}`, `L ${start.x} ${start.y}`, `A ${innerRadius} ${innerRadius} 0 0 0 ${end.x} ${end.y}`, 'Z'].join(' ');

			borders.push(
				<motion.path
					key={`border-${i}`}
					d={d}
					fill={darkerColors[i % darkerColors.length]}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						delay: i * 0.1 + 0.2,
						duration: 1.5,
						ease: 'easeOut',
					}}
				/>,
			);
		}
		return borders;
	};

	const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: cx + r * Math.cos(angleInRadians),
			y: cy + r * Math.sin(angleInRadians),
		};
	};

	const { t } = useTranslation('stones', { keyPrefix: 'roulette' });

	return (
		<motion.svg
			initial={{ opacity: 0, rotate: 360 }}
			animate={{ opacity: 1, rotate: 18 }}
			transition={{
				type: 'tween',
				ease: 'circOut',
				duration: 2,
			}}
			width={radius * 2.2}
			height={radius * 2.2}
			viewBox={`0 0 ${radius * 2.2} ${radius * 2.2}`}
			className="w-full h-full"
		>
			<title className="hidden">{t('animation')}</title>
			<defs>
				<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
					<stop offset="0%" style={{ stopColor: '#1C223A', stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: '#0F1221', stopOpacity: 1 }} />
				</radialGradient>
			</defs>

			<g transform={`translate(${radius * 0.1}, ${radius * 0.1})`}>
				{generateSections()}
				{generateInnerBorders()}

				<motion.circle
					cx={center}
					cy={center}
					r={radius * 0.5}
					fill="url(#grad1)"
					stroke="#201C40"
					strokeWidth="4"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 1, duration: 1 }}
				/>

				<motion.circle
					cx={center}
					cy={center}
					r={radius}
					fill="none"
					stroke="#131624"
					strokeWidth="4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1.5 }}
				/>
			</g>
		</motion.svg>
	);
};

export default ComplexRoulette;
