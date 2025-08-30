import { Text } from 'react-native';

export default function CountryScreen({
  countryName,
}: {
  countryName: string;
}) {
  return <Text>country = {countryName}</Text>;
}
