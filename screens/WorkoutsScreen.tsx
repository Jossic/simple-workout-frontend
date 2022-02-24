import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Exercice from '../components/Exercice/Exercice';
import Colors from '../constants/Colors';
import * as workoutActions from '../store/actions/workoutActions';
import { RootTabScreenProps } from '../types';
import PlusButton from '../components/Layout/PlusButton';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

type WorkoutsScreenProps = NativeStackHeaderProps;

const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({ navigation }) => {
  const exercices = useSelector((state) => state.workout?.exercices);

  const userId = useSelector((state) => state.auth?.userId);
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workoutActions.getExercices(userId, token));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.workout}>
        <Text style={styles.title}>Mes workouts</Text>
        <FlatList
          data={exercices}
          renderItem={({ item }) => <Exercice exercice={item} />}
        />
      </View>
      <View style={styles.exercise}>
        <Text style={styles.title}>Mes exercices</Text>
        <FlatList
          data={exercices}
          renderItem={({ item }) => <Exercice exercice={item} />}
        />
      </View>
      <PlusButton navigation={navigation} />
    </View>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workout: {
    flex: 0.45,
    // borderColor: 'rgba(0,0,0,0.5)',
    // borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  exercise: {
    flex: 0.45,
    // borderColor: 'rgba(0,0,0,0.5)',
    // borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
