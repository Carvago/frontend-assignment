'use client';

import {ReactNode, useEffect} from 'react';
import i18n from '@/i18n/i18n';

type Props = {
  initialLocale: string;
  children: ReactNode;
};

export function I18nProvider({initialLocale, children}: Props) {
  if (i18n.language !== initialLocale) {
    i18n.changeLanguage(initialLocale);
  }

  useEffect(() => {
    if (i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale]);

  return <>{children}</>;
}
