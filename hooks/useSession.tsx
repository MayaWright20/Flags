import { useSessionStore } from '@/store/store';
import { useCallback } from 'react';

export default function useSession() {
  const session = useSessionStore((state: any) => state.session);
  const setSession = useSessionStore((state: any) => state.setSession);

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