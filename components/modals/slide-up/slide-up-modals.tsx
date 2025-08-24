import SlideUpModal from '@/components/modals/slide-up/slide-up-modal';
import { COLOURS } from '@/constants/colours';
import { ReactNode } from 'react';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';

export default function SlideUpModals({
  authCTANumber,
  pageHandler,
  modalContent,
  children,
  style,
}: {
  authCTANumber: number;
  pageHandler: (isNextPage: boolean) => void;
  modalContent: any;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <>
      {authCTANumber > 0 &&
        modalContent.map((item: any, index: number) => {
          const calculatedHeight = screenHeight - (index * screenHeight) / 55;
          if (index < authCTANumber) {
            return (
              <SlideUpModal
                key={index}
                height={calculatedHeight}
                smallCTAHandler={() => {
                  pageHandler(false);
                }}
                isUp={index <= authCTANumber}
                toValue={60}
                color={COLOURS.white}
                backgroundColor={item.borderColor}
                smallCTATitle={item.smallCTATitle}
                largeCTATitle={item.largeCTATitle}
                largeCTAHandler={item.largeCTAHandler}
                disabledLargeCTA={item.disabledCTA}
                childrenContent={item.content}
                style={style}
              >
                {children}
              </SlideUpModal>
            );
          }
        })}
    </>
  );
}
