import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Exercice from '../components/Exercice/Exercice';
import Colors from '../constants/Colors';
import * as workoutActions from '../store/actions/workoutActions';
import { FloatingAction } from 'react-native-floating-action';
import { RootTabScreenProps } from '../types';

interface ExerciceScreenProps {}

const ExerciceScreen = ({ navigation }: RootTabScreenProps<'Exercice'>) => {
  const exercices = useSelector((state) => state.workout?.exercices);

  const userId = useSelector((state) => state.auth?.userId);
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();

  const actions = [
    {
      text: 'Ajouter un exercice',
      icon: <Icon name="barbell" style={styles.actionButtonIcon} />,
      name: 'Add Exercice',
      position: 1,
      color: Colors.secondary,
    },
    {
      text: 'Ajouter une séance',
      icon: <Icon name="contract" style={styles.actionButtonIcon} />,
      name: 'Add Training',
      position: 2,
      color: Colors.secondary,
    },
  ];

  useEffect(() => {
    dispatch(workoutActions.getExercices(userId, token));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercices}
        renderItem={({ item }) => <Exercice exercice={item} />}
      />

      <TouchableWithoutFeedback testID="plusButton">
        <FloatingAction
          actions={actions}
          color={Colors.primary}
          onPressItem={(nav) => {
            navigation.navigate(nav);
          }}
        />
      </TouchableWithoutFeedback>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    // backgroundCol   or: Colors.primaryFaded,
  },
});
