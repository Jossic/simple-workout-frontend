import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Colors from '../constants/Colors';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';
import { AuthProps } from '../types/auth';

type CustomWorkoutInputProps = {
  fieldName:
    | 'name'
    | 'description'
    | 'variant'
    | 'type'
    | 'instructions'
    | 'units';
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
};

const CustomWorkoutInput: React.FC<CustomWorkoutInputProps> = ({
  fieldName,
  placeholder,
  label,
  keyboardType = 'default',
  secureTextEntry = false,
  autoFocus = false,
  autoCorrect = false,
  multiline = false,
}) => {
  const methods = useFormContext();
  return (
    <>
      <Text style={[styles.label, tw``]}>{label}</Text>
      <Controller
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
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  autoFocus={autoFocus}
                  autoCorrect={autoCorrect}
                  multiline={multiline}
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

export default CustomWorkoutInput;

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
