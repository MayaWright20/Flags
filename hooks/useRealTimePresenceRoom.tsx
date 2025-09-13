import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import useProfile from './useProfile';

export type RealtimeUser = {
  id: string;
  name: string;
  favourites: string[];
};

export const useRealtimePresenceRoom = (roomName: string) => {
  const { favourites, gameName } = useProfile();

  const [users, setUsers] = useState<Record<string, RealtimeUser>>({});

  useEffect(() => {
    const room = supabase.channel(roomName);

    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState<{
          favourites: string[];
          name: string;
        }>();

        const newUsers = Object.fromEntries(
          Object.entries(newState).map(([key, values]) => [
            key,
            { name: values[0].name, favourites: values[0].favourites },
          ])
        ) as Record<string, RealtimeUser>;
        setUsers(newUsers);
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }

        await room.track({
          name: gameName,
          favourites,
        });
      });

    return () => {
      room.unsubscribe();
    };
  }, [roomName, gameName, favourites]);

  return { users };
};
