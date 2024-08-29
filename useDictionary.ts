import { DictionaryPhrases, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { useCallback } from 'react';

const useDictionary = () => {
  const i18n = useI18n<DictionaryPhrases>();
  const context = useSitecoreContext();
  const pageLanguage = context?.sitecoreContext?.language || 'en';

  const getDictionaryValue = useCallback(
    // We only want to fall back to the key if `fallbackValue` is `undefined`, so we use `??`.  Empty string is a valid fallback.
    // However `i18n.t` will return an empty string even for an unknown key, so we use `||` there.
    (key: string, fallbackValue?: string) => (i18n.t(key) || fallbackValue) ?? key,
    [i18n]
  );

  const getDictionaryValueWithReplacement = useCallback(
    (key: string, replacement?: { [key: string]: string }, fallbackValue?: string) => {
      let value = getDictionaryValue(key, fallbackValue);
      if (replacement) {
        Object.keys(replacement).forEach((key) => {
          value = value.replace(`{${key}}`, replacement[key]);
        });
      }
      return value;
    },
    [getDictionaryValue]
  );

  return {
    dictionaryData: i18n.table(pageLanguage),
    getDictionaryValue,
    getDictionaryValueWithReplacement,
  };
};

export default useDictionary;
