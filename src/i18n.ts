import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import czJSON from './translations/cz.json';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';

import { sharedLang } from 'betfinio_app/locales/index';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
	en: {
		stones: enJSON,
		shared: sharedLang.en,
	},
	cs: {
		stones: czJSON,
		shared: sharedLang.cz,
	},
	ru: {
		stones: ruJSON,
		shared: sharedLang.ru,
	},
} as const;

const instance: i18n = i18.createInstance();
instance
	.use(initReactI18next)
	.use(I18nextBrowserLanguageDetector)
	.use(ICU)
	.init({
		detection: {
			order: ['localStorage', 'navigator'],
			convertDetectedLanguage: (lng) => lng.split('-')[0],
		},
		supportedLngs: ['en', 'ru', 'cs'],
		resources: resources,
		defaultNS: 'stones',
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
	});

export default instance;
