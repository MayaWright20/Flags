import CountryScreen from '@/components/screens/country-screen';
import { useLocalSearchParams } from 'expo-router';

export default function CountryDetailsScreen() {
  const { id } = useLocalSearchParams();
  return <CountryScreen countryName={`${id}`} />;
}
