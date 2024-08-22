import blueIcon from '../../assets/BetSummary/tip-blue.svg';
import greenIcon from '../../assets/BetSummary/user-green.svg';
import yellowIcon from '../../assets/Roulette/cash.svg';
import mockBetSummary from '../../mocks/mockBetSummary.json';

// Define a type for the icon keys
type IconKey = 'yellowIcon' | 'greenIcon' | 'blueIcon';

const icons: Record<IconKey, string> = {
	yellowIcon,
	greenIcon,
	blueIcon,
};

const BetSummary = () => {
	const { metrics, betInfo } = mockBetSummary;

	return (
		<div className="w-full bg-[#131624] p-4 rounded-lg shadow-md mt-8">
			<div className="flex justify-between mb-4">
				{metrics.map((metric) => (
					<div key={metric.id} className="flex items-center">
						<span className="text-[16px] font-semibold mr-2" style={{ color: metric.color }}>
							{metric.value}
						</span>
						<img
							src={icons[metric.icon as IconKey]} // Ensure metric.icon is typed correctly
							alt={`${metric.icon} Icon`}
							className="h-[20px]"
						/>
					</div>
				))}
			</div>

			<div className="grid grid-cols-2 gap-4">
				{/* Left Box */}
				<div className="bg-[#0F121D] p-2 rounded-lg flex flex-col items-center">
					<span className="text-[#7C8A9E] text-[14px] font-medium mb-1">{betInfo.yourBet.label}</span>
					<span className="text-[16px] font-semibold" style={{ color: betInfo.yourBet.color }}>
						{betInfo.yourBet.value}
					</span>
				</div>

				{/* Right Box */}
				<div className="bg-[#0F121D] p-2 rounded-lg flex flex-col items-center">
					<span className="text-[#7C8A9E] text-[14px] font-medium mb-2 tabular-nums">{betInfo.potentialWin.label}</span>
					<span className="text-[16px] font-semibold" style={{ color: betInfo.potentialWin.valueColor }}>
						<span style={{ color: betInfo.potentialWin.valueColor }}>{betInfo.potentialWin.value}</span>
						<span style={{ color: betInfo.potentialWin.valueColor }}>({betInfo.potentialWin.multiplier})</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default BetSummary;
