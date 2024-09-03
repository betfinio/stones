import { useCurrentRound, useRoundBank } from '@/src/lib/query';
import { BetValue } from 'betfinio_app/BetValue';
import { useMediaQuery } from 'react-responsive';
import { CircleAlert, CircleHelp, TriangleAlert } from 'lucide-react';

const Header = () => {
	const { data: round = 0 } = useCurrentRound();
	const { data: bank = 0n } = useRoundBank(round);
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
	return (
		<>
			{isMobile ? (
				// Mobile Layout
				<div className="flex w-full flex-row justify-between items-start bg-primaryLight text-white p-4 rounded-xl ">
					<div className="flex flex-col items-start space-y-2">
						<div className="flex flex-col items-start">
							<span className="">Round ID</span>
							<span className="text-xs  font-semibold text-gray-400">#{round}</span>
						</div>
						<div className="flex flex-col items-start">
							<span className=" font-semibold text-yellow-500">WINNING POOL</span>
							<span className="text-xs  font-semibold">
								<BetValue value={bank} withIcon iconClassName={'w-3 h-3'} />
							</span>
						</div>
						<div className="flex flex-col items-start">
							<span className=" font-semibold text-blue-500">BONUS POOL</span>
							<span className="text-xs  font-semibold">
								<BetValue value={(bank * 5n) / 100n} withIcon iconClassName={'w-3 h-3'} />
							</span>
						</div>
					</div>
					<div className="flex flex-col items-start space-y-7">
						<div className="flex flex-row items-center space-x-1">
							<CircleHelp className={'w-5 h-5'} />
							<span className="text-[14px]">Paytable</span>
						</div>
						<div className="flex flex-row items-center space-x-1">
							<CircleAlert className={'w-5 h-5'} />
							<span className="text-[14px]">How to play</span>
						</div>
						<div className="flex flex-row items-center space-x-1">
							<TriangleAlert className={'w-5 h-5'} />
							<span className="text-[14px]">Report</span>
						</div>
					</div>
				</div>
			) : (
				// Desktop and Tablet Layout
				<div className="flex w-full justify-between items-center bg-primaryLight text-white p-4 rounded-xl border border-gray-800">
					<div className="flex items-center justify-between space-x-8">
						<div className="flex flex-col items-start">
							<span className="">Round ID</span>
							<span className="text-xs  font-semibold text-gray-400">#{round}</span>
						</div>
						<div className="bg-white w-[1px] h-[32px]" />
						<div className="flex flex-col items-start">
							<span className=" font-semibold text-yellow-500">Winning Pool</span>
							<span className="text-xs  font-semibold">
								<BetValue value={bank} withIcon iconClassName={'w-3 h-3'} />
							</span>
						</div>
						<div className="bg-white w-[1px] h-[32px]" />
						<div className="flex flex-col items-start">
							<span className=" font-semibold text-blue-500">Bonus Pool</span>
							<span className="text-xs  font-semibold">
								<BetValue value={(bank * 5n) / 100n} withIcon iconClassName={'w-3 h-3'} />
							</span>
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<div className="flex flex-col items-center">
							<CircleHelp className={'w-5 h-5'} />
							<span className="text-[14px]">Paytable</span>
						</div>
						<div className="flex flex-col items-center">
							<CircleAlert className={'w-5 h-5'} />
							<span className="text-[14px]">How to play</span>
						</div>
						<div className="flex flex-col items-center">
							<TriangleAlert className={'w-5 h-5'} />
							<span className="text-[14px]">Report</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
