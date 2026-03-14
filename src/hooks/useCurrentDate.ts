'use client';

import {useEffect, useState} from 'react';

import {formatDate} from '@/utils/formatDate';

export function useCurrentDate(): string {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(formatDate(new Date()));
  }, []);

  return formattedDate;
}
