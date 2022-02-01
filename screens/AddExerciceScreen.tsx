import React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as globalActions from '../store/actions/index';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';

const AddExerciceScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  // Fonction
  const onSubmit = (data) => {
    // console.log(`data =>`, data);
    let image64;
    if (image) {
      const uriParts = image.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      image64 = `data:image/${fileType};base64,${image.base64}`;
    }

    const project = {
      name: data.name,
      logo: image64,
    };

    dispatch(globalActions.addProject(project, userId, token));
    navigation.goBack();
  };

  const onPressPickerHandler = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          "Si vous voulez ajouter une photo, merci d'accorder l'accès"
        );
      }
    }
    let imagePicked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4,3],
      quality: 0.8,
      base64: true,
    });

    if (imagePicked.cancelled) {
      Alert.alert("Ajout d'image annulé", undefined);
      setImage();
    } else {
      setImage(imagePicked);
    }
  };

  return (
    <View style={[styles.container, tw`flex`]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>AddExerciceScreen</Text>
      </SafeAreaView>
    </View>
  );
};

export default AddExerciceScreen;

const styles = StyleSheet.create({
  container: {},
});
