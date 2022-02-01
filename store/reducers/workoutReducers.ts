import {
  END_LOADING,
  START_LOADING,
  ADD_EXERCICE,
  GET_EXERCICES,
  DELETE_EXERCICE,
} from '../actions/workoutActions';

export type Workout = {
  userId: string | null;
  token: string | null;
  didTryAutoLogin: boolean;
};

type Action = {
  type: string;
  userId: string;
  token: string;
  exercices: object;
};

const initialState = {
  exercices: [],
};

export default (state: Auth = initialState, action: Action) => {
  switch (action.type) {
    case ADD_EXERCICE:
      return {
        ...state,
        exercices: [action.exercice, ...state.exercices],
      };
    case GET_EXERCICES:
      const exercices = [...action.exercices];

      exercices.sort((a, b) => {
        let dateA = moment(a.createdAd),
          dateB = moment(b.createdAd);
        return dateB - dateA;
      });
      return {
        ...state,
        exercices,
      };
    case DELETE_EXERCICE:
      let currentExercice = [...state.exercices];
      currentExercice = currentExercice.filter(
        (exercice) => exercice.id !== action.exerciceId
      );
      return {
        ...state,
        exercices: [...currentExercice],
      };
    case START_LOADING:
      return {
        ...state,
        loadingNotes: true,
      };
    case END_LOADING:
      return {
        ...state,
        loadingNotes: false,
      };

    default:
      return state;
  }
};
