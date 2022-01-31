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
import { useForm, SubmitHandler } from 'react-hook-form';
import Colors from '../constants/Colors';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import tw from 'tailwind-react-native-classnames';

// Redux
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthProps } from '../types/auth';

import * as Google from 'expo-google-app-auth';

const SignUpScreen = ({ navigation }: AuthStackScreenProps<'SignUp'>) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Merci de saisir un mail valide')
      .required('Veuillez renseigner votre email'),

    password: Yup.string()
      .min(8, 'Saisir au moins 8 caractères')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Votre mot de passe doit contenir un majuscule, une minuscule, un nombre et un caractère spécial'
      )
      .required('Veuillez renseigner votre mot de passe'),
    repeatPassword: Yup.string()
      .min(8, 'Saisir au moins 8 caractères')
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes doivent correspondre'
      )
      .required('Veuillez renseigner votre mot de passe'),
  });
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
    const { email, password } = data;
    try {
      await dispatch(authActions.signup(email, password));
      navigation.navigate('Home');
    } catch (error) {
      switch (error.message) {
        case 'EMAIL_EXISTS':
          Alert.alert('Inscription', 'Cet email est déja utilisé.');
          break;

        default:
          Alert.alert('Action impossible', 'Une erreur est survenue.');
          break;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={[styles.container, tw``]}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.container2, tw``]}>
            <Text style={[styles.title, tw``]}>Simple-Workout</Text>
            <Text style={[styles.slogan, tw``]}>Suivez tous vos workouts</Text>

            <View style={[styles.logView, tw``]}>
              <Text style={[styles.log, tw``]}>Inscription</Text>
            </View>

            <View style={[styles.form, { marginTop: 30 }, tw``]}>
              <CustomInput
                fieldName={'email'}
                control={control}
                keyboardType="email-address"
                autoFocus
                autoCorrect={false}
                placeholder="Email..."
                label="Email"
              />
              <CustomInput
                fieldName="password"
                control={control}
                secureTextEntry={true}
                placeholder="Mot de passe..."
                label="Mot de passe"
              />
              <CustomInput
                fieldName="repeatPassword"
                control={control}
                secureTextEntry={true}
                placeholder="Répéter le mot de passe..."
                label="Mot de passe"
              />
            </View>
            <LinearGradient
              colors={Colors.linear}
              style={[styles.submit, tw``]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={[styles.submitText, tw``]}>Créer un compte</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.submit}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={[styles.switchButton, tw``]}>
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
    // backgroundColor: Colors.secondary,
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
