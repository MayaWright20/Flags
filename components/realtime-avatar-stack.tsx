import { useRealtimePresenceRoom } from '@/hooks/useRealTimePresenceRoom';
import { useMemo } from 'react';
import AvatarStack from './avatar-stack';

export const RealtimeAvatarStack = ({ roomName }: { roomName: string }) => {
  const { users: usersMap } = useRealtimePresenceRoom(roomName);
  const avatars = useMemo(() => {
    return Object.values(usersMap).map((user) => ({
      name: user.name,
      favourites: user.favourites,
    }));
  }, [usersMap]);

  return <AvatarStack avatars={avatars} />;
};
