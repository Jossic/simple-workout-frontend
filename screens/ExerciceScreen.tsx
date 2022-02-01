import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

interface ExerciceScreenProps {}

const ExerciceScreen: React.FC<ExerciceScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ExerciceScreen</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Add Exercice')}
      >
        <LinearGradient colors={Colors.linear} style={styles.addButton}>
          <Text style={styles.addButtonText}>Ajouter un exercice</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 25,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
