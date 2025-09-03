import CTA from '@/components/buttons/large-cta';
import SwitchBtn from '@/components/buttons/switch';
import TextInputComponent from '@/components/text-inputs/text-input';
import useProfile from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setMultiplayer = useStore((state: any) => state.setMultiplayer);

  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [players, setPlayers] = useState<any>(null);
  const isValidRoomName = useMemo(
    () => roomName.trim() !== '' && roomName.length >= 4,
    [roomName]
  );
  const isValidName = useMemo(
    () => userName.trim() !== '' && userName.length >= 2,
    [userName]
  );

  const onPressMultiplayer = () => {
    const room = supabase.channel(roomName, {
      config: {
        presence: {
          key: userName,
        },
      },
    });

    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState();
        console.log('sync', newState);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
        setPlayers((current: any) => current && [...current, userName]);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences);
      });

    room
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }
        const presenceTrackStatus = await room.track({ players });
        console.log('presenceTrackStatus', presenceTrackStatus);
      })
      .subscribe();
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
              onChangeText={setUserName}
            />
            <TextInputComponent
              placeholder={'Room name'}
              borderColor={isValidRoomName ? '#3bea06' : '#767577'}
              onChangeText={setRoomName}
              inputValue={roomName}
              editable={!(isMultiplayer && players && players.length >= 2)}
            />
            {/* {players &&
              players.map((item, index) => <Text key={index}>{item}</Text>)} */}
            <CTA
              disabled={!isValidRoomName}
              title={'Start Game'}
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
