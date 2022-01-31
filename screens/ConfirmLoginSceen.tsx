import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import Colors from '../constants/Colors';
import { AuthStackScreenProps } from '../types';

// Redux
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ConfirmLoginSceenProps {
  username: string;
  code: string;
}

const ConfirmLoginSceen = ({
  navigation,
  route,
}: AuthStackScreenProps<'ConfirmLogin'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmLoginSceenProps>({
    defaultValues: { username: route?.params?.username },
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ConfirmLoginSceenProps> = async (data) => {
    // console.log(`data =>`, data);
    const { username, code } = data;
    try {
      await dispatch(authActions.confirm(username, code));
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(`error =>`, error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomInput
            label={"Nom d'utilisateur"}
            fieldName={'username'}
            control={control}
            placeholder={"Nom d'utilisateur"}
          />
          <CustomInput
            label={'Votre code'}
            fieldName={'code'}
            control={control}
            placeholder={'Votre code'}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitText}>
              {/* {loginMode ? 'Se connecter' : 'Créer un compte'} */}
              Valider
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ConfirmLoginSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
  submitText: {
    color: Colors.primary,
    fontSize: 17,
  },
  submit: {
    backgroundColor: Colors.secondary,
    padding: 10,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
  },
});
