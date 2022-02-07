import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import CustomInput from '../components/CustomAuthInput';
import { AuthStackScreenProps } from '../types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import tw from 'tailwind-react-native-classnames';

import * as authActions from '../store/actions/authActions';
import Colors from '../constants/Colors';
import { AuthProps } from '../types/auth';

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

  const methods = useForm<AuthProps>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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
          <ImageBackground
            source={require('../assets/images/backGround.jpg')}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={[styles.container2, tw``]}>
              <Text style={[styles.title, tw``]}>Simple-Workout</Text>
              <Text style={[styles.slogan, tw``]}>
                Suivez tous vos workouts
              </Text>
              <View style={[styles.logView, tw``]}>
                <Text style={[styles.log, tw``]}>Connexion</Text>
              </View>
              <FormProvider {...methods}>
                <CustomInput
                  fieldName={'email'}
                  keyboardType="email-address"
                  testID="email"
                  autoFocus
                  autoCorrect={false}
                  placeholder="Email..."
                  label="Email"
                />
                <CustomInput
                  fieldName="password"
                  testID="password"
                  secureTextEntry={true}
                  placeholder="Mot de passe..."
                  label="Mot de passe"
                />

                <LinearGradient
                  colors={Colors.linear}
                  style={[styles.submit, tw``]}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    testID="submitAuth"
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
              </FormProvider>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.transparent,
    // paddingHorizontal: 25,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  container2: {
    flex: 1,
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  slogan: {
    color: Colors.secondary,
    paddingHorizontal: 15,
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
