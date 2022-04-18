import axios from "axios";
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  GET_LABEL,
  CLEAR_NOTES,
  SET_LOADING,
  SEARCH_NOTES,
  NOTES_ERROR,
} from "./types";

export const getNotes = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get("/api/notes");
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (error) {
    setNotesError(error.response.data);
  }
};

export const addNote = (formData) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post("/api/notes", formData);
    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    });
  } catch (error) {
    setNotesError(error.response.data);
  }
};

export const updateNote = (formData) => async (dispatch) => {
  try {
    setLoading();
    dispatch({ type: UPDATE_NOTE, payload: formData });
    await axios.put(`/api/notes/${formData._id}`, formData);
  } catch (error) {
    setNotesError(error);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    setLoading();
    dispatch({ type: DELETE_NOTE, payload: id });
    await axios.delete(`/api/notes/${id}`);
  } catch (error) {
    setNotesError(error);
  }
};

export const clearNote = () => (dispatch) => {
  dispatch({ type: CLEAR_NOTES });
};

export const getLabel = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/labels/${name}`);
    dispatch({
      type: GET_LABEL,
      payload: res.data,
    });
  } catch (error) {
    setNotesError(error.response.data);
  }
};

export const searchNotes = (query) => async (dispatch) => {
  try {
    if (query === "") getNotes();
    else {
      const res = await axios.get(`/api/notes/search/${query}`);
      dispatch({
        type: SEARCH_NOTES,
        payload: res.data,
      });
    }
  } catch (error) {
    setNotesError(error.response.data);
  }
};

export const setNotesError = (error) => async (dispatch) => {
  dispatch({
    type: NOTES_ERROR,
    payload: error,
  });
};
export const setCurrent = (note) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: note,
  });
};

export const clearCurrent = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
