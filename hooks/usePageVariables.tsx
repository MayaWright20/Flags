import { useWindowDimensions } from 'react-native';

export const usePageVariables = () => {
  const { width } = useWindowDimensions();
  const pageWidth = (width / 100) * 95;
  const pageMarginHorizontal = { marginHorizontal: (width / 100) * 2.5 };
  const marginHorizontal = (width / 100) * 2.5;

  return {
    pageWidth,
    pageMarginHorizontal,
    marginHorizontal,
  };
};
