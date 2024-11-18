import bets from '@/src/assets/CardList/bets.svg';
import { useCurrentRound, useRoundBank, useSideBank, useSideBetsCount } from '@/src/lib/query';
import { useSelectedStone } from '@/src/lib/query/state.ts';
import { getStoneImage } from '@/src/lib/utils';
import { BetValue } from 'betfinio_app/BetValue';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const CardItem: FC<{ stone: number }> = ({ stone }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'cards' });

	const { data: round = 0 } = useCurrentRound();
	const { data: selectedStone, setSelectedStone } = useSelectedStone();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: betsCount = [0n, 0n, 0n, 0n, 0n] } = useSideBetsCount(round);
	const { data: bank = 0n } = useRoundBank(round);

	const handleClick = () => {
		setSelectedStone(stone);
	};

	const multiplier = Number(bank) / Number(sideBank[stone - 1]);
	const displayMultiplier = sideBank[stone - 1] === 0n ? '?' : `${multiplier.toFixed(2)}x`;

	return (
		<div className="group relative flex-shrink-0 text-white transition-all duration-300 w-36 transform mx-auto overflow-visible ">
			{/* Container giving the appearance of the crystal "floating" outside */}
			<div className="relative z-20">
				<div className="absolute left-1/2 transform -translate-x-1/2 -top-5 w-20 h-20 flex justify-center items-center">
					<img src={getStoneImage(stone)} alt={`crystal-${stone}`} className="h-16 z-40 group-hover:scale-110 transition-all duration-200 " />
					<div className="absolute w-14 h-14 rounded-full bg-blue-500 opacity-65 blur-xl" />
				</div>
			</div>
			{/* The card content below the crystal */}
			<div
				className={cx(
					'relative z-10 mt-8 flex flex-col border border-transparent items-center text-center bg-primaryLight rounded-xl p-4 pt-16 w-36 duration-300',
					selectedStone === stone && '!border-yellow-400',
				)}
			>
				<span className="block text-md font-normal tabular-nums">{displayMultiplier}</span>
				<button
					onClick={handleClick}
					type="button"
					className={cx(
						'border-2 border-yellow-400 text-white text-sm capitalize px-1 py-2 rounded-lg mt-2 transition-all duration-300 ease-out hover:bg-yellow-400 hover:text-black w-full',
						selectedStone === stone && '!bg-yellow-400 !text-black',
					)}
				>
					{selectedStone === stone ? t('selected') : t('select')}
				</button>
				<div className="flex w-fit items-center mt-4 h-4 mx-auto mb-2 text-sm">
					<BetValue prefix={'Pool:'} value={sideBank[stone - 1]} withIcon />
				</div>
				<div className="text-blue-500 text-sm font-medium whitespace-nowrap">
					<BetValue prefix={'Bonus:'} value={(sideBank[stone - 1] * 5n) / 100n} withIcon className={'!text-blue-500'} iconClassName={'!text-blue-500'} />
				</div>
				<div className="mt-2 space-y-1 text-sm text-gray-400">
					<div className="flex items-center justify-center space-x-1 text-nowrap">
						<img src={bets} alt={t('bets')} className="h-3" />
						<span className="text-xs opacity-60">
							{Number(betsCount[stone - 1])} {t('bets')}
						</span>
					</div>
					<div className="flex w-fit mx-auto items-center justify-center space-x-1 text-nowrap">
						{sideBank[stone - 1] > 0n ? (
							<span className="text-xs opacity-60">
								{(Number(sideBank[stone - 1] * 100n) / Number(bank)).toFixed(2)}% {t('probability')}
							</span>
						) : (
							<span className="text-xs opacity-60">?% {t('probability')}</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardItem;
