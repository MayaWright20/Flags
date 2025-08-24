import { StyleSheet } from 'react-native';

// PAGE
export const PAGE = StyleSheet.create({
  PAGE: {
    flex: 1,
  },
  PAGE_CONTAINER_WITH_MARGIN: {},
  MARGIN: {
    // marginHorizontal: usePageVariables(),
  },
});

// FONT SIZES
export const FONTS_VARIANTS = StyleSheet.create({
  LARGE_TITLE: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  REGULAR_TITLE: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  MEDIUM_DESCRIPTION: {
    fontSize: 15,
  },
  EYE_BROW: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  TEXT_INPUT: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  REGULAR: {
    fontSize: 16,
  },
  SMALL_CTA: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  XSMALL_TEXT_BOLD: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  LARGE_CTA: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

// BORDER RADIUS
export const BORDER_RADIUS = {
  SMALL_BORDER_RADIUS: 5,
  MEDIUM_BORDER_RADIUS: 10,
  LARGE_BORDER_RADIUS: 15,
  XLARGE_BORDER_RADIUS: 50,
};

// PADDING
export const PADDING = {
  SMALL_PADDING: 5,
  MEDIUM_PADDING: 10,
  LARGE_PADDING: 20,
  XLARGE_PADDING: 30,
};

// MARGIN
export const MARGIN = {
  SMALL_MARGIN: 5,
  MEDIUM_MARGIN: 10,
  LARGE_MARGIN: 20,
};

// SHADOWS
export const SHADOW = {
  shadowColor: 'black',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 12,
};

export const SHADOW_LARGE = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 8,
  elevation: 12,
};
