'use client';

import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {formatDate} from '@/utils/formatDate';

export function useCurrentDate(): string {
  const {i18n} = useTranslation();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(formatDate(new Date(), i18n.language));
  }, [i18n.language]);

  return formattedDate;
}
