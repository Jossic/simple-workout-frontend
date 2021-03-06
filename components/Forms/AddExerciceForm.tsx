import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImagePickerResult,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as workoutActions from '../../store/actions/workoutActions';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';
import Colors from '../../constants/Colors';
import CustomWorkoutInput from '../CustomWorkoutInput';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//picker
import { Picker } from '@react-native-picker/picker';
import { ExerciseOnly } from '../../types/workout';

const AddExerciceForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Merci de renseigner un nom d'exercice"),
  });
  const methods = useForm<ExerciseOnly>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePickerResult>();
  const [type, setType] = useState();
  const [unit, setUnit] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  // Fonction
  // const onSubmit: SubmitHandler<ExerciseOnly> = (data) => {
  //   let image64;
  //   if (image) {
  //     const uriParts = image.uri.split('.');
  //     const fileType = uriParts[uriParts.length - 1];
  //     image64 = `data:image/${fileType};base64,${image.base64}`;
  //   }

  //   const exercice = {
  //     name: data.name,
  //     description: data.description,
  //     variant: data.variant,
  //     unit,
  //     instructions: data.instructions,
  //     type,
  //     logo: image64,
  //   };

  //   dispatch(workoutActions.addExercice(exercice, userId, token));
  //   navigation.goBack();
  // };

  const askPhotoOrCamera = () => {
    Alert.alert(undefined, 'Ajouter une image', [
      {
        text: 'Annuler',
        onPress: () => console.log('Annuler'),
        style: 'cancel',
      },
      {
        text: 'Photo',
        onPress: () => onPressCameraHandler(),
      },
      { text: 'Galerie', onPress: () => onPressPickerHandler() },
    ]);
  };

  const getCameraPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission refus??e',
          "Si vous voulez prendre une photo, merci d'accorder l'acc??s"
        );
      } else return true;
    }
  };

  const onPressCameraHandler = async () => {
    if (getCameraPermissions()) {
      let photoTook = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });
      console.log(`photoTook =>`, photoTook);
      if (photoTook.cancelled) {
        Alert.alert("Ajout d'une photo annul??", undefined);
        setImage(undefined);
      } else {
        setImage(photoTook);
      }
    }
  };

  const onPressPickerHandler = async () => {
    if (getCameraPermissions()) {
      let imagePicked = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4,3],
        quality: 0.8,
        base64: true,
      });

      if (imagePicked.cancelled) {
        Alert.alert("Ajout d'image annul??", undefined);
        setImage(undefined);
      } else {
        setImage(imagePicked);
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.ternary }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <View style={[styles.container, tw`flex-1 items-center`]}>
          <SafeAreaView style={{ flex: 1 }}>
            <Text style={tw`text-xl text-white`}>Ajouter un exercice</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.submit}
              testID="image"
              onPress={askPhotoOrCamera}
            >
              <View
                style={{
                  ...styles.inputContainer,
                  marginTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Ionicons name="images" size={23} color={Colors.primary} />
                <Text style={{ marginLeft: 15 }}>
                  {image ? 'Image selectionn??e' : 'Ajouter une image'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.container2,
                tw`flex items-center justify-center w-full`,
              ]}
            >
              <FormProvider {...methods}>
                <CustomWorkoutInput
                  fieldName="name"
                  testID="name"
                  placeholder="Nom de l'exercice*"
                  keyboardType="default"
                  autoFocus={true}
                  autoCorrect={false}
                />
                {/* <CustomWorkoutInput
                  fieldName="variant"
                  testID="variant"
                  placeholder="Variante"
                  keyboardType="default"
                  autoCorrect={false}
                /> */}
                <CustomWorkoutInput
                  fieldName="description"
                  testID="description"
                  placeholder="Descriptif"
                  keyboardType="default"
                  autoCorrect={false}
                  multiline
                />
                <CustomWorkoutInput
                  fieldName="instructions"
                  testID="instructions"
                  placeholder="Insctructions"
                  keyboardType="default"
                  autoCorrect={false}
                  multiline
                />
                {/* <View> */}
                {/* <Text>Type d'exercice / Mode</Text> */}
                <View style={tw`flex flex-row`}>
                  <Picker
                    selectedValue={type}
                    style={styles.picker}
                    itemStyle={{ backgroundColor: 'gray' }}
                    testID="type"
                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                  >
                    <Picker.Item enabled={false} label="Type" value="Type" />
                    <Picker.Item label="Exercice" value="Exercice" />
                    <Picker.Item label="Echauffement" value="Echauffement" />
                    <Picker.Item label="Etirement" value="Etirement" />
                  </Picker>

                  <Picker
                    selectedValue={unit}
                    style={styles.picker}
                    itemStyle={{ backgroundColor: 'gray' }}
                    testID="unit"
                    onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                  >
                    <Picker.Item enabled={false} label="Mode" value="Mode" />
                    <Picker.Item label="Reps" value="Reps" />
                    <Picker.Item label="Temps" value="Temps" />
                  </Picker>
                </View>
                {/* </View> */}
              </FormProvider>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submit}
                testID="submitEx"
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={[styles.submitText, tw``]}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    'Ajouter'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddExerciceForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ternary,
    paddingTop: 30,
  },
  container2: {
    flex: 1,
    // backgroundColor: Colors.transparent,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  submitText: {
    color: 'white',
    fontSize: 17,
  },
  submit: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  picker: {
    minWidth: '40%',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    overflow: 'hidden',
  },
});
