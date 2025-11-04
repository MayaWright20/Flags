import { COLOURS } from '@/constants/colours';
import {
  BORDER_RADIUS,
  FONTS_VARIANTS,
  MARGIN,
  PADDING,
  SHADOW,
} from '@/constants/styles';
import { useEffect, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
} from 'react-native';

export default function TextInputComponent({
  placeholder,
  onChangeText,
  keyboardType,
  maxLength,
  autoCapitalize,
  errorState,
  errorMessage,
  isInputHidden,
  borderColor = COLOURS.black,
  isMultiline,
  clear,
  inputValue,
  showMaxLengthPill,
  editable = true,
}: {
  placeholder: string;
  onChangeText: ((text: string) => void) | undefined;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorState?: boolean;
  errorMessage?: string;
  isInputHidden?: boolean;
  borderColor?: string;
  styleInput?: TextStyle;
  isMultiline?: boolean;
  clear?: boolean;
  inputValue?: string;
  showMaxLengthPill?: boolean;
  editable?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const handleChange = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const clearText = () => {
    setValue('');
  };

  useEffect(() => {
    if (clear) {
      setValue('');
      onChangeText?.('');
    }
  }, [clear, onChangeText]);

  return (
    <>
    <Text style={[styles.label, {color: borderColor}]}>{placeholder}</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            padding: isFocused
              ? PADDING.LARGE_PADDING
              : PADDING.LARGE_PADDING + 1,
            borderWidth: isFocused ? 2 : 1,
            ...FONTS_VARIANTS.TEXT_INPUT,
            borderColor: errorState ? COLOURS.red : borderColor,
            ...SHADOW,
            borderRadius: isMultiline
              ? BORDER_RADIUS.LARGE_BORDER_RADIUS
              : BORDER_RADIUS.XLARGE_BORDER_RADIUS,
          },
        ]}
        value={inputValue ? inputValue : value}
        multiline={isMultiline}
        // placeholder={placeholder}
        onChangeText={clear ? clearText : handleChange}
        keyboardType={keyboardType}
        lineBreakStrategyIOS="none"
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isInputHidden}
        editable={editable}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingLeft: PADDING.SMALL_PADDING,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.white,
    marginVertical: MARGIN.MEDIUM_MARGIN,
    padding: PADDING.XLARGE_PADDING,
  },
  errorText: {
    color: COLOURS.purple,
    fontSize: 15,
    margin: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  maxLengthPill: {
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
