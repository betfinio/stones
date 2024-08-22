import * as i18 from 'i18next';
import type { i18n } from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';

// @ts-ignore
import enShared from 'betfinio_app/locales/en';
// @ts-ignore
import ruShared from 'betfinio_app/locales/ru';

const resources = {
	en: {
		translation: {
			stones: enJSON,
			shared: enShared,
		},
	},
	ru: {
		translation: {
			stones: ruJSON,
			shared: ruShared,
		},
	},
};

const instance: i18n = i18.createInstance();
instance
	.use(initReactI18next)
	.use(ICU)
	.init({
		resources: resources,
		lng: 'en', // default language
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
	});

export default instance;
