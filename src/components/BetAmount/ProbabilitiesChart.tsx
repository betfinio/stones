import crystal1 from '@/src/assets/Roulette/crystal1.svg';
import crystal2 from '@/src/assets/Roulette/crystal2.svg';
import crystal3 from '@/src/assets/Roulette/crystal3.svg';
import crystal4 from '@/src/assets/Roulette/crystal4.svg';
import crystal5 from '@/src/assets/Roulette/crystal5.svg';
import { useRoundBank } from '@/src/lib/query';
import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';
import type { FC } from 'react';

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};
const ProbabilitiesChart: FC<{ round: number; pie: any[] }> = ({ round, pie }) => {
	const { data: bank = 0n } = useRoundBank(round);
	const isEmpty = bank === 0n;

	const tooltip = ({ datum }: { datum: any }) => {
		if (isEmpty) return null;
		return (
			<div
				className="flex items-center justify-center space-x-2 p-2 rounded-lg text-foreground"
				style={{
					border: `2px solid ${datum.data.borderColor}`,
					backgroundColor: 'hsl(var(--popover))',
				}}
			>
				<img src={images[`crystal${pie.findIndex((item) => item.id === datum.id) + 1}`]} alt={datum.id} className="h-5" />
				<div className="flex flex-col items-center justify-center tabular-nums">
					<span>
						<strong>{datum.id}</strong>:
					</span>
					<span>{datum.value.toFixed(2)}%</span>
				</div>
			</div>
		);
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 1 }}
			className="flex flex-col justify-center items-center bg-card rounded-lg h-[110px]"
		>
			<div className="flex flex-row h-[110px] items-center justify-center py-3">
				{/* Crystal List */}
				<div className="flex flex-col justify-between h-full ml-5">
					{pie.map((item, index) => (
						<div key={index} className="flex items-center space-x-2">
							<img src={images[`crystal${index + 1}`]} alt={'stone'} className="w-2" />
							<span className="text-foreground text-sm font-medium tabular-nums">{isEmpty ? 0 : item.value.toFixed(2)}%</span>
						</div>
					))}
				</div>

				{/* Pie Chart with Tooltip */}
				<div className="flex h-[110px] w-[110px] py-2">
					<ResponsivePie
						startAngle={-115}
						data={pie}
						margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
						innerRadius={0.45}
						padAngle={4}
						cornerRadius={1}
						activeOuterRadiusOffset={0}
						borderWidth={1}
						borderColor={({ data }) => data.borderColor}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={{ datum: 'data.color' }}
						tooltip={tooltip} // Corrected tooltip logic
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default ProbabilitiesChart;
