import { useStorageState } from '@/lib/utils/useStorageState';
import { useStore } from '@/store/store';
import { createContext, use, type PropsWithChildren } from 'react';

export const AuthContext = createContext<{
  login: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  login: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const resetAuthCTAVariables = useStore(
    (state) => state.resetAuthCTAVariables
  );

  return (
    <AuthContext
      value={{
        login: () => {
          // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          resetAuthCTAVariables();
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
