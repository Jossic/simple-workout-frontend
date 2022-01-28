import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import { AuthStackParamList } from '../types';

interface ConfirmLoginSceenProps {}

const ConfirmLoginSceen: React.FC<ConfirmLoginSceenProps> = ({
  navigation,
}: AuthStackParamList<'ConfirmLogin'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <View style={styles.container}>
      <CustomInput
        label={"Nom d'utilisateur"}
        name={'username'}
        control={control}
        placeholder={"Nom d'utilisateur"}
        rules={{}}
        errors={errors}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.submit}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitText}>
          {loginMode ? 'Se connecter' : 'Créer un compte'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmLoginSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
