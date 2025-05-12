import type { Address } from 'viem';

export const STONES = import.meta.env.PUBLIC_STONES_ADDRESS as Address;
export const PARTNER = import.meta.env.PUBLIC_PARTNER_ADDRESS as Address;
export const ETHSCAN = import.meta.env.PUBLIC_ETHSCAN as string;
export const TOKEN = import.meta.env.PUBLIC_TOKEN_ADDRESS as Address;
