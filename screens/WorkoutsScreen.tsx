import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Exercice from '../components/Exercice/Exercice';
import Colors from '../constants/Colors';
import * as workoutActions from '../store/actions/workoutActions';
import { RootTabScreenProps } from '../types';
import PlusButton from '../components/Layout/PlusButton';

interface WorkoutsScreenProps {}

const WorkoutsScreen = ({ navigation }: RootTabScreenProps<'Exercice'>) => {
  const exercices = useSelector((state) => state.workout?.exercices);

  const userId = useSelector((state) => state.auth?.userId);
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workoutActions.getExercices(userId, token));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercices}
        renderItem={({ item }) => <Exercice exercice={item} />}
      />
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
});
