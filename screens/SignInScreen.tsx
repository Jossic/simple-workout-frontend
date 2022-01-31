import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { AuthStackScreenProps } from '../types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import tw from 'tailwind-react-native-classnames';

import * as authActions from '../store/actions/authActions';
import Colors from '../constants/Colors';
import { AuthProps } from '../types/auth';

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

// Initialize Firebase
initializeApp({
  /* Config */
});

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = ({ navigation }: AuthStackScreenProps<'SignIn'>) => {
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
  });

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>({
    resolver: yupResolver(validationSchema),
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '919370685993-ntup1fltq6ar28largad5jpvcd1f4bni.apps.googleusercontent.com',
  });

  console.log(`response =>`, response);
  console.log(`request =>`, request);
  console.log(`promptAsync =>`, promptAsync);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
    const { email, password } = data;
    try {
      await dispatch(authActions.signin(email, password));
      navigation.navigate('Home');
    } catch (error) {
      switch (error.message) {
        case 'EMAIL_NOT_FOUND':
          Alert.alert('Identifiants et/ou mot de passe invalide', undefined);
          break;
        case 'INVALID_PASSWORD':
          Alert.alert('Identifiants et/ou mot de passe invalide', undefined);
          break;
        case 'USER_DISABLED':
          Alert.alert('Votre compte a été bloqué', undefined);
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
              <Text style={[styles.log, tw``]}>Se connecter</Text>
              <Button
                disabled={!request}
                title="Connexion"
                onPress={() => {
                  promptAsync();
                }}
              />
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
            </View>
            <LinearGradient
              colors={Colors.linear}
              style={[styles.submit, tw``]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={[styles.submitText, tw``]}>Se connecter</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.submit}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={[styles.switchButton, tw``]}>
                Pas de compte ? Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

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
