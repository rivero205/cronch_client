import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

const storageKeyFor = (date, startDate, endDate) => `rq:dailyReport:${date || ''}:${startDate || ''}:${endDate || ''}`;

export function useDashboard({ date = null, startDate = null, endDate = null } = {}) {
  const key = ['dailyReport', { date, startDate, endDate }];
  const storageKey = storageKeyFor(date, startDate, endDate);

  let placeholder = undefined;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) placeholder = JSON.parse(raw);
  } catch (e) {}

  return useQuery(key, () => api.getDailyReport(date, startDate, endDate), {
    placeholderData: placeholder,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    onSuccess(data) {
      try {
        const prev = localStorage.getItem(storageKey);
        const next = JSON.stringify(data || {});
        if (prev !== next) localStorage.setItem(storageKey, next);
      } catch (e) {}
    }
  });
}

export default useDashboard;
