import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface CustomInputProps {
  name: string;
  control: Control<FieldValues, object> | undefined;
  placeholder: string;
  rules: object;
  label: string;
  errors: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  placeholder,
  rules,
  label,
  errors,
}) => {
  return (
    <>
      <Text style={styles.label}>Nom d'utilisateur</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Nom d'utilisateur..."
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
          name={name}
          rules={rules}
        />
      </View>
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
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
  error: {
    color: 'red',
    marginTop: 5,
  },
});
