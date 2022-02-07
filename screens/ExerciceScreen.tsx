import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Exercice from '../components/Exercice/Exercice';
import Colors from '../constants/Colors';
import * as workoutActions from '../store/actions/workoutActions';

interface ExerciceScreenProps {}

const ExerciceScreen: React.FC<ExerciceScreenProps> = ({ navigation }) => {
  const exercices = useSelector((state) => state.workout.exercices);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workoutActions.getExercices(userId, token));
  }, []);
  return (
    <View style={styles.container}>
      <Text>ExerciceScreen</Text>

      <FlatList
        data={exercices}
        renderItem={({ item }) => <Exercice item={item} />}
      />

      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Add Exercice')}
      >
        <LinearGradient colors={Colors.linear} style={styles.addButton}>
          <Text style={styles.addButtonText}>Ajouter un exercice</Text>
        </LinearGradient>
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.logout}
        // onPress={onLogoutPressHandler}
      >
        <Ionicons name="add-outline" color="white" size={23} />
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
