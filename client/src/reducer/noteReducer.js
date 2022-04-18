import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  CLEAR_NOTES,
  SET_LOADING,
  NOTES_ERROR,
  SEARCH_NOTES,
  GET_LABEL,
} from "../actions/types";

const initialState = {
  notes: null,
  current: null,
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
    case SEARCH_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        loading: false,
      };
    case NOTES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: null,
        loading: false,
        error: null,
        current: null,
      };
    case GET_LABEL:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default noteReducer;
