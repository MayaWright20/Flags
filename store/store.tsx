import { supabase } from '@/lib/supabase';
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
  roomChannel: any;
  setRoomChannel: (channel: any) => void;
  joinMultiplayerRoom: () => void;
  leaveMultiplayerRoom: () => void;
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
  roomChannel: null,
  setRoomChannel: (roomChannel: any) => set(() => ({ roomChannel })),

  joinMultiplayerRoom: () => {
    const state = get();
    const { roomName, userName, players } = state;

    // Create the Supabase realtime channel
    const room = supabase.channel(roomName, {
      config: {
        presence: {
          key: userName,
        },
      },
    });

    // Setup event listeners
    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState();
        console.log('sync', newState);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
        const updatedPlayers = [...players, userName];
        set(() => ({ players: updatedPlayers }));
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences);
        const updatedPlayers = players.filter((item: string) => item === key);
        set(() => ({ players: updatedPlayers }));
      });

    // Subscribe to the channel
    room.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }
      const presenceTrackStatus = await room.track({
        online: true,
        user: userName,
      });
      console.log('presenceTrackStatus', presenceTrackStatus);
    });

    // Store the channel reference
    set(() => ({ roomChannel: room }));
  },

  // Function to leave multiplayer room
  leaveMultiplayerRoom: () => {
    const { roomChannel } = get();
    if (roomChannel) {
      roomChannel.unsubscribe();
      set(() => ({ roomChannel: null, players: [] }));
    }
  },
}));
