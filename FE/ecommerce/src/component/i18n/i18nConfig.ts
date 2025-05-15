import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../../assets/locale/en.json';
import fn from '../../assets/locale/fn.json'
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fn,
      },
    },
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
