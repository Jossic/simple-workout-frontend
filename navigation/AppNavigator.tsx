// Librairies
import React from 'react';
import {
	AppModalStack,
	AuthenticatorStackNavigator,
	StartupStackNavigator,
} from './Navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';

export const AppNavigator = () => {
	const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
	const isAuth = !!useSelector((state) => state.auth.userId);

	const getDeviceToken = async () => {
		const deviceToken = await Notifications.getExpoPushTokenAsync();
	};

	if (isAuth) {
		// Recup le token de l'appareil
		getDeviceToken();
	}

	return (
		<NavigationContainer>
			{didTryAutoLogin && !isAuth && <AuthenticatorStackNavigator />}
			{didTryAutoLogin && isAuth && <AppModalStack />}
			{!didTryAutoLogin && <StartupStackNavigator />}
		</NavigationContainer>
	);
};
