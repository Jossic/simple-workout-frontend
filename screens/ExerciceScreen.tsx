import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
      name: 'bt_exercices',
      position: 1,
    },
    {
      text: 'Ajouter une séance',
      icon: <Icon name="contract" style={styles.actionButtonIcon} />,
      name: 'bt_workout',
      position: 2,
    },
  ];

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

      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
        }}
      />

      {/*  <View style={{ flex: 1 }}>
        
        <ActionButton buttonColor={Colors.primary} testID="plusButton">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Ajouter un exercice"
            onPress={() => console.log('press')}
          >
            <Icon name="barbell" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Créer une séance"
            onPress={() => navigation.navigate('Add Training')}
          >
            <Icon name="contract" style={styles.actionButtonIcon} />
          </ActionButton.Item>
               </ActionButton>
      </View> */}
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
    // backgroundColor: Colors.primaryFaded,
  },
});
