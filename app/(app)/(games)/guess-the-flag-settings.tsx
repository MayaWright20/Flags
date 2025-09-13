import CTA from '@/components/buttons/large-cta';
import SwitchBtn from '@/components/buttons/switch';
import TextInputComponent from '@/components/text-inputs/text-input';
import useProfile from '@/hooks/useProfile';
import { useRealtimePresenceRoom } from '@/hooks/useRealTimePresenceRoom';
import { useStore } from '@/store/store';
import { useEffect, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setIsMultiplayer = useStore((state: any) => state.setIsMultiplayer);
  const roomName = useStore((state: any) => state.roomName);
  const setRoomName = useStore((state: any) => state.setRoomName);
  const userName = useStore((state: any) => state.userName);
  const setUserName = useStore((state: any) => state.setUserName);
  const players = useStore((state: any) => state.players);
  const setPlayers = useStore((state: any) => state.setPlayers);

  const isValidRoomName = useMemo(
    () => roomName.trim() !== '' && roomName.length >= 4,
    [roomName]
  );
  const isValidName = useMemo(
    () => userName.trim() !== '' && userName.length >= 2,
    [userName]
  );
  const { users } = useRealtimePresenceRoom(roomName);

  const joinRoom = () => {
    setPlayers(users);
  };

  useEffect(() => {
    if (!users) return;
    setPlayers(users);
  }, [users, setPlayers]);

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
            if (val !== true) {
            }
            setIsMultiplayer(val);
          }}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isMultiplayer}
          label={'Multiplayer'}
        />

        {isMultiplayer && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.scrollViewContents}>
              <TextInputComponent
                placeholder={'Name'}
                borderColor={isValidName ? '#3bea06' : '#767577'}
                onChangeText={setUserName}
                inputValue={userName}
                editable={!(isMultiplayer && players && players.length >= 2)}
              />
              <TextInputComponent
                placeholder={'Room name'}
                borderColor={isValidRoomName ? '#3bea06' : '#767577'}
                onChangeText={setRoomName}
                inputValue={roomName}
                editable={!(isMultiplayer && players && players.length >= 2)}
              />
              <Text style={styles.title}>Players</Text>
              {players &&
                Object.values(players).map((item: any, index) => {
                  return (
                    <Text style={styles.userNames} key={index}>
                      {item.name}
                    </Text>
                  );
                })}
              {/* {users &&
                users.map((item: string, index: number) => (
                  <Text style={styles.userNames} key={index}>
                    {item}
                  </Text>
                ))} */}
              <CTA
                disabled={!isValidRoomName}
                title={'Join room'}
                onPress={joinRoom}
              />
            </View>
          </ScrollView>
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
  },
  image: {
    width: '100%',
    height: '35%',
    marginBottom: 30,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    paddingBottom: 100,
  },
  title: {
    marginLeft: 10,
    marginVertical: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  userNames: {
    marginLeft: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  scrollViewContents: {
    height: '100%',
  },
});
