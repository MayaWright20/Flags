import { COLOURS } from '@/constants/colours';
import useProfile from '@/hooks/useProfile';
import { useStore } from '@/store/store';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';

export default function FavouriteIcon({
  size,
  favouritedItem,
  styles,
  color = 'red',
  disabled,
}: {
  size: number;
  favouritedItem: string;
  styles: StyleProp<ViewStyle>;
  color?: string;
  disabled?: boolean;
}) {
  const { setFavourites } = useProfile();
  const favourites = useStore((state) => state.favourites);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => setFavourites(favouritedItem)}
      style={styles}
    >
      <IconSymbol
        size={size}
        name={favourites.includes(favouritedItem) ? 'heart.fill' : 'heart'}
        color={disabled ? COLOURS.lightGrey : color}
      />
    </TouchableOpacity>
  );
}
