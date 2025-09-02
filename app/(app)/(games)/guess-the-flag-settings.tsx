import CTA from '@/components/buttons/large-cta';
import SwitchBtn from '@/components/buttons/switch';
import TextInputComponent from '@/components/text-inputs/text-input';
import useProfile from '@/hooks/useProfile';
import { useStore } from '@/store/store';
import { useEffect, useMemo } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setMultiplayer = useStore((state: any) => state.setMultiplayer);
  const roomName = useStore((state: any) => state.roomName);
  const setRoomName = useStore((state: any) => state.setRoomName);
  const setPlayerName = useStore((state: any) => state.setPlayerName);
  const playerName = useStore((state: any) => state.playerName);
  const players = useStore((state: any) => state.players);
  const setPlayers = useStore((state: any) => state.setPlayers);
  const setChannelRef = useStore((state: any) => state.setChannelRef);
  const teardownChannel = useStore((state: any) => state.teardownChannel);
  const createRealTimeSubscription = useStore(
    (state: any) => state.createRealTimeSubscription
  );

  const isValidRoomName = useMemo(
    () => roomName.trim() !== '' && roomName.length >= 4,
    [roomName]
  );
  const isValidName = useMemo(
    () => playerName.trim() !== '' && playerName.length >= 2,
    [playerName]
  );

  useEffect(() => {
    if (isMultiplayer) {
      setPlayers(null);
    }
  }, [isMultiplayer, setPlayers]);

  const onPressMultiplayer = async () => {
    if (!isValidRoomName || !isValidName) return;

    await teardownChannel();

    const channel = createRealTimeSubscription(
      roomName.trim(),
      playerName.trim()
    );

    setChannelRef(channel);
  };

  useEffect(() => {
    if (!isMultiplayer) {
      teardownChannel();
    }
    return () => {
      teardownChannel();
    };
  }, [isMultiplayer, teardownChannel]);

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
              onChangeText={setPlayerName}
              inputValue={playerName}
              editable={!(isMultiplayer && players && players.length >= 2)}
            />
            <TextInputComponent
              placeholder={'Room playerName'}
              borderColor={isValidRoomName ? '#3bea06' : '#767577'}
              onChangeText={setRoomName}
              inputValue={roomName}
              editable={!(isMultiplayer && players && players.length >= 2)}
            />
            {players &&
              players.map((item: string, index: number) => (
                <Text key={index}>{item}</Text>
              ))}
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
