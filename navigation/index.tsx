/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {
  AuthStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  StartupParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import * as Notifications from 'expo-notifications';
import StartupScreen from '../screens/StartupScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciceScreen from '../screens/ExerciceScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import AddExerciceScreen from '../screens/AddExerciceScreen';

// Auth stack navigator
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthenticatorStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default function Navigation({}: // colorScheme,
{
  // colorScheme: ColorSchemeName;
}) {
  const didTryAutoLogin = useSelector((state) => {
    // console.log(`state =>`, state);
    return state.auth.didTryAutoLogin;
  });
  const isAuth = !!useSelector((state) => state.auth.userId);

  const getDeviceToken = async () => {
    const deviceToken = await Notifications.getExpoPushTokenAsync();
  };

  if (isAuth) {
    // Recup le token de l'appareil
    getDeviceToken();
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {didTryAutoLogin && !isAuth && <AuthenticatorStackNavigator />}
      {didTryAutoLogin && isAuth && <RootNavigator />}
      {!didTryAutoLogin && <StartupStackNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Workout"
        component={AddWorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Exercice"
        component={AddExerciceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workout') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Exercice') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Accueil',
          // Ajouter bouton avec profil
        })}
      />
      <BottomTab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          title: 'Workout',
        }}
      />
      <BottomTab.Screen
        name="Exercice"
        component={ExerciceScreen}
        options={{
          title: 'Exercice',
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Startup stack navigator
const StartupStack = createNativeStackNavigator<StartupParamList>();

export const StartupStackNavigator = () => {
  return (
    <StartupStack.Navigator>
      <StartupStack.Screen
        name="Startup"
        component={StartupScreen}
        options={{ headerShown: false }}
      />
    </StartupStack.Navigator>
  );
};
