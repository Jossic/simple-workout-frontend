import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authActions';
import Colors from '../constants/Colors';
import { useEffect } from 'react';

const StartupScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData');

			if (!userData) {
				dispatch(authActions.setDidTry());
				return;
			}
			const userInfos = JSON.parse(userData);
			const { token, refreshToken } = userInfos;

			if (!token || !refreshToken) {
				dispatch(authActions.setDidTry());
				return;
			}

			dispatch(authActions.fetchRefreshToken(refreshToken));
		};
		tryLogin();
	}, []);
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size='large' color={Colors.primary} />
			<Text></Text>
		</View>
	);
};

export default StartupScreen;

const styles = StyleSheet.create({});
