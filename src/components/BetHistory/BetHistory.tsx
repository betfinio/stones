import BetsTab from '@/src/components/BetHistory/BetsTab';
import BonusTab from '@/src/components/BetHistory/BonusTab';
import PlayersTab from '@/src/components/BetHistory/PlayersTab';
import { useCurrentRound } from '@/src/lib/query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'betfinio_app/tabs';
import { useTranslation } from 'react-i18next';

const BetHistory = () => {
	const { t } = useTranslation('', { keyPrefix: 'stones.history.tabs' });
	const { data: round = 0 } = useCurrentRound();
	return (
		<div className="w-full lg:h-[650px] p-2 md:p-3">
			<Tabs defaultValue={'bets'} className={'min-w-[300px] md:max-w-[350px]'}>
				<TabsList className={'w-full bg-transparent justify-between gap-2 grid grid-cols-3'}>
					<TabsTrigger className={'bg-primary'} variant={'contained'} value={'bets'}>
						{t('bets')}
					</TabsTrigger>
					<TabsTrigger className={'bg-primary'} variant={'contained'} value={'players'}>
						{t('players')}
					</TabsTrigger>
					<TabsTrigger className={'bg-primary'} variant={'contained'} value={'bonuses'}>
						{t('bonus')}
					</TabsTrigger>
				</TabsList>
				<TabsContent value={'players'} className={'overflow-hidden'}>
					<PlayersTab round={round} />
				</TabsContent>
				<TabsContent value={'bets'} className={'overflow-hidden'}>
					<BetsTab round={round} />
				</TabsContent>
				<TabsContent value={'bonuses'} className={'overflow-hidden'}>
					<BonusTab round={round} />
				</TabsContent>
			</Tabs>

			{/* Bet History List */}
			{/*<div className="relative mx-auto">*/}
			{/*	<motion.div*/}
			{/*		key={activeTab}*/}
			{/*		initial={{ opacity: 0, y: 20 }}*/}
			{/*		animate={{ opacity: 1, y: 0 }}*/}
			{/*		transition={{ duration: 0.5 }}*/}
			{/*		className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"*/}
			{/*	>*/}
			{/*		{data.map((item, index) => (*/}
			{/*			<motion.div*/}
			{/*				key={item.id}*/}
			{/*				className={`flex items-center justify-between p-4 mb-2 rounded-xl border-2 ${index % 2 === 0 ? 'bg-[#1a1f3d]' : 'bg-primaryLight'} ${*/}
			{/*					isPlayerData(item) || isBonusData(item)*/}
			{/*						? item.trophy === 'gold_trophy'*/}
			{/*							? 'border-yellow-500'*/}
			{/*							: item.trophy === 'silver_trophy'*/}
			{/*								? 'border-gray-400'*/}
			{/*								: item.trophy === 'bronze_trophy'*/}
			{/*									? 'border-[#cd7f32]'*/}
			{/*									: 'border-transparent'*/}
			{/*						: 'border-transparent'*/}
			{/*				}`}*/}
			{/*				initial={{ opacity: 0, y: 20 }}*/}
			{/*				animate={{ opacity: 1, y: 0 }}*/}
			{/*				transition={{ duration: 0.2, delay: index * 0.1 }}*/}
			{/*				style={{ width: '100%', height: '78px' }}*/}
			{/*			>*/}
			{/*				<div className="flex items-center space-x-4">*/}
			{/*					<img src={foxIcon} alt="fox" className="h-h-6" />*/}
			{/*					<div className="flex flex-col w-fit pr-1">*/}
			{/*						<span className="text-white text-[12px] font-semibold flex items-center">*/}
			{/*							{item.nickname.replace(/(.{5}).*(.{4})/, '$1..$2')}*/}
			{/*							{(isPlayerData(item) || isBonusData(item)) && item.trophy && <img src={icons[item.trophy]} alt="trophy" className="h-[16px] ml-2" />}*/}
			{/*						</span>*/}
			{/*						/!* biome-ignore lint/a11y/useValidAnchor: <explanation> *!/*/}
			{/*						<a href="#" className="block text-gray-400 text-[12px]">*/}
			{/*							{item.address}*/}
			{/*						</a>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*				<div className="text-right">*/}
			{/*					{isPlayerData(item) && (*/}
			{/*						<div className="">*/}
			{/*							<div className="flex w-full items-center justify-end space-x-1">*/}
			{/*								<span className="text-white text-[12px] opacity-60">share:</span>*/}
			{/*								<span className="text-[12px] opacity-60">{item.share}</span>*/}
			{/*							</div>*/}
			{/*							<div className="flex">*/}
			{/*								<span className="text-white text-[12px] font-semibold block whitespace-nowrap tabular-nums">{item.amount}</span>*/}
			{/*								<img src={cash} alt="icon" className="h-[14px] ml-1 inline-block" />*/}
			{/*							</div>*/}
			{/*						</div>*/}
			{/*					)}*/}
			{/*					{isBonusData(item) && (*/}
			{/*						<div className="flex flex-col space-y-2 text-right">*/}
			{/*							<div className="flex items-center justify-end">*/}
			{/*								<span className="text-blue-500 text-[12px] font-semibold">{item.amount}</span>*/}
			{/*								<img src={cashBlue} alt="icon" className="h-[14px] ml-1 inline-block" />*/}
			{/*							</div>*/}
			{/*							<div className="flex items-center justify-end">*/}
			{/*								<span className="text-yellow-500 text-[12px] font-semibold">{item.bonus}</span>*/}
			{/*								<img src={cash} alt="icon" className="h-[14px] ml-1 inline-block" />*/}
			{/*							</div>*/}
			{/*						</div>*/}
			{/*					)}*/}
			{/*					{isBetData(item) && (*/}
			{/*						<div className="flex flex-col items-end">*/}
			{/*							<div className="flex items-center space-x-2">*/}
			{/*								<span className="text-yellow-500 text-[12px] font-semibold">{item.bet}</span>*/}
			{/*								<img src={cash} alt="icon" className="h-[16px] ml-1 inline-block" />*/}
			{/*							</div>*/}
			{/*							<img src={icons[item.crystal]} alt="crystal" className="h-[22px] mt-1 inline-block" />*/}
			{/*						</div>*/}
			{/*					)}*/}
			{/*				</div>*/}
			{/*			</motion.div>*/}
			{/*		))}*/}
			{/*	</motion.div>*/}

			{/*	/!* Gradient Overlay *!/*/}
			{/*	<div*/}
			{/*		className="absolute top-0 left-0 w-full h-full pointer-events-none"*/}
			{/*		style={{*/}
			{/*			background: 'linear-gradient(to bottom, transparent, #131624)',*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*</div>*/}
		</div>
	);
};

export default BetHistory;
