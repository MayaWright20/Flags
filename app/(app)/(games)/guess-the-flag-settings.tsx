import CTA from '@/components/buttons/large-cta';
import SwitchBtn from '@/components/buttons/switch';
import TextInputComponent from '@/components/text-inputs/text-input';
import useProfile from '@/hooks/useProfile';
import { insertAnswer, insertWrittenAnswer } from '@/lib/channels/join-room';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
} from '@supabase/supabase-js';
import { useMemo, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

const TABLE_NAME = 'guess_the_flag_multiplayer';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setMultiplayer = useStore((state: any) => state.setMultiplayer);
  const channelRef = useRef<RealtimeChannel>(null);

  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const isValidRoomName = useMemo(
    () => roomName.trim() !== '' && roomName.length >= 4,
    [roomName]
  );
  const isValidName = useMemo(
    () => name.trim() !== '' && name.length >= 2,
    [name]
  );

  const realTimeSubscription = (roomName: string) => {
    const channel = supabase.channel(roomName);
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLE_NAME },
        (payload) => {
          console.log('change recieved', payload);
        }
      )
      .subscribe((status) => {
        if (status !== REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          return;
        } else {
          console.log('Realtime connection established');
        }
      });
    return channel;
  };

  const onPressMultiplayer = (roomName: string) => {
    channelRef.current = realTimeSubscription(roomName);
    if (isGuessTheFlagWriteAnswer) {
      insertWrittenAnswer(roomName);
    } else {
      insertAnswer(true);
    }
    return () => {
      channelRef.current?.unsubscribe();
    };
  };

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
          onValueChange={setMultiplayer}
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
            />
            <TextInputComponent
              placeholder={'Room name'}
              borderColor={isValidRoomName ? '#3bea06' : '#767577'}
              onChangeText={setRoomName}
            />
            <CTA
              disabled={!isValidRoomName}
              title={'Start Game'}
              onPress={() => onPressMultiplayer(roomName)}
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
