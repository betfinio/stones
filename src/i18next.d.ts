import type { resources } from './i18n';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'stones';
		resources: (typeof resources)['en'];
	}
}

export type ILanguageKeys = (typeof resources)['en']['stones'];
export type ILanguageErrorKeys = keyof (typeof resources)['en']['shared']['errors'];