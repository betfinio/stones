/**
 * Mirrors StonesStrategy.resolveRound winner selection (weighted sides 1–5).
 */
export function computeWinningSideFromVrf(
	randomWord: bigint,
	sideProbabilities: readonly [bigint, bigint, bigint, bigint, bigint],
	totalProbability: bigint,
): number {
	if (totalProbability === 0n) return 0;

	const winnerOffset = randomWord % totalProbability;
	let cumulative = 0n;
	for (let i = 0; i < 5; i++) {
		cumulative += sideProbabilities[i];
		if (winnerOffset < cumulative) return i + 1;
	}
	return 0;
}
