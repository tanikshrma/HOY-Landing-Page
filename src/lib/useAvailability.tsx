import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { FALLBACK_AVAILABILITY, fetchAvailability, type Availability } from './api';

interface Ctx {
  availability: Availability;
  /** True until the first successful response — used to avoid flashing "20 left". */
  loading: boolean;
  /** True if we have never managed to reach the API. */
  offline: boolean;
  refresh: () => Promise<void>;
  apply: (next: Availability) => void;
}

const AvailabilityContext = createContext<Ctx>({
  availability: FALLBACK_AVAILABILITY,
  loading: true,
  offline: false,
  refresh: async () => {},
  apply: () => {},
});

export function AvailabilityProvider({ children }: { children: ReactNode }) {
  const [availability, setAvailability] = useState<Availability>(FALLBACK_AVAILABILITY);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const everLoaded = useRef(false);

  const refresh = useCallback(async () => {
    const data = await fetchAvailability();
    if (data) {
      everLoaded.current = true;
      setAvailability(data);
      setOffline(false);
    } else if (!everLoaded.current) {
      setOffline(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();

    // 60s is plenty for a cap of 20/day, and keeps the server quiet. The old
    // build polled every 10s from every open tab.
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') refresh();
    }, 60_000);

    // Refresh when the tab comes back, so a counter left open overnight is not stale.
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  // The submit response carries fresh numbers; use them instead of re-fetching.
  const apply = useCallback((next: Availability) => {
    everLoaded.current = true;
    setAvailability(next);
    setOffline(false);
    setLoading(false);
  }, []);

  return (
    <AvailabilityContext.Provider value={{ availability, loading, offline, refresh, apply }}>
      {children}
    </AvailabilityContext.Provider>
  );
}

export const useAvailability = () => useContext(AvailabilityContext);
