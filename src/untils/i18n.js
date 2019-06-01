import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../assets/i18n/locales/en.json'
import vn from '../assets/i18n/locales/vn.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: en
      },
      vn: {
        translations: vn
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    ns: ['translations'],
    defaultNS: 'translations'
  })

export default i18n
