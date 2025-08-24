import {
  BORDER_RADIUS,
  FONTS_VARIANTS,
  MARGIN,
  PADDING,
  SHADOW,
} from '@/constants/styles';
import { usePageVariables } from '@/hooks/usePageVariables';
import useStarRating from '@/lib/utils/useStarRating';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import SmallRoundLabel from '../labels/small-round-label';

export enum CardTypes {
  CUISINE = 'CUISINE',
  LOCAL_AREA = 'LOCAL_AREA',
  SQUARE = 'SQUARE',
  TOP_RATED = 'TOP_RATED',
}

export default function Card({
  type,
  content,
}: {
  type?: CardTypes;
  content: any;
}) {
  const getStyle = () => {
    switch (type) {
      case CardTypes.CUISINE:
        return styles.cuisineContainer;
      case CardTypes.LOCAL_AREA:
        return styles.localAreaContainer;
      case CardTypes.SQUARE:
        return styles.squareContainer;
      case CardTypes.TOP_RATED:
        return styles.topRatedContainer;
    }
  };

  const { width, height } = useWindowDimensions();

  const rating = useStarRating(content.rating);
  const fullStars = Array(rating.fullStars).fill(' ');
  const halfStars = Array(rating.halfStars).fill(' ');
  const emptyStars = Array(rating.emptyStars).fill(' ');

  return (
    <TouchableOpacity
      style={[
        {
          margin: usePageVariables().marginHorizontal / 2,
          width: width / 2.1,
          height: height / 2.5,
        },
      ]}
    >
      <View style={[styles.imageWrapper, getStyle(), { height: height / 3.5 }]}>
        <Image
          source={{
            uri: content.image,
          }}
          style={{ width: '100%', height: '100%' }}
        />
        {content.rating >= 5 && <SmallRoundLabel title={'Diner favourite'} />}

        <View style={styles.iconWrapper}>
          <AntDesign
            name={content.isFavourited ? 'heart' : 'hearto'}
            size={24}
            color="red"
          />
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={[{ ...FONTS_VARIANTS.EYE_BROW }, styles.nameOfEvent]}>
          {content.title}
        </Text>
        <Text style={[{ ...FONTS_VARIANTS.REGULAR }, styles.nameOfEvent]}>
          £{content.price}
        </Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={{ ...FONTS_VARIANTS.REGULAR }}>{content.date}</Text>
        <View style={styles.starsWrapper}>
          {fullStars.map((_, index) => (
            <FontAwesome key={index} name="star" size={15} color="black" />
          ))}
          {halfStars.map((_, index) => (
            <FontAwesome
              key={index}
              name="star-half-empty"
              size={15}
              color="black"
            />
          ))}
          {emptyStars.map((_, index) => (
            <FontAwesome key={index} name="star-o" size={15} color="black" />
          ))}
        </View>
      </View>
      <Text>{content.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: BORDER_RADIUS.MEDIUM_BORDER_RADIUS,
    width: '100%',
    ...SHADOW,
    overflow: 'hidden',
    objectFit: 'cover',
  },
  iconWrapper: {
    position: 'absolute',
    alignSelf: 'flex-end',
    margin: MARGIN.MEDIUM_MARGIN,
  },
  cuisineContainer: {
    backgroundColor: 'red',
  },
  localAreaContainer: {
    backgroundColor: 'orange',
  },
  squareContainer: {
    backgroundColor: 'yellow',
  },
  topRatedContainer: {
    backgroundColor: 'green',
    height: 125,
    aspectRatio: 0.8,
  },
  nameOfEvent: {
    // textAlign: 'center',
    marginTop: 4,
  },
  contentDetailsWrapper: {
    // padding: PADDING.MEDIUM_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
    maxWidth: '100%',
  },
  dinnerFavouriteWrapper: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingVertical: PADDING.SMALL_PADDING,
    paddingHorizontal: PADDING.MEDIUM_PADDING,
    margin: MARGIN.MEDIUM_MARGIN,
    borderRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
  },
  starsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // margin: MARGIN.MEDIUM_MARGIN,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
