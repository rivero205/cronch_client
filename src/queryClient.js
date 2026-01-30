import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Create a shared QueryClient with sensible defaults for SWR behavior
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30s stale
      cacheTime: 1000 * 60 * 60 * 24, // 24h
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
      keepPreviousData: true,
    },
  },
});

// Persist queries to localStorage so data survives reloads and tab close
const persister = createSyncStoragePersister({ storage: window.localStorage });

// Start persisting (non-blocking)
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // persist for 24h
});

export default queryClient;
