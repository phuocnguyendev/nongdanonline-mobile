import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-react-native-language-detector";

import en from "../../public/locales/en/en.json";
import vi from "../../public/locales/vn/vi.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
