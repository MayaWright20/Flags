import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import useProfile from './useProfile';

export type RealtimeUser = {
  id: string;
  name: string;
  favourites: string[];
};

export const useRealtimePresenceRoom = (roomName: string) => {
  const { favourites, gameUserName } = useProfile();

  const [users, setUsers] = useState<Record<string, RealtimeUser>>({});
  const [message, setMessage] = useState('hello');

  function recieveMessage(payload) {
    console.log('recieve', payload);
  }

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
      .on(
        'broadcast',
        { event: 'shout' }, // Listen for "shout". Can be "*" to listen to all events
        (payload) => recieveMessage(payload)
      )
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }

        await room.track({
          name: gameUserName,
          favourites,
        });

        room.send({
          type: 'broadcast',
          event: 'shout',
          payload: { message: message },
        });
      });

    return () => {
      room.unsubscribe();
    };
  }, [roomName, gameUserName, favourites, message]);

  return { users, setMessage };
};
