import axios from "axios";

import {
  ADD_STAGE,
  EDIT_STAGE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_STAGES,
  GET_STAGE,
  STAGE_LOADING,
} from "./types";

// Add Stage
export const addStage = (researchID, stageData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/research/${researchID}/stage`, stageData)
    .then((res) => {
      dispatch({
        type: ADD_STAGE,
        payload: res.data,
      });
      history.push(`/research/${researchID}/stages`);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Stage by num
export const getStage = (researchID, num) => (dispatch) => {
  dispatch(setStageLoading());
  axios
    .get(`/api/research/${researchID}/stage/${num}`)
    .then((res) =>
      dispatch({
        type: GET_STAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_STAGE,
        payload: err.response.data,
      })
    );
};

// Get all stages
export const getStages = (researchID) => (dispatch) => {
  dispatch(setStageLoading());
  axios
    .get(`/api/research/${researchID}/stage/get/all`)
    .then((res) =>
      dispatch({
        type: GET_STAGES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_STAGES,
        payload: err.response.data,
      })
    );
};

// Edit stage
export const editStage = (researchID, num, researchData, history) => (
  dispatch
) => {
  dispatch(clearErrors());
  axios
    .post(`/api/research/${researchID}/edit-stage/${num}`, researchData)
    .then((res) => {
      dispatch({
        type: EDIT_STAGE,
        payload: res.data,
      });
      history.push(`/research/${researchID}/stages`);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add Comment
export const addComment = (researchID, num, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/research/${researchID}/stage/${num}/comment`, commentData)
    .then((res) =>
      dispatch({
        type: GET_STAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Comment
export const deleteComment = (researchID, num, commentID) => (dispatch) => {
  if (window.confirm("Biztos benne, hogy törli a kommentet?")) {
  axios
    .delete(`/api/research/${researchID}/stage/${num}/comment/${commentID}`)
    .then((res) => {
      dispatch({
        type: GET_STAGE,
        payload: res.data,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
  }
};

// Set loading state
export const setStageLoading = () => {
  return {
    type: STAGE_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
