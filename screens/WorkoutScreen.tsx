import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WorkoutScreenProps {}

const WorkoutScreen: React.FC<WorkoutScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>WorkoutScreen</Text>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
