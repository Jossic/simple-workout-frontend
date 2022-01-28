import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
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
import { useRoute } from '@react-navigation/native';

interface ConfirmLoginSceenProps {
  username: string;
  code: string;
}

const ConfirmLoginSceen = ({
  navigation,
}: AuthStackScreenProps<'ConfirmLogin'>) => {
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmLoginSceenProps>({
    defaultValues: { username: route?.params?.username },
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ConfirmLoginSceenProps> = async (data) => {
    console.log(`data =>`, data);
    const { username, code } = data;
    try {
      await dispatch(authActions.confirm(username, code));
      // navigation.navigate('Home');
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
            name={'username'}
            control={control}
            placeholder={"Nom d'utilisateur"}
            rules={{}}
            errors={errors}
          />
          <CustomInput
            label={'Votre code'}
            name={'code'}
            control={control}
            placeholder={'Votre code'}
            rules={{}}
            errors={errors}
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
