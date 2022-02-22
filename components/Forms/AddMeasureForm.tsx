import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AddMeasureFormProps {}

const AddMeasureForm: React.FC<AddMeasureFormProps> = () => {
  return (
    <View style={styles.container}>
      <Text>AddMeasureForm</Text>
    </View>
  );
};

export default AddMeasureForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
});
