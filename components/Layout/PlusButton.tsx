import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import Modal from '../Styled/Modal';
import PressableText from '../Styled/PressableText';
import AddExerciceForm from '../Forms/AddExerciceForm';
import AddWorkoutForm from '../Forms/AddWorkoutForm';
import AddMeasureForm from '../Forms/AddMeasureForm';

type PlusButtonProps = NativeStackHeaderProps;

const PlusButton: React.FC<PlusButtonProps> = ({ navigation }) => {
  const [modalName, setModalName] = useState<string>('');
  const actions = [
    {
      text: 'Créer un exercice',
      icon: <Icon name="barbell" style={styles.actionButtonIcon} />,
      name: 'exercise',
      position: 1,
      color: Colors.quaternary,
    },
    {
      text: 'Créer une séance',
      icon: <Icon name="contract" style={styles.actionButtonIcon} />,
      name: 'workout',
      position: 2,
      color: Colors.quaternary,
    },
    {
      text: 'Ajouter une mesure',
      icon: <Icon name="barbell" style={styles.actionButtonIcon} />,
      name: 'measure',
      position: 3,
      color: Colors.quaternary,
    },
  ];

  const handlePressButtonname = (name) => {
    console.log(`name =>`, name);
    if (name === 'exercise') {
      setModalName('exercise');
    } else if (name === 'workout') {
      setModalName('workout');
    } else if (name === 'measure') {
      setModalName('measure');
    }
  };

  const displayModal = () => {
    if (modalName === 'exercise') {
      setModalName('exercise');
      return (
        <AddExerciceForm
          onSubmit={async (data) => {
            // await handleFormSubmitForWorkout(data);
            // toggleModal();
            // navigation.navigate('Home');
          }}
        />
      );
    } else if (modalName === 'workout') {
      setModalName('workout');
      return (
        <AddWorkoutForm
        // onSubmit={async (data) => {
        // await handleFormSubmitForWorkout(data);
        // toggleModal();
        // navigation.navigate('Home');
        // }}
        />
      );
    } else if (modalName === 'measure') {
      setModalName('measure');
      return (
        <AddMeasureForm
        // onSubmit={async (data) => {
        // await handleFormSubmitForWorkout(data);
        // toggleModal();
        // navigation.navigate('Home');
        // }}
        />
      );
    }
  };
  return (
    <>
      <Modal
        activator={({ handleOpen }) => (
          <FloatingAction
            actions={actions}
            color={Colors.primary}
            onPressItem={
              (nav) => handlePressButtonname(nav)
              // console.log(`nav =>`, nav);
              // navigation.navigate(nav);
            }
          />
        )}
      >
        {({ toggleModal }) => <View>{displayModal()}</View>}
      </Modal>
    </>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
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
