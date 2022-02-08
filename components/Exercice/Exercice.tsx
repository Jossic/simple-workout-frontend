import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as workoutActions from '../../store/actions/workoutActions';

import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

interface ExerciceProps {
  exercice: {
    id: string;
    name: string;
    description: string;
    logo: string;
    variant: string;
    type: string;
    unit: string;
  };
}

const Exercice: React.FC<ExerciceProps> = ({ exercice }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => navigation.navigate('Update Exercice', { exercice })}
    >
      <View
        style={[tw`flex flex-row items-center justify-between`, styles.note]}
      >
        <Image
          source={
            exercice.logo
              ? { uri: exercice.logo }
              : require('../../assets/images/woman.jpg')
          }
          style={styles.logo}
        />
        <Text>{exercice.name}</Text>
        {/* <Text>{exercice.unit}</Text> */}
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
    padding: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  logo: {
    height: 30,
    width: 30,
  },
});
