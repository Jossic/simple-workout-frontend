import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../axios-instance';
import { Dispatch } from 'redux';

import env from '../../env';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const ADD_EXERCICE = 'ADD_EXERCICE';
export const GET_EXERCICES = 'GET_EXERCICES';
export const UPDATE_EXERCICE = 'UPDATE_EXERCICE';
export const DELETE_EXERCICE = 'DELETE_EXERCICE';

export const addExercice = (exercice, userId, token) => {
  console.log(`exercice action =>`, exercice);
  return (dispatch: Dispatch) => {
    axios
      .post(`/exercices/${userId}.json?auth=${token}`, exercice)
      .then((response) => {
        const newExercice = {
          id: response.data.name,
          name: exercice.name,
          description: exercice.description,
          unit: exercice.unit,
          instructions: exercice.instructions,
          type: exercice.type,
          variant: exercice.variant,
          logo: exercice.logo,
        };
        dispatch({ type: ADD_EXERCICE, exercice: newExercice });
      })
      .catch((error) => {
        console.log(`catch addExercice error =>`, error);
      });
  };
};
export const updateExercice = (exercice, userId, token) => {
  // recréer object a stocker en bd
  return (dispatch: Dispatch) => {
    axios
      .put(`/exercices/${userId}/${exercice.id}.json?auth=${token}`, exercice)
      .then((response) => {
        dispatch({ type: UPDATE_EXERCICE, exercice });
      })
      .catch((error) => {
        console.log(`catch addExercice error =>`, error);
      });
  };
};

export const getExercices = (userId, token) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    axios
      .get(`/exercices/${userId}.json?auth=${token}`)
      .then((response) => {
        const exercices = [];
        for (const key in response.data) {
          exercices.push({
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            variant: response.data[key].variant,
            logo: response.data[key].logo,
          });
        }
        dispatch({ type: GET_EXERCICES, exercices });
        dispatch({ type: END_LOADING });
      })
      .catch((error) => {
        // console.log(`catch error getExercice =>`, error);
        dispatch({ type: END_LOADING });
      });
  };
};

export const deleteExercice = (exerciceId, userId, token) => {
  return (dispatch: Dispatch) => {
    axios
      .delete(`/exercices/${userId}/${exerciceId}.json?auth=${token}`)
      .then((response) => {
        dispatch({ type: DELETE_EXERCICE, exerciceId });
      });
  };
};
