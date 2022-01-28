import React from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthStackScreenProps } from '../types';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Colors from '../constants/Colors';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../store/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';

interface SignUpScreenProps {
  email: string;
  username: string;
  password: string;
}

const SignUpScreen = ({ navigation }: AuthStackScreenProps<'SignUp'>) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpScreenProps>();

  const onSubmit: SubmitHandler<SignUpScreenProps> = async (data) => {
    const { email, username, password } = data;
    try {
      await dispatch(authActions.signup(username, email, password));
      navigation.navigate('ConfirmLogin', { username });
    } catch (error) {
      console.log(`error =>`, error.message);
      Alert.alert('Action impossible', error.message);
      // switch (error.message) {
      // 	case 'EMAIL_EXISTS':
      // 		Alert.alert(
      // 			'Action impossible',
      // 			'Cet email est déja utilisé.'
      // 		);
      // 		break;

      // 	default:
      // 		Alert.alert(
      // 			'Action impossible',
      // 			'Une erreur est survenue.'
      // 		);
      // 		break;
      // }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container2}>
            <Text style={styles.title}>Simple-Workout</Text>
            <Text style={styles.slogan}>Suivez tous vos workouts</Text>

            <View style={styles.logView}>
              <Text style={styles.log}>Inscription</Text>
            </View>

            <View style={[styles.form, { marginTop: 30 }]}>
              {/* <Text style={styles.label}>Nom d'utilisateur</Text>
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
                  name="username"
                  rules={{
                    required: {
                      value: true,
                      message: "Merci de renseigner votre nom d'utilisateur",
                    },
                  }}
                />
              </View>
              {errors.username && (
                <Text style={styles.error}>{errors.username.message}</Text>
              )} */}
              <CustomInput
                name={'username'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Merci de renseigner votre nom d'utilisateur",
                  },
                }}
                placeholder="Nom d'utilisateur..."
                label="Nom d'utilisateur"
                errors={errors}
              />
              <CustomInput
                name={'email'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Merci de renseigner votre mail',
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Merci de renseigner un mail valide',
                  },
                }}
                keyboardType="email-address"
                autoFocus
                autoCorrect={false}
                placeholder="Email..."
                label="Email"
                errors={errors}
              />
              <CustomInput
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: 'Merci de renseigner votre password',
                  },
                  minLength: {
                    value: 6,
                    message: 'Le password doit comporter mini 6 caractères',
                  },
                }}
                control={control}
                secureTextEntry={true}
                placeholder="Mot de passe..."
                label="Mot de passe"
                errors={errors}
              />
              <CustomInput
                name="repeatPassword"
                rules={{
                  required: {
                    value: true,
                    message: 'Merci de renseigner votre password',
                  },
                  minLength: {
                    value: 6,
                    message: 'Le password doit comporter mini 6 caractères',
                  },
                }}
                control={control}
                secureTextEntry={true}
                placeholder="Répéter le mot de passe..."
                label="Mot de passe"
                errors={errors}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.submit}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitText}>Créer un compte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.submit}
              onPress={() => console.log('press')}
            >
              <Text style={styles.switchButton}>
                Déja un compte ? Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
  },
  container2: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  slogan: {
    color: 'white',
    paddingHorizontal: 15,
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
  input: {
    maxHeight: 150,
    fontSize: 16,
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
  form: {
    marginTop: 30,
    padding: 30,
    backgroundColor: Colors.ternary,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.85,
  },
  label: {
    marginBottom: 5,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  switchButton: {
    color: 'white',
    marginTop: 30,
  },
  log: {
    color: 'white',
    fontSize: 20,
  },
  logView: {
    marginTop: 20,
    backgroundColor: Colors.primaryFaded,
    borderRadius: 15,
    padding: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
});
