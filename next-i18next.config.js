module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kz', 'en'],
  },
  localePath: 'public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
  serverSideTranslations: ['common','home','products']
}
