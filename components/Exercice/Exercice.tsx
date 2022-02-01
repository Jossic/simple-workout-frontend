import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as workoutActions from '../../store/actions/workoutActions';

interface ExerciceProps {}

const Exercice: React.FC<ExerciceProps> = ({ item }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const onPressHandler = () => {
    Alert.alert('Que souhaitez-vous faire ?', undefined, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () =>
          dispatch(workoutActions.deleteExercice(item.id, userId, token)),
      },
    ]);
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onLongPress={onPressHandler}>
      <View style={styles.note}>
        <Text>
          {item.name}
          {item.variant}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Exercice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 25,
  },
  note: {
    backgroundColor: 'white',
    padding: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
});
