import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';

// @ts-ignore
import enShared from 'betfinio_app/locales/en';
// @ts-ignore
import ruShared from 'betfinio_app/locales/ru';

export const defaultLocale = 'en';

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
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
	});

const changeLanguage = async (locale: string | null) => {
	const lng = locale ?? defaultLocale;
	await instance.changeLanguage(lng);
	localStorage.setItem('i18nextLng', lng);
};

if (!localStorage.getItem('i18nextLng')) {
	const locale = navigator.language.split('-')[0];
	changeLanguage(locale);
} else {
	changeLanguage(localStorage.getItem('i18nextLng'));
}

export default instance;
