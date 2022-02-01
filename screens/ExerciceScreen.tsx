import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ExerciceScreenProps {}

const ExerciceScreen: React.FC<ExerciceScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>ExerciceScreen</Text>
    </View>
  );
};

export default ExerciceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
