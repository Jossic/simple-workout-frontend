import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Colors from '../constants/Colors';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { SignUpScreenProps } from '../screens/SignUpScreen';

type CustomInputProps = {
  name: string;
  control: Control<SignUpScreenProps>;
  placeholder?: string;
  label?: string;
  errorDetails?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  autoCorrect?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  placeholder,
  label,
  keyboardType = 'default',
  secureTextEntry = false,
  autoFocus = false,
  autoCorrect = false,
}) => {
  const [errorText, setErrorText] = useState<string>('');
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          if (error) {
            setErrorText(error.message);
          } else {
            setErrorText('');
          }

          return (
            <View
              style={
                !error ? styles.inputContainer : styles.inputContainerError
              }
            >
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoFocus={autoFocus}
                autoCorrect={autoCorrect}
              />
            </View>
          );
        }}
      />
      {errorText !== '' && <Text style={styles.error}>{errorText}</Text>}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    maxHeight: 150,
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
  },
  inputContainerError: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 15,
    borderColor: 'red',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
