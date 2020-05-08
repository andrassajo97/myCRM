import axios from 'axios';

import {
  ADD_RESEARCH,
  EDIT_RESEARCH,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_RESEARCHES,
  GET_RESEARCH,
  RESEARCH_LOADING,
  DELETE_RESEARCH
} from './types';

// Add Research
export const addResearch = (researchData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/research', researchData)
    .then(res => {
        dispatch({
          type: ADD_RESEARCH,
          payload: res.data
        });
        history.push("/dashboard");
      }
      )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Research
export const getResearch = researchID => dispatch => {
  dispatch(setResearchLoading());
  axios
    .get(`/api/research/${researchID}`)
    .then(res =>
      dispatch({
        type: GET_RESEARCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESEARCH,
        payload: err.response.data
      })
    );
};

// Get Researches by user's name
export const getResearchByName = () => dispatch => {
  dispatch(setResearchLoading());
  axios
    .get("/api/research/get/byuser_name")
    .then(res =>
      dispatch({
        type: GET_RESEARCHES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESEARCHES,
        payload: err.response.data
      })
    );
};

// Edit Research
export const editResearch = (researchID, researchData, history) => dispatch => {
    dispatch(clearErrors());
    axios
      .post(`/api/research/edit/${researchID}`, researchData)
      .then(res => {
        dispatch({
          type: EDIT_RESEARCH,
          payload: res.data
        });
        history.push("/dashboard")
      }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Get All Researches
export const getResearches = () => dispatch => {
    dispatch(setResearchLoading());
    axios
      .get('/api/research/all')
      .then(res =>
        dispatch({
          type: GET_RESEARCHES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_RESEARCHES,
          payload: null
        })
      );
  };

// Get Completed Researches
export const getCompletedResearches = () => dispatch => {
  dispatch(setResearchLoading());
  axios
    .get('/api/research/completed')
    .then(res =>
      dispatch({
        type: GET_RESEARCHES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESEARCHES,
        payload: null
      })
    );
};

  // Get Waitlist Researches
export const getWaitlistResearches = () => dispatch => {
    dispatch(setResearchLoading());
    axios
      .get('/api/research/waitlist')
      .then(res =>
        dispatch({
          type: GET_RESEARCHES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_RESEARCHES,
          payload: null
        })
      );
  };

// Get InProgress Researches
export const getInProgressResearches = () => dispatch => {
    dispatch(setResearchLoading());
    axios
      .get('/api/research/in_progress')
      .then(res =>
        dispatch({
          type: GET_RESEARCHES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_RESEARCHES,
          payload: null
        })
      );
  };

// Delete Research
export const deleteResearch = (researchID, history) => dispatch => {
  if (window.confirm("Biztos benne, hogy törli a kutatást?")) {
  axios
    .delete(`/api/research/${researchID}`)
    .then(res => {
      dispatch({
        type: DELETE_RESEARCH,
        payload: researchID
      });
      history.push("/dashboard")
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

// Assign to research
export const assign = (researchID, history) => dispatch => {
  axios
    .post(`/api/research/assign/${researchID}`)
    .then((res) => 
    history.go(`/research/${researchID}`))
      .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
      history.go(`/research/${researchID}`)
      })
};

// Disapprove from research
export const disapprove = (researchID, history) => dispatch => {
  axios
    .post(`/api/research/disapprove/${researchID}`)
    .then((res) => 
    history.go(`/research/${researchID}`))
      .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
      history.go(`/research/${researchID}`)
      })
};

// Set loading state
export const setResearchLoading = () => {
  return {
    type: RESEARCH_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
