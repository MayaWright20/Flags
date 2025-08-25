import useProfile from '@/hooks/useProfile';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';

export default function FavouriteIcon({
  size,
  favouritedItem,
  styles,
}: {
  size: number;
  favouritedItem: string;
  styles: StyleProp<ViewStyle>;
}) {
  const { setFavourites, favourites } = useProfile();

  return (
    <TouchableOpacity
      onPress={() => setFavourites(favouritedItem)}
      style={styles}
    >
      <IconSymbol
        size={size}
        name={favourites.includes(favouritedItem) ? 'heart.fill' : 'heart'}
        color={'red'}
      />
    </TouchableOpacity>
  );
}
