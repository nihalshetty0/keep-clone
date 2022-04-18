import {
  GET_LABELS,
  SET_LABELS,
  CLEAR_LABELS,
  DELETE_LABEL,
} from "../actions/types";

const initialState = [];

const labelReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LABELS:
      return [...action.payload];
    case SET_LABELS:
      if (state.includes(action.payload)) return;
      return [...state, action.payload];

    case DELETE_LABEL:
      return [...state.filter((label) => label !== action.payload)];
    case CLEAR_LABELS:
      return [];
    default:
      return state;
  }
};

export default labelReducers;
