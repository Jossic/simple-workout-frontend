import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StartupScreen from '../screens/StartupScreen';
import TrainingScreen from '../screens/TrainingScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpdateExerciceScreen from '../screens/UpdateExerciceScreen';
import AddExerciceForm from '../components/Forms/AddExerciceForm';
import AddWorkoutForm from '../components/Forms/AddWorkoutForm';

// Auth stack navigator
const AuthStack = createNativeStackNavigator();

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

export default function Navigation({}) {
  const didTryAutoLogin = useSelector((state) => {
    return state.auth.didTryAutoLogin;
  });
  const isAuth = !!useSelector((state) => state.auth.userId);

  return (
    <NavigationContainer>
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
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Training"
        component={AddWorkoutForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Exercice"
        component={AddExerciceForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Exercice"
        component={UpdateExerciceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Training') {
            iconName = focused ? 'aperture' : 'aperture-outline';
          } else if (route.name === 'Exercice') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          title: 'Accueil',
          // Ajouter bouton avec profil
        })}
      />
      <BottomTab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          title: "S'entrainer",
        }}
      />
      <BottomTab.Screen
        name="Exercice"
        component={WorkoutsScreen}
        options={{
          title: 'Workouts',
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Suivi',
        }}
      />
    </BottomTab.Navigator>
  );
}

// Startup stack navigator
const StartupStack = createNativeStackNavigator();

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
