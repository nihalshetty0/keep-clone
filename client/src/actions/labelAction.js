import axios from "axios";

import {
  CLEAR_LABELS,
  DELETE_LABEL,
  GET_LABELS,
  NOTES_ERROR,
  SET_LABELS,
} from "./types";

export const getLabels = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/labels");
    dispatch({
      type: GET_LABELS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: NOTES_ERROR,
      payload: error,
    });
  }
};

export const setLabels = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LABELS,
      payload: formData.name,
    });
    await axios.post("/api/labels", formData);
  } catch (error) {
    dispatch({
      type: NOTES_ERROR,
      payload: error,
    });
  }
};

export const deleteLabel = (name) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LABEL,
      payload: name,
    });
    await axios.delete(`/api/labels/${name}`);
  } catch (error) {
    dispatch({
      type: NOTES_ERROR,
      payload: error,
    });
  }
};

export const clearLabel = () => (dispatch) => {
  dispatch({
    type: CLEAR_LABELS,
  });
};
