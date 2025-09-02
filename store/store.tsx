import { supabase } from '@/lib/supabase';
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
} from '@supabase/supabase-js';
import { create } from 'zustand';

const TABLE_NAME = 'guess_the_flag_multiplayer';

export const useStore = create((set, get) => ({
  authCTATitle: 'Sign up',
  setAuthCTATitle: (title: string) => set(() => ({ authCTATitle: title })),
  isAuthCTADisabled: false,
  setIsAuthCTADisabled: (isDisabled: boolean) =>
    set(() => ({ isAuthCTADisabled: isDisabled })),
  authCTANumber: 0,
  increaseAuthCTANumber: () =>
    set((state: any) => ({ authCTANumber: state.authCTANumber + 1 })),
  decreaseAuthCTANumber: () =>
    set((state: any) => ({ authCTANumber: state.authCTANumber - 1 })),
  isAuthLoginRoute: null,
  setIsAuthLoginRoute: (isLogin: boolean | null) =>
    set(() => ({ isAuthLoginRoute: isLogin })),
  resetAuthCTAVariables: () =>
    set((state: any) => ({
      authCTATitle: 'Sign up',
      isAuthCTADisabled: false,
      authCTANumber: 0,
      isAuthLoginRoute: null,
    })),
  formData: null,
  setFormData: (formData: any) => set((state: any) => ({ formData })),
  favourites: [] as string[],
  setStoreFavourites: (favouriteItems: string[]) =>
    set(() => ({ favourites: favouriteItems })),
  isGuessTheFlagWriteAnswer: false,
  setStoreIsGuessTheFlagWriteAnswer: (isGuessTheFlagWriteAnswer: boolean) =>
    set(() => ({ isGuessTheFlagWriteAnswer })),
  isMultiplayer: false,
  setMultiplayer: () =>
    set((state: any) => ({ isMultiplayer: !state.isMultiplayer })),
  roomName: '',
  setRoomName: (roomName: string) => set((state: any) => ({ roomName })),
  playerName: '',
  setPlayerName: (playerName: string) => set((state: any) => ({ playerName })),
  players: null,
  setPlayers: (players: string[] | null) => set((state: any) => ({ players })),
  channelRef: null,
  setChannelRef: (channel: RealtimeChannel | null) =>
    set(() => ({ channelRef: channel })),
  teardownChannel: async () => {
    set((state: any) => {
      const channel = state.channelRef;
      if (channel) {
        // stop sending presence
        channel.untrack?.().catch(console.error);
        // unsubscribe from realtime
        channel.unsubscribe();
      }
      return { channelRef: null };
    });
  },

  createRealTimeSubscription: (room: string, displayName: string) => {
    const userStatus = {
      user: displayName || 'anon',
      online_at: new Date().toISOString(),
    };

    // set a stable presence key for this user (recommended)
    const channel = supabase.channel(room, {
      config: {
        presence: { key: displayName }, // e.g., user id
      },
    });

    // presence events
    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        console.log('presence:sync', newState);
        set({ players: Object.keys(newState) });
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('presence:join', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('presence:leave', key, leftPresences);
        set((state: any) => ({
          players:
            state.players &&
            [...state.players].filter((item: string) => item === key),
        }));
      });

    // postgres changes (filter by room if you have a room column)
    channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLE_NAME,
        filter: `room_playerName=eq.${room}`,
      },
      (payload) => {
        console.log('db change', payload);
      }
    );

    // single subscribe, then track presence
    channel.subscribe(async (status) => {
      if (status !== REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) return;
      console.log('Realtime connection established');
      const trackRes = await channel.track(userStatus);
      console.log('track result', trackRes);
    });

    return channel;
  },
}));
