import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();

  const onLogoutPressHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.logout}
        onPress={onLogoutPressHandler}
      >
        <Ionicons name="power" color="white" size={23} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
  logout: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
});
