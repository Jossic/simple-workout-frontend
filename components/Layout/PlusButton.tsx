import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

type PlusButtonProps = NativeStackHeaderProps;

const PlusButton: React.FC<PlusButtonProps> = ({ navigation }) => {
  const actions = [
    {
      text: 'Créer un exercice',
      icon: <Icon name="barbell" style={styles.actionButtonIcon} />,
      name: 'Add Exercice',
      position: 1,
      color: Colors.quaternary,
    },
    {
      text: 'Créer une séance',
      icon: <Icon name="contract" style={styles.actionButtonIcon} />,
      name: 'Add Training',
      position: 2,
      color: Colors.quaternary,
    },
    {
      text: 'Ajouter une mesure',
      icon: <Icon name="barbell" style={styles.actionButtonIcon} />,
      name: 'Add measure',
      position: 3,
      color: Colors.quaternary,
    },
  ];
  return (
    <TouchableWithoutFeedback testID="plusButton">
      <FloatingAction
        actions={actions}
        color={Colors.primary}
        onPressItem={(nav) => {
          console.log(`nav =>`, nav);
          navigation.navigate(nav);
        }}
      />
    </TouchableWithoutFeedback>
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
