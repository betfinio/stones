import { ETHSCAN } from '@/src/lib/global.ts';
import { useDistributedInRound, useRoundBank, useRoundBets, useRoundWinner, useSideBank, useSideBonusShares } from '@/src/lib/query';
import { useDistribute } from '@/src/lib/query/mutations.ts';
import type { StonesBet } from '@/src/lib/types.ts';
import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Button } from '@betfinio/components/ui';
import { Bet } from '@betfinio/ui';
import { cx } from 'class-variance-authority';
import { UserIcon } from 'lucide-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import bronzeTrophy from '../../assets/BetHistory/trophy-bronze.svg';
import goldTrophy from '../../assets/BetHistory/trophy-gold.svg';
import silverTrophy from '../../assets/BetHistory/trophy-silver.svg';
import figureImage from '../../assets/BetRanking/duck-winner.png';
import crystalImage from '../../assets/Roulette/crystal1.svg';

const BetRanking: FC<{ round: number }> = ({ round }) => {
	const { t } = useTranslation('stones', { keyPrefix: 'betRanking' });
	const { data: bank = 0n } = useRoundBank(round);
	const { data: bets = [], isLoading: areBetsLoading } = useRoundBets(round);
	const { data: winner = 0 } = useRoundWinner(round);
	const { data: distributed = 0n } = useDistributedInRound(round);
	const { data: sideBank = [0n, 0n, 0n, 0n, 0n] } = useSideBank(round);
	const { data: sideBonusShares = [0n, 0n, 0n, 0n, 0n] } = useSideBonusShares(round);
	const winBank = (bank * 914n) / 1000n;
	const bonusBank = (bank * 5n) / 100n;
	const { address = ZeroAddress } = useAccount();
	const winnerSideBank = sideBank[winner - 1];
	const winnerSideBonusShares = sideBonusShares[winner - 1];
	const { mutate } = useDistribute();

	const winBets: StonesBet[] = useMemo(() => {
		const filteredBets = bets.filter((bet) => bet.side === winner);
		const sortedWinBets = filteredBets.sort((a, b) => Number(a.created) - Number(b.created));

		const winnerSideBank = sortedWinBets.reduce((acc, bet) => acc + BigInt(bet.amount), 0n);

		let totalBonusShares = 0n;
		const bonusSharesPerBet = sortedWinBets.map((bet, index) => {
			const betAmount = BigInt(bet.amount);
			const bonusShare = betAmount * BigInt(sortedWinBets.length - index);
			totalBonusShares += bonusShare;
			return { bet, bonusShare };
		});

		const betsWithBonuses = bonusSharesPerBet.map(({ bet, bonusShare }, index) => {
			const betAmount = BigInt(bet.amount);
			const winnings = (betAmount * winBank) / (winnerSideBank || 1n);

			const bonus = totalBonusShares > 0n ? (bonusShare * bonusBank) / totalBonusShares : 0n;

			return {
				...bet,
				bonus,
				result: winnings,
			};
		});

		const aggregatedBetsMap = new Map<Address, StonesBet>();

		for (const bet of betsWithBonuses) {
			const playerKey = bet.player.toLowerCase() as Address;

			if (!aggregatedBetsMap.has(playerKey)) {
				aggregatedBetsMap.set(playerKey, {
					...bet,
					amount: 0n,
					result: 0n,
					bonus: 0n,
				});
			}

			const existingBet = aggregatedBetsMap.get(playerKey);
			if (!existingBet) continue;

			existingBet.amount += BigInt(bet.amount);
			existingBet.result += bet.result;
			if (existingBet.bonus) {
				existingBet.bonus += bet.bonus;
			} else {
				existingBet.bonus = bet.bonus;
			}
		}

		const aggregatedWinBets = Array.from(aggregatedBetsMap.values());

		aggregatedWinBets.sort((a, b) => Number(b.amount) - Number(a.amount));

		return aggregatedWinBets.slice(0, 3);
	}, [bets, winner, winBank, bonusBank]);

	const trophyImages: string[] = [goldTrophy, silverTrophy, bronzeTrophy];

	const getTrophyImage = (badge: number): string | undefined => {
		if (trophyImages[badge]) {
			return trophyImages[badge];
		}
		return undefined;
	};

	const handleDistribute = () => {
		mutate({ round });
	};

	const userWon = useMemo(() => {
		return winBets.find((bet) => bet.player === address);
	}, [winBets]);

	return (
		<>
			<div className="flex flex-col md:flex-row w-full space-x-2 items-center justify-around my-8 px-2 gap-8 lg:gap-2 xl:gap-8">
				{/* Left Side */}
				<div className={cx('flex w-full max-w-[380px] h-full items-center justify-around rounded-xl border-2 border-border')}>
					<div className="flex flex-col justify-center items-center space-y-2 h-[223px] py-4">
						{userWon ? (
							<div className="flex flex-col w-full items-center space-y-2">
								<img src={crystalImage} alt="Crystal" className="h-15 w-12" />
								<div className="flex flex-col items-center">
									<div className="flex flex-row gap-2 items-center text-secondary-foreground text-sm font-semibold">
										<BetValue value={bank} withIcon /> {t('totalBank')}
									</div>
									<div className="flex items-center text-tertiary-foreground text-[12px] font-semibold">
										<span className="mr-1">
											{bets.length} {t('bets')}
										</span>
										<UserIcon className={'w-4 h-4'} />
									</div>
								</div>
							</div>
						) : (
							<div className={'grow flex items-center'}>{t('roundOver')}</div>
						)}

						<div className="flex flex-col items-center justify-center">
							<div className="flex w-full items-center justify-center text-foreground font-semibold ">
								{userWon ? <span className={'text-2xl uppercase'}>{t('win')}</span> : <span>{t('couldWin')}</span>}
							</div>
							<div className="flex items-center w-full text-secondary-foreground font-semibold flex-row gap-1 justify-center">
								<BetValue value={winBank} />
								<Bet className={'text-secondary-foreground w-4 h-4'} />
							</div>
							<div className="text-bonus flex items-center justify-center text-xs mt-1 font-semibold gap-1">
								<BetValue prefix={'Bonus: '} value={bonusBank} withIcon iconClassName={'!text-bonus !w-3 !h-3'} />
								<span className={'uppercase'}>{t('bonus')}</span>
							</div>
						</div>
					</div>
					<img src={figureImage} alt="Figure" className="h-[223px] w-[133px]" />
				</div>

				{/* Right Side - Ranking List */}
				<div className={cx('w-full flex flex-col gap-2', { 'aimate-pulse blur-sm': areBetsLoading })}>
					<div className={'flex justify-center '}>{t('topWinners', { count: winBets.length })}</div>
					<div className="w-full flex flex-col space-y-2">
						{/* Header */}
						<div className="flex justify-between text-tertiary-foreground text-[12px] px-4 py-2 capitalize">
							<div className="w-[20%]">№</div>
							<div className="w-[30%]">{t('player')}</div>
							<div className="w-[25%]">{t('win')}</div>
							<div className="w-[25%] pl-2">{t('bonus')}</div>
						</div>

						{/* Rows */}
						{winBets.map((row, index) => (
							<div
								key={row.player}
								className={`flex items-center h-10 px-4 rounded-lg relative overflow-hidden ${
									index === 0
										? 'bg-gradient-to-r from-primary/50 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(255,223,0,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
										: index === 1
											? 'bg-gradient-to-r from-tertiary-foreground/20 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(192,192,192,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
											: index === 2
												? 'bg-gradient-to-r from-orange-600/50 via-primaryLight to-transparent shadow-[inset_0_0_0_1px_rgba(205,127,50,0.6),inset_0_0_0_1px_rgba(0,0,0,0.4)]'
												: index % 2 === 0
													? 'bg-card'
													: 'bg-transparent'
								} transition-all duration-300`}
							>
								<div className="flex items-center w-[20%]">
									<span className="mr-2 text-xs">#{index + 1}</span>
									{getTrophyImage(index) && <img src={getTrophyImage(index)} alt="trophy" className="h-4 inline-block mr-2" />}
								</div>
								<div className="flex items-center w-[30%] space-x-2">
									<a target={'_blank'} rel={'noreferrer'} href={`${ETHSCAN}/address/${row.player}`} className="text-xs hover:text-bonus">
										{truncateEthAddress(row.player)}
									</a>
								</div>
								<div className="flex items-center w-[25%] gap-1 text-secondary-foreground font-semibold text-xs">
									<BetValue value={row.result || 0n} withIcon={true} iconClassName={'w-3 h-3'} />
								</div>
								<div className="flex items-center w-[25%] gap-1 text-bonus font-semibold text-xs pl-2">
									<BetValue value={row.bonus || 0n} withIcon={true} iconClassName={'w-3 h-3'} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{bonusBank + winBank - distributed > 10n ** 18n && (
				<div className={'border border-destructive/30 rounded-lg px-4 p-4 flex justify-between items-center'}>
					{t('payoutNotDistributed')}
					<Button onClick={handleDistribute}>{t('distribute')}</Button>
				</div>
			)}
		</>
	);
};

export default BetRanking;
