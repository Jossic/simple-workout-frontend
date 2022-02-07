import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as workoutActions from '../store/actions/workoutActions';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';
import Colors from '../constants/Colors';
import CustomWorkoutInput from '../components/CustomWorkoutInput';

type Exercice = {
  name: string;
  description: string;
  variant: string;
  logo: string;
};

const AddExerciceScreen = ({ navigation }) => {
  const methods = useForm<Exercice>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  // Fonction
  const onSubmit: SubmitHandler<Exercice> = (data) => {
    // console.log(`data =>`, data);
    let image64;
    if (image) {
      const uriParts = image.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      image64 = `data:image/${fileType};base64,${image.base64}`;
    }

    const exercice = {
      name: data.name,
      description: data.description,
      variant: data.variant,
      logo: image64,
    };

    dispatch(workoutActions.addExercice(exercice, userId, token));
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={[styles.container, tw`flex-1 items-center`]}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={tw`text-xl`}>Ajouter un exercice</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            // style={styles.submit}
            onPress={onPressPickerHandler}
          >
            <View
              style={{
                ...styles.inputContainer,
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="images" size={23} color={Colors.primary} />
              <Text style={{ marginLeft: 15 }}>
                {image ? 'Image selectionnée' : 'Ajouter une image'}
              </Text>
            </View>
          </TouchableOpacity>
          <FormProvider {...methods}>
            <CustomWorkoutInput
              fieldName="name"
              control={control}
              placeholder="Nom de l'exercice"
              label="Nom de l'exercice"
              keyboardType="default"
              autoFocus={true}
              autoCorrect={false}
            />
            <CustomWorkoutInput
              fieldName="variant"
              control={control}
              placeholder="Variante"
              label="Variante"
              keyboardType="default"
              autoCorrect={false}
            />
            <CustomWorkoutInput
              fieldName="description"
              control={control}
              placeholder="Descriptif"
              label="Descriptif"
              keyboardType="default"
              autoCorrect={false}
              multiline
            />
          </FormProvider>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitText}>Créer</Text>
            <Ionicons name="arrow-forward" size={23} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddExerciceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    paddingTop: 30,
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
});
