import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { Dispatch } from 'redux';

import env from '../../env';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const ADD_EXERCICE = 'ADD_EXERCICE';
export const GET_EXERCICES = 'GET_EXERCICES';
export const DELETE_EXERCICE = 'DELETE_EXERCICE';
