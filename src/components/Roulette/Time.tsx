import { getRoundTimes } from '@/src/lib/api';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { type FC, useEffect, useState } from 'react';

const Time: FC<{ round: number; scale: number }> = ({ round, scale }) => {
	const [_, end] = getRoundTimes(round);
	const [remaining, setRemaining] = useState('10:00');
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		if (round === 0) return;
		const interval = setInterval(() => {
			const now = Math.floor(Date.now() / 1000);
			const diff = end - now;
			if (diff < 0) {
				setRemaining('00:00');
				setLoaded(true);
				return;
			}
			setLoaded(true);
			const minutes = Math.floor(diff / 60);
			const seconds = diff % 60;
			setRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
		}, 300);
		return () => clearInterval(interval);
	}, [round]);

	return (
		<motion.div
			key="countdown"
			className="absolute flex flex-col text-center w-full text-white"
			style={{
				top: `-${420 * scale}px`,
				fontSize: `${20 * scale}px`,
				zIndex: 4,
			}}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1.2 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.3, stiffness: 500 }}
		>
			<span
				className={cx((!loaded || remaining === '00:00') && 'hidden')}
				style={{
					fontSize: `${14 * scale * 2}px`,
					lineHeight: `${17 * scale * 2}px`,
					opacity: 0.4,
				}}
			>
				Stop game in:
			</span>
			<span
				className={cx((!loaded || remaining === '00:00') && 'hidden')}
				style={{
					fontSize: `${30 * scale * 1.4}px`,
					lineHeight: `${36 * scale * 1.4}px`,
				}}
			>
				{remaining}
			</span>
		</motion.div>
	);
};

export default Time;
