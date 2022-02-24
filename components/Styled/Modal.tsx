import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal as RNModal,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableText from './PressableText';

interface ModalProps {
  activator?: React.FC<{ handleOpen: () => void }>;
  children: React.FC<{
    toggleModal: () => void;
  }>;
}

const Modal: React.FC<ModalProps> = ({ activator: Activator, children }) => {
  const { height, width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { height: height * 0.7, width: width * 0.8 },
            ]}
          >
            {children({ toggleModal })}

            <Pressable style={styles.buttonClose} onPress={toggleModal}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </RNModal>
      {Activator ? (
        <Activator handleOpen={toggleModal} />
      ) : (
        <PressableText
          text="Check"
          style={styles.button}
          onPress={toggleModal}
        />
      )}
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
