import { useTranslation } from "react-i18next";
import i18n from "../i8n/i8n";

const useTranslationSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return { t, changeLanguage, currentLanguage };
};

export default useTranslationSwitcher;
