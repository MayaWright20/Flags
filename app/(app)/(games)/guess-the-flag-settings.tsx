import SwitchBtn from '@/components/buttons/switch';
import useProfile from '@/hooks/useProfile';
import { useStore } from '@/store/store';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuessTheFlagSettingScreen() {
  const {
    isGuessTheFlagWriteAnswer,
    setIsGuessTheFlagWriteAnswer,
    // setGameUserName,
    gameUserName,
  } = useProfile();
  const isMultiplayer = useStore((state: any) => state.isMultiplayer);
  const setIsMultiplayer = useStore((state: any) => state.setIsMultiplayer);
  // const roomName = useStore((state: any) => state.roomName);
  // const setRoomName = useStore((state: any) => state.setRoomName);
  const players = useStore((state: any) => state.players);
  const setPlayers = useStore((state: any) => state.setPlayers);

  // const isValidRoomName = useMemo(
  //   () => roomName.trim() !== '' && roomName.length >= 4,
  //   [roomName]
  // );
  // const isValidName = useMemo(
  //   () => gameUserName.trim() !== '' && gameUserName.length >= 2,
  //   [gameUserName]
  // );
  // const { users, setHasGameStarted } = useRealtimePresenceRoom(roomName);

  // const startGame = () => {
  //   setHasGameStarted(true);
  // };

  // useEffect(() => {
  //   if (!users) return;
  //   setPlayers(users);
  // }, [users, setPlayers]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/settings.webp')}
          style={styles.image}
        />
        <SwitchBtn
          onValueChange={setIsGuessTheFlagWriteAnswer}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isGuessTheFlagWriteAnswer}
          label={'Write the answer'}
        />
        {/* <SwitchBtn
          onValueChange={(val: boolean) => {
            if (val !== true) {
            }
            setIsMultiplayer(val);
          }}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isMultiplayer}
          label={'Multiplayer'}
        /> */}

        {/* {isMultiplayer && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.scrollViewContents}>
              <TextInputComponent
                placeholder={'Name'}
                borderColor={isValidName ? '#3bea06' : '#767577'}
                onChangeText={setGameUserName}
                inputValue={gameUserName}
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
                Object.values(players).map((item: any, index) => (
                  <Text style={styles.userNames} key={index}>
                    {item.name}
                  </Text>
                ))}
              {players &&
                Object.values(players).map((item: any, index) => {
                  if (item.name === gameUserName && index === 0) {
                    return (
                      <CTA
                        key={index}
                        title={'Start'}
                        onPress={startGame}
                        disabled={players.length < 2}
                      />
                    );
                  } else if (item.name === gameUserName) {
                    return (
                      <Text style={styles.waitingText} key={index}>
                        Waiting to start...
                      </Text>
                    );
                  }
                })}
            </View>
          </ScrollView>
        )} */}
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
  waitingText: {
    marginLeft: 10,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollViewContents: {
    height: '100%',
  },
});
