import { ANSWERS_LENGTH } from '@/constants/games';
import {
  randomNumberGenerator,
  randomNumbers,
} from '@/lib/randomNumberGenerator';
import { create } from 'zustand';

interface StoreState {
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
  players: string[];
  setPlayers: (players: string[] | []) => void;
  gameUserName: string;
  setGameUserName: (gameUserName: string) => void;
  correctAnswerInt: number;
  setCorrectAnswerInt: (correctAnswerInt: number) => void;
  randomInts: number[];
  setRadomInts: (randomInts: number[]) => void;
  showAnswer: boolean;
  setShowAnswer: (showRandomAnswer: boolean) => void;
  itemPressed: null | number;
  setItemPressed: (itemPressed: null | number) => void;
  writtenAnswer: string;
  setWrittenAnswer: (writtenAnswer: string) => void;
  isWrittenInputEditable: boolean;
  setIsWrittenInputEditable: (isWrittenInputEditable: boolean) => void;
  clearWrittenInput: boolean;
  setClearWrittenInput: (clearWrittenInput: boolean) => void;
  writtenAnswerCTATitle: string;
  setWrittenAnswerCTATitle: (writtenAnswerCTATitle: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
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
  players: [],
  setPlayers: (players: string[] | []) => set(() => ({ players })),
  gameUserName: '',
  setGameUserName: (gameUserName: string) => set(() => ({ gameUserName })),
  correctAnswerInt: randomNumberGenerator(ANSWERS_LENGTH),
  setCorrectAnswerInt: (correctAnswerInt: number) =>
    set(() => ({ correctAnswerInt })),
  randomInts: randomNumbers(4, 220),
  setRadomInts: (randomInts: number[]) => set(() => ({ randomInts })),
  showAnswer: false,
  setShowAnswer: (showAnswer: boolean) => set(() => ({ showAnswer })),
  itemPressed: null,
  setItemPressed: (itemPressed: null | number) => set(() => ({ itemPressed })),
  writtenAnswer: '',
  setWrittenAnswer: (writtenAnswer: string) => set(() => ({ writtenAnswer })),
  isWrittenInputEditable: true,
  setIsWrittenInputEditable: (isWrittenInputEditable: boolean) =>
    set(() => ({ isWrittenInputEditable })),
  clearWrittenInput: false,
  setClearWrittenInput: (clearWrittenInput: boolean) =>
    set(() => ({ clearWrittenInput })),
  writtenAnswerCTATitle: 'Reveal Answer',
  setWrittenAnswerCTATitle: (writtenAnswerCTATitle: string) =>
    set(() => ({ writtenAnswerCTATitle })),
}));
