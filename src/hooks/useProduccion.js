import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

const storageKeyFor = (params) => `rq:production:${JSON.stringify(params)}`;

export function useProduccion(params = {}) {
  const key = ['production', params];
  const storageKey = storageKeyFor(params);

  let placeholder = undefined;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) placeholder = JSON.parse(raw);
  } catch (e) {}

  return useQuery(key, () => api.getProduction(params), {
    placeholderData: placeholder,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    onSuccess(data) {
      try {
        const prev = localStorage.getItem(storageKey);
        const next = JSON.stringify(data || {});
        if (prev !== next) localStorage.setItem(storageKey, next);
      } catch (e) {}
    },
    select(data) {
      if (!data) return { data: [], total: 0, nextCursor: null };
      if (Array.isArray(data)) return { data, total: data.length, nextCursor: null };
      return data;
    }
  });
}

export default useProduccion;
