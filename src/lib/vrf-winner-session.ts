const STORAGE_PREFIX = 'betfinio-stones-vrf-winner:';

function storage(): Storage | null {
	if (typeof sessionStorage === 'undefined') return null;
	try {
		return sessionStorage;
	} catch {
		return null;
	}
}

export function persistVrfWinnerSide(round: number, side: number): void {
	if (round <= 0 || side < 1 || side > 5) return;
	const s = storage();
	if (!s) return;
	s.setItem(`${STORAGE_PREFIX}${round}`, String(side));
}

export function readVrfWinnerSide(round: number): number {
	if (round <= 0) return 0;
	const s = storage();
	if (!s) return 0;
	const raw = s.getItem(`${STORAGE_PREFIX}${round}`);
	if (raw === null || raw === '') return 0;
	const n = Number(raw);
	if (n >= 1 && n <= 5) return n;
	return 0;
}

export function clearVrfWinnerSide(round: number): void {
	if (round <= 0) return;
	const s = storage();
	if (!s) return;
	s.removeItem(`${STORAGE_PREFIX}${round}`);
}
