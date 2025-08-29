import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function CountryDetailsScreen() {
  const { id } = useLocalSearchParams();
  return <Text>This is the details {id}</Text>;
}
