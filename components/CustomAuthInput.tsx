import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Colors from '../constants/Colors';
import { Control, Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';
import { AuthProps } from '../types/auth';

type CustomInputProps = {
  fieldName: 'email' | 'password' | 'repeatPassword';
  placeholder?: string;
  label?: string;
  testID?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  autoCorrect?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  fieldName,
  // control,
  placeholder,
  label,
  testID = 'NS',
  keyboardType = 'default',
  secureTextEntry = false,
  autoFocus = false,
  autoCorrect = false,
}) => {
  const methods = useFormContext();

  return (
    <>
      <Text style={[styles.label, tw``]}>{label}</Text>
      <Controller
        {...methods}
        name={fieldName}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              <View
                style={
                  !error ? styles.inputContainer : styles.inputContainerError
                }
              >
                <TextInput
                  placeholder={placeholder}
                  value={value}
                  onChangeText={onChange}
                  style={[styles.input, tw``]}
                  testID={testID}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  autoFocus={autoFocus}
                  autoCorrect={autoCorrect}
                />
              </View>
              {error?.message !== '' && (
                <Text testID={`errorMessage`} style={[styles.error, tw``]}>
                  {error?.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    maxHeight: 150,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 15,
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    backgroundColor: Colors.secondaryFaded,
  },
  inputContainerError: {
    padding: 15,
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    backgroundColor: Colors.secondaryFaded,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
