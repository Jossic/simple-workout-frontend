import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SignInScreenProps {}

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
