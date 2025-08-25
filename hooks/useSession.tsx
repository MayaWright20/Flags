import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setIsLoading(false);
  }, []);

  return {
    session,
    isLoading,
  };
}
