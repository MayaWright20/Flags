import { usePersistStore } from '@/store/store';
import { useCallback } from 'react';

export default function useSession() {
  const session = usePersistStore((state: any) => state.session);
  const setSession = usePersistStore((state: any) => state.setSession);

  const clearSession = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const updateSession = useCallback((token: string) => {
    setSession(token);
  }, [setSession]);

  return {
    session,
    setSession: updateSession,
    clearSession,
    isAuthenticated: !!session,
  };
}