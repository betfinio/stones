import { usePotentialWinWithBonus } from '@/src/lib/gql';
import { useBetAmount, useCurrentRound, useSideBank } from '@/src/lib/query';
import { useSelectedStone } from '@/src/lib/query/state.ts';
import { getStoneImage } from '@/src/lib/utils';
import { BetValue } from '@betfinio/components/shared';
import { Tooltip, TooltipContent, TooltipTrigger } from '@betfinio/components/ui';
import { cx } from 'class-variance-authority';
import { CircleAlert } from 'lucide-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const colors = [
	{
		id: 1,
		color: 'hsl(var(--topaz-bg))',
		borderColor: 'hsl(var(--topaz-border))',
	},
	{
		id: 2,
		color: 'hsl(var(--zircon-bg))',
		borderColor: 'hsl(var(--zircon-border))',
	},
	{
		id: 3,
		color: 'hsl(var(--citrine-bg))',
		borderColor: 'hsl(var(--citrine-border))',
	},
	{
		id: 4,
		color: 'hsl(var(--emerald-bg))',
		borderColor: 'hsl(var(--emerald-border))',
	},
	{
		id: 5,
		color: 'hsl(var(--ruby-bg))',
		borderColor: 'hsl(var(--ruby-border))',
	},
];

const CardItem: FC<{ stone: number }> = ({ stone }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'cards' });

	const { data: round = 0 } = useCurrentRound();
	const { data: selectedStone = 1, setSelectedStone } = useSelectedStone();
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: amount = 10000 } = useBetAmount();

	const { win, bonus } = usePotentialWinWithBonus(amount, stone);

	const multiplier = useMemo(() => {
		return (win + bonus) / amount;
	}, [amount, win, bonus]);

	const handleClick = () => {
		setSelectedStone(stone);
	};

	const displayMultiplier = `${Number.isNaN(multiplier) ? 0 : multiplier.toFixed(2)}x`;

	return (
		<>
			<div
				className={cx('mt-5 py-3 px-1 flex flex-col text-xs md:hidden items-center justify-center border-2 rounded-lg cursor-pointer transition-all ease-in', {
					'border-border scale-110': selectedStone === stone,
					'opacity-70': selectedStone !== stone,
				})}
				style={{
					borderColor: colors[stone - 1].borderColor,
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
				}}
				onClick={() => handleClick()}
			>
				<img src={getStoneImage(stone) as string} alt={'stone'} className="h-7 mb-1" />
				<span className="block text-md font-normal tabular-nums">{displayMultiplier}</span>
				<div className="text-bonus text-xs font-medium whitespace-nowrap flex flex-row flex-nowrap items-center justify-center">
					+<BetValue prefix={'Bonus:'} value={bonus} className={'!text-bonus'} />
				</div>
			</div>

			<div
				className="hidden md:block group relative flex-shrink-0 text-foreground transition-all duration-300 w-36 transform mx-auto overflow-visible cursor-pointer"
				onClick={handleClick}
			>
				<Tooltip>
					<div className={cx('absolute right-1.5 top-1.5 z-20', { hidden: sideBank[stone - 1] })}>
						<TooltipTrigger>
							<CircleAlert className={'w-5 h-5 text-tertiary-foreground'} />
						</TooltipTrigger>
						<TooltipContent>{t('betFirst')}</TooltipContent>
					</div>
				</Tooltip>
				{/* Container giving the appearance of the crystal "floating" outside */}
				<div className="relative z-20">
					<div className="absolute left-1/2 transform -translate-x-1/2 -top-5 w-20 h-20 flex justify-center items-center">
						<img src={getStoneImage(stone)} alt={`crystal-${stone}`} className="h-16 z-40 group-hover:scale-110 transition-all duration-200 " />
						<div className="absolute w-14 h-14 rounded-full bg-bonus opacity-65 blur-xl" />
					</div>
				</div>
				{/* The card content below the crystal */}
				<div
					className={cx(
						'relative z-10 mt-8 flex flex-col border border-transparent items-center text-center bg-card rounded-xl p-4 pt-16 w-36 duration-300',
						selectedStone === stone && '!border-primary',
					)}
				>
					<span className="block text-md font-normal tabular-nums">{displayMultiplier}</span>
					<button
						type="button"
						className={cx(
							'border-2 border-border text-foreground text-sm capitalize px-1 py-2 rounded-lg mt-2 transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground w-full',
							selectedStone === stone && '!bg-primary !text-primary-foreground',
						)}
					>
						{selectedStone === stone ? t('selected') : t('select')}
					</button>
					<div className="flex w-fit items-center mt-4 h-4 mx-auto mb-2 text-sm gap-1">
						{t('win')}:
						<BetValue prefix={'Win:'} value={win} withIcon />
					</div>
					<div className="text-bonus text-xs md:text-sm font-medium whitespace-nowrap flex items-center gap-1">
						{t('bonus')}:
						<BetValue prefix={'Bonus:'} value={bonus} withIcon className={'!text-bonus'} iconClassName={'!text-bonus'} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CardItem;
