import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    ns: ['common', 'demos', 'errors'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Add custom formatters for dates and numbers
i18n.services.formatter.add('DATE_LONG', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_FULL);
});

i18n.services.formatter.add('DATE_SHORT', (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_SHORT);
});

i18n.services.formatter.add('NUMBER', (value, lng, options) => {
  return new Intl.NumberFormat(lng, options).format(value);
});

i18n.services.formatter.add('CURRENCY', (value, lng, options) => {
  return new Intl.NumberFormat(lng, {
    style: 'currency',
    currency: options?.currency || 'USD',
    ...options
  }).format(value);
});

export default i18n; 