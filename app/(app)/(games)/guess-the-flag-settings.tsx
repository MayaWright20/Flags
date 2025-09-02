import CTA from '@/components/buttons/large-cta';
import SwitchBtn from '@/components/buttons/switch';
import TextInputComponent from '@/components/text-inputs/text-input';
import useProfile from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
} from '@supabase/supabase-js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const TABLE_NAME = 'guess_the_flag_multiplayer';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setMultiplayer = useStore((state: any) => state.setMultiplayer);

  const channelRef = useRef<RealtimeChannel | null>(null);

  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<string[] | null>(null);

  const isValidRoomName = useMemo(
    () => roomName.trim() !== '' && roomName.length >= 4,
    [roomName]
  );
  const isValidName = useMemo(
    () => name.trim() !== '' && name.length >= 2,
    [name]
  );

  const userStatus = {
    user: name || 'anon',
    online_at: new Date().toISOString(),
  };

  useEffect(() => {
    if (isMultiplayer) {
      setPlayers(null);
    }
  }, [isMultiplayer]);

  // helper: safely close the current channel
  const teardownChannel = async () => {
    try {
      if (channelRef.current) {
        // stop sending presence
        await channelRef.current.untrack?.();
        // unsubscribe from realtime
        channelRef.current.unsubscribe();
      }
    } finally {
      channelRef.current = null;
    }
  };

  const realTimeSubscription = (room: string, displayName: string) => {
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
        setPlayers(Object.keys(newState));
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('presence:join', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('presence:leave', key, leftPresences);
        setPlayers(
          (current) => current && [...current].filter((item) => item === key)
        );
      });

    // postgres changes (filter by room if you have a room column)
    channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLE_NAME,
        filter: `room_name=eq.${room}`,
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
  };

  // Start / join the multiplayer room
  const onPressMultiplayer = async () => {
    // guard
    if (!isValidRoomName || !isValidName) return;

    // if we already have a channel, reset it first
    await teardownChannel();

    channelRef.current = realTimeSubscription(roomName.trim(), name.trim());
  };

  // Clean up when toggling multiplayer off, or when component unmounts
  useEffect(() => {
    if (!isMultiplayer) {
      // turn off realtime when user leaves multiplayer mode
      teardownChannel();
    }
    return () => {
      teardownChannel();
    };
  }, [isMultiplayer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/settings.png')}
          style={styles.image}
        />
        <SwitchBtn
          onValueChange={setIsGuessTheFlagWriteAnswer}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isGuessTheFlagWriteAnswer}
          label={'Write the answer'}
        />
        <SwitchBtn
          onValueChange={(val: boolean) => {
            setMultiplayer(val);
            if (!val) setRoomName('');
          }}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isMultiplayer}
          label={'Multiplayer'}
        />

        {isMultiplayer && (
          <>
            <TextInputComponent
              placeholder={'Name'}
              borderColor={isValidName ? '#3bea06' : '#767577'}
              onChangeText={setName}
              value={name}
              editable={!(isMultiplayer && players && players.length >= 2)}
            />
            <TextInputComponent
              placeholder={'Room name'}
              borderColor={isValidRoomName ? '#3bea06' : '#767577'}
              onChangeText={setRoomName}
              value={roomName}
              editable={!(isMultiplayer && players && players.length >= 2)}
            />
            {players &&
              players.map((item, index) => <Text key={index}>{item}</Text>)}
            <CTA
              disabled={
                !isValidRoomName ||
                !isValidName ||
                (players && players.length <= 1)
              }
              title={
                players && players.length >= 1 ? 'Start Game' : 'Join Room'
              }
              onPress={onPressMultiplayer}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '30%',
    marginVertical: 10,
    marginBottom: 30,
  },
});
