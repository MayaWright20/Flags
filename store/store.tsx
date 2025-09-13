import { create } from 'zustand';

// Define the state interface
interface StoreState {
  // Auth related state
  authCTATitle: string;
  setAuthCTATitle: (title: string) => void;
  isAuthCTADisabled: boolean;
  setIsAuthCTADisabled: (isDisabled: boolean) => void;
  authCTANumber: number;
  increaseAuthCTANumber: () => void;
  decreaseAuthCTANumber: () => void;
  isAuthLoginRoute: boolean | null;
  setIsAuthLoginRoute: (isLogin: boolean | null) => void;
  resetAuthCTAVariables: () => void;
  formData: any;
  setFormData: (formData: any) => void;
  favourites: string[];
  setStoreFavourites: (favouriteItems: string[]) => void;
  isGuessTheFlagWriteAnswer: boolean;
  setStoreIsGuessTheFlagWriteAnswer: (
    isGuessTheFlagWriteAnswer: boolean
  ) => void;
  isMultiplayer: boolean;
  setIsMultiplayer: (value: boolean) => void;
  roomName: string;
  setRoomName: (roomName: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  players: string[];
  setPlayers: (players: string[] | []) => void;
  gameName: string;
  setGameName: (gameName: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Auth related state
  authCTATitle: 'Sign up',
  setAuthCTATitle: (title: string) => set(() => ({ authCTATitle: title })),
  isAuthCTADisabled: false,
  setIsAuthCTADisabled: (isDisabled: boolean) =>
    set(() => ({ isAuthCTADisabled: isDisabled })),
  authCTANumber: 0,
  increaseAuthCTANumber: () =>
    set((state) => ({ authCTANumber: state.authCTANumber + 1 })),
  decreaseAuthCTANumber: () =>
    set((state) => ({ authCTANumber: state.authCTANumber - 1 })),
  isAuthLoginRoute: null,
  setIsAuthLoginRoute: (isLogin: boolean | null) =>
    set(() => ({ isAuthLoginRoute: isLogin })),
  resetAuthCTAVariables: () =>
    set(() => ({
      authCTATitle: 'Sign up',
      isAuthCTADisabled: false,
      authCTANumber: 0,
      isAuthLoginRoute: null,
    })),
  formData: null,
  setFormData: (formData: any) => set(() => ({ formData: formData })),
  favourites: [] as string[],
  setStoreFavourites: (favouriteItems: string[]) =>
    set(() => ({ favourites: favouriteItems })),
  isGuessTheFlagWriteAnswer: false,
  setStoreIsGuessTheFlagWriteAnswer: (isGuessTheFlagWriteAnswer: boolean) =>
    set(() => ({ isGuessTheFlagWriteAnswer })),
  isMultiplayer: false,
  setIsMultiplayer: (value: boolean) => set(() => ({ isMultiplayer: value })),
  roomName: '',
  setRoomName: (roomName: string) => set(() => ({ roomName })),
  userName: '',
  setUserName: (userName: string) => set(() => ({ userName })),
  players: [],
  setPlayers: (players: string[] | []) => set(() => ({ players })),
  gameName: '',
  setGameName: (gameName: string) => set(() => ({ gameName })),
}));
