import { FONTS_VARIANTS, SHADOW } from '@/constants/styles';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

export default function Upload({
  borderColor,
  onChangeText,
}: {
  borderColor: string;
  onChangeText: (value: string) => void;
}) {
  const { width } = useWindowDimensions();

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onChangeText(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: width / 3.5,
          borderColor: borderColor,
          borderWidth: !image ? 1 : 3,
        },
      ]}
      onPress={pickImage}
    >
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!image && (
        <Text style={[{ ...FONTS_VARIANTS.XSMALL_TEXT_BOLD }]}>
          UPLOAD PICTURE
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    aspectRatio: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
