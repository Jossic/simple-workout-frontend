import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../axios-instance';
import { Dispatch } from 'redux';

import env from '../../env';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const ADD_EXERCICE = 'ADD_EXERCICE';
export const GET_EXERCICES = 'GET_EXERCICES';
export const DELETE_EXERCICE = 'DELETE_EXERCICE';

export const addExercice = (exercice, userId, token) => {
  return (dispatch: Dispatch) => {
    axios
      .post(`/exercices/${userId}.json?auth=${token}`, exercice)
      .then((response) => {
        const newExercice = {
          id: response.data.name,
          name: exercice.name,
          description: exercice.description,
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
            content: response.data[key].content,
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
        console.log(`catch error =>`, error);
        dispatch({ type: END_LOADING });
      });
  };
};
