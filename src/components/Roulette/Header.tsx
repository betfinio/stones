import { useMediaQuery } from 'react-responsive';
import howtoplay from '../../assets/Roulette/howtoplay.svg';
import playtable from '../../assets/Roulette/playtable.svg';
import report from '../../assets/Roulette/report.svg';

const Header = ({ roundID, winningPool, bonusPool }: any) => {
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

	return (
		<>
			{isMobile ? (
				// Mobile Layout
				<div className="flex w-full flex-row justify-between items-start bg-[#131624] text-white p-4 rounded-xl z-10">
					<div className="flex flex-col items-start space-y-2">
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px]">Round ID</span>
							<span className="text-xs leading-[16.56px] font-bold">{roundID}</span>
						</div>
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px] font-semibold text-yellow-500">WINNING POOL</span>
							<span className="text-xs leading-[16.56px] font-bold">{winningPool}</span>
						</div>
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px] font-semibold text-blue-500">BONUS POOL</span>
							<span className="text-xs leading-[16.56px] font-bold">{bonusPool}</span>
						</div>
					</div>
					<div className="flex flex-col items-start space-y-7">
						<div className="flex flex-row items-center space-x-1">
							<img src={playtable} alt="Paytable" className="w-[20px]" />
							<span className="text-[14px]">Paytable</span>
						</div>
						<div className="flex flex-row items-center space-x-1">
							<img src={howtoplay} alt="How to play" className="w-[20px]" />
							<span className="text-[14px]">How to play</span>
						</div>
						<div className="flex flex-row items-center space-x-1">
							<img src={report} alt="Report" className="w-[20px]" />
							<span className="text-[14px]">Report</span>
						</div>
					</div>
				</div>
			) : (
				// Desktop and Tablet Layout
				<div className="flex w-full justify-between items-center bg-[#131624] text-white p-4 rounded-xl z-10">
					<div className="flex items-center justify-between space-x-8">
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px]">Round ID</span>
							<span className="text-xs leading-[16.56px] font-bold">{roundID}</span>
						</div>
						<div className="bg-white w-[1px] h-[32px]" />
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px] font-semibold text-yellow-500">WINNING POOL</span>
							<span className="text-xs leading-[16.56px] font-bold">{winningPool}</span>
						</div>
						<div className="bg-white w-[1px] h-[32px]" />
						<div className="flex flex-col items-start">
							<span className="text-[14px] leading-[19.32px] font-semibold text-blue-500">BONUS POOL</span>
							<span className="text-xs leading-[16.56px] font-bold">{bonusPool}</span>
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<div className="flex flex-col items-center">
							<img src={playtable} alt="Paytable" className="w-[20px]" />
							<span className="text-[14px]">Paytable</span>
						</div>
						<div className="flex flex-col items-center">
							<img src={howtoplay} alt="How to play" />
							<span className="text-[14px]">How to play</span>
						</div>
						<div className="flex flex-col items-center">
							<img src={report} alt="Report" />
							<span className="text-[14px]">Report</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
