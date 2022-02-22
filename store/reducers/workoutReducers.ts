import {
  END_LOADING,
  START_LOADING,
  ADD_EXERCICE,
  GET_EXERCICES,
  DELETE_EXERCICE,
  UPDATE_EXERCICE,
} from '../actions/workoutActions';

export type Workout = {
  userId: string | null;
  token: string | null;
  exercices: [
    {
      id: string;
      name: string;
      description: string;
      variant: string;
      logo: string;
    }
  ];
};

type Action = {
  type: string;
  userId: string;
  token: string;
  exercice: {
    id: string;
    name: string;
    description: string;
    unit: string;
    instructions: string;
    type: string;
    variant: string;
    logo: string;
  };
};

const initialState = {
  exercices: [],
};

export default (state: Workout = initialState, action: Action) => {
  switch (action.type) {
    case ADD_EXERCICE:
      return {
        ...state,
        exercices: [action.exercice, ...state.exercices],
      };
    case UPDATE_EXERCICE:
      const exIndex = state.exercices.findIndex(
        (exe) => exe.id === action.exercice.id
      );
      console.log(`exIndex =>`, exIndex);
      state.exercices[exIndex] = action.exercice;

      return {
        ...state,
        exercices: [...state.exercices],
      };
    case GET_EXERCICES:
      const exercices = [...action.exercices];

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
