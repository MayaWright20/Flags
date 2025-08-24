import { COLOURS } from '@/constants/colours';
import { BORDER_RADIUS, SHADOW_LARGE } from '@/constants/styles';
import React, { ReactNode, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import SmallCTA from '../../buttons/small-cta';

const { height: screenHeight } = Dimensions.get('window');

export default function SlideUpModal({
  children,
  isUp,
  toValue = 0,
  color,
  backgroundColor,
  smallCTATitle = 'Back',
  smallCTAHandler,
  largeCTATitle,
  largeCTAHandler,
  height = screenHeight - 50,
  disabledLargeCTA,
  childrenContent,
  style,
}: {
  children: ReactNode;
  isUp: boolean;
  toValue?: number;
  color: string;
  backgroundColor: string;
  smallCTATitle: string;
  smallCTAHandler: (event: GestureResponderEvent) => void;
  largeCTATitle?: string;
  largeCTAHandler?: (event: GestureResponderEvent) => void;
  height?: number | Animated.Value | 'auto' | `${number}%`;
  disabledLargeCTA?: boolean;
  childrenContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  // Initial position: off-screen at the bottom
  const translateYAnim = React.useRef(new Animated.Value(screenHeight)).current;

  const slideDown = () => {
    Animated.timing(translateYAnim, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = () => {
    Animated.timing(translateYAnim, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isUp) {
      slideDown();
    } else {
      slideUp();
    }
  }, [isUp]);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: backgroundColor,
            height: height,
            transform: [{ translateY: translateYAnim }],
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            ...SHADOW_LARGE,
          },
        ]}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.smallCTAWrapper}>
            <SmallCTA
              onPress={smallCTAHandler}
              color={color}
              backgroundColor={backgroundColor}
              title={smallCTATitle}
              styleInput={{ ...styles.smallCTA }}
            />
          </View>
          <KeyboardAvoidingView
            style={styles.contentWrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          >
            <ScrollView
              contentContainerStyle={[styles.scrollContent, style]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
              {childrenContent}
              {/* {largeCTATitle && (
                <View style={[styles.btnsContainer, styles.wrapper]}>
                  <CTA
                    disabled={disabledLargeCTA}
                    title={largeCTATitle}
                    onPress={largeCTAHandler}
                  />
                </View>
              )} */}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingTop: 35,
    width: '100%',
    height: '100%',
    maxHeight: screenHeight,
    borderTopLeftRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
    borderWidth: 2,
    // // Shadow for iOS
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: -10 },
    // shadowOpacity: 0.9,
    // shadowRadius: 8,
    // // Shadow for Android
    // elevation: 12,
    backgroundColor: COLOURS.lightYellow,
    position: 'relative',
  },
  safeAreaView: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  smallCTAWrapper: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  smallCTA: {
    opacity: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    position: 'relative',
    // paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: '50%',
    // paddingHorizontal: 10,
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
  },
});
