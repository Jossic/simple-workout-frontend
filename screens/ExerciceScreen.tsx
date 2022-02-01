import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';

interface ExerciceScreenProps {}

const ExerciceScreen: React.FC<ExerciceScreenProps> = ({ navigation }) => {
  const exercices = useSelector((state) => state.exercices);
  return (
    <View style={styles.container}>
      <Text>ExerciceScreen</Text>

      <FlatList
        data={exercices}
        renderItem={({ item }) => <Note item={item} />}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Image
                source={
                  exercice.logo
                    ? { uri: exercice.logo }
                    : require('../assets/images/default-logo.png')
                }
                style={styles.logo}
              />

              <Text style={styles.title}>{project.name}</Text>
            </View>
            {notes[0] ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 30 }}
                onPress={() =>
                  navigation.navigate('addNote', {
                    project,
                  })
                }
              >
                <View style={styles.smallAddButton}>
                  <Text style={styles.smallAddButtonText}>Ajouter</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                {/* <Image
                  source={require('../assets/empty.png')}
                  style={styles.image}
                /> */}
                <Text>Commecez par ajouter votre première note.</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('addNote', {
                      project,
                    })
                  }
                >
                  <LinearGradient
                    colors={Colors.linear}
                    style={styles.addButton}
                  >
                    <Text style={styles.addButtonText}>Ajouter une note</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      />

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
