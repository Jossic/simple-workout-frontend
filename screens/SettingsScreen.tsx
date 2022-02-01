import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ExerciceScreenProps {}

const SettingsScreen: React.FC<ExerciceScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
