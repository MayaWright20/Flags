import { COLOURS } from '@/constants/colours';
import { FONTS_VARIANTS } from '@/constants/styles';
import { useStore } from '@/store/store';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CTA from '../buttons/large-cta';
import TextInputComponent from '../text-inputs/text-input';

export enum FORM_TYPES {
  TEXT_INPUT = 'TEXT_INPUT',
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return action.payload;
    default:
      return state;
  }
}

export default function Form({
  content,
  color,
  title,
  ctaTitle,
  ctaHandler,
  hasCTA,
}: {
  content: any[];
  color: string;
  title?: string;
  ctaTitle?: string;
  ctaHandler?: () => void;
  hasCTA?: boolean;
}) {
  const setIsAuthCTADisabled = useStore((state) => state.setIsAuthCTADisabled);
  const authCTANumber = useStore((state) => state.authCTANumber);
  const isAuthLoginRoute = useStore((state) => state.isAuthLoginRoute);
  const setFormData = useStore((state) => state.setFormData);

  const [initialArgs, setInitialArgs] = useState({});
  const [isFormCTADisabled, setIsFormCTADisabled] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialArgs);

  const isFormValid = useCallback(() => {
    const validInputs = Object.values(state).every(
      (value: any) => value?.trim?.() !== ''
    );

    const DATE_REGEX = /^\d+,\d+,\d{4,}$/;
    const validDate = DATE_REGEX.test(state['Date of Birth']);

    if (state['Date of Birth']) {
      return validInputs && validDate;
    } else {
      return validInputs;
    }
  }, [state]);

  useEffect(() => {
    if (isFormValid() || (!isAuthLoginRoute && authCTANumber === 0)) {
      setIsAuthCTADisabled(false);
      setIsFormCTADisabled(false);
    } else {
      setIsAuthCTADisabled(true);
      setIsFormCTADisabled(true);
    }
  }, [
    state,
    isFormValid,
    setIsFormCTADisabled,
    setIsAuthCTADisabled,
    authCTANumber,
    isAuthLoginRoute,
  ]);

  const handleTextChange = (text: string, fieldName: string | string[]) => {
    if (typeof fieldName !== 'string') {
      fieldName = String(fieldName);
    }
    dispatch({
      type: 'SET_FIELD',
      field: fieldName,
      value: text,
    });
    setFormData(state);
  };

  useEffect(() => {
    const initialContentTitles = [...content.map((item) => item.title)];
    const initialArgsObj = initialContentTitles.reduce((accumulator, title) => {
      accumulator[title] = '';
      return accumulator;
    }, {} as Record<string, string>);

    dispatch({ type: 'RESET_FORM', payload: initialArgsObj });
    setInitialArgs(initialArgsObj);
  }, [content]);

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        {title && <Text style={styles.formTitle}>{title}</Text>}
        {content.map((item, index) => {
          switch (item.formType) {
            case FORM_TYPES.TEXT_INPUT:
              return (
                <View key={index}>
                  {item.showTitle && (
                    <Text style={styles.title}>{item.title}</Text>
                  )}
                  <TextInputComponent
                    isMultiline={item.isMultiline ? true : false}
                    placeholder={item.title}
                    onChangeText={(text) => handleTextChange(text, item.title)}
                    borderColor={color}
                    isInputHidden={item.isInputHidden}
                    keyboardType={item.keyboardType || undefined}
                    showMaxLengthPill={item.showMaxLengthPill}
                    maxLength={item.maxLength}
                    // errorState={

                    //   item.regex &&
                    //   !item.regex.test(state[item.title]) &&
                    //   state[item.title].trim() !== ''
                    // }
                    // errorMessage={
                    //   item.regex && item.regex.test(state[item.title])
                    //     ? undefined
                    //     : item.errorMessage
                    // }
                  />
                </View>
              );
          }
        })}
      </View>
      {hasCTA && ctaTitle && (
        <View style={[styles.btnWrapper]}>
          <CTA
            disabled={isFormCTADisabled}
            title={ctaTitle}
            onPress={ctaHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.lightYellow,
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formTitle: {
    ...FONTS_VARIANTS.LARGE_TITLE,
    textAlign: 'center',
  },
  title: {
    ...FONTS_VARIANTS.REGULAR_TITLE,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnWrapper: {
    paddingHorizontal: 20,
  },
});
