Usage

- The project uses @tanstack/react-query for Stale-While-Revalidate behaviour and persists query cache to localStorage using the persister.

- Hook examples:
  - `useVentas(params)` -> returns a react-query result with `{ data, isLoading, isFetching, refetch }`. `data` is normalized to `{ data: [], total, nextCursor }`.
  - `useGastos(params)`
  - `useProduccion(params)`
  - `useDashboard({ date, startDate, endDate })` -> returns the report object.

Behavior

- Each hook reads `placeholderData` from `localStorage` (key prefixed with `rq:`) so the UI can render instantly with last-known data.
- `refetchOnWindowFocus` is disabled to avoid noisy network requests on mobile tab switches.
- On successful fetch the hook writes the latest data into `localStorage` only if it differs, minimizing visual jumps.

Clearing persisted cache

- To clear the cached queries, run in the browser console:

```js
localStorage.clear();
// or to remove just queries
Object.keys(localStorage).forEach(k => { if (k.startsWith('r' + 'q:')) localStorage.removeItem(k); });
```

Notes

- Ensure dependencies are installed: `@tanstack/react-query`, `@tanstack/react-query-persist-client`, `@tanstack/query-sync-storage-persister`.
- If you prefer a more robust storage (IndexedDB), replace the persister implementation in `src/queryClient.js` with a web-storage or localforage-based persister.
