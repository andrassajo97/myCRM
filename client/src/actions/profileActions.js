import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  GET_PROFILES
} from "./types";

// Get all Company profiles
export const getCompanyProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/companyProfile/get/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get all Student profiles
export const getStudentProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/studentProfile/get/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get current student profile
export const getCurrentStudentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/studentProfile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get Student profile by user id
export const getStudentProfileByUserId = (user_id) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/studentProfile/${user_id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get current company profile
export const getCurrentCompanyProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/companyProfile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get Company Profile by  user id
export const getCompanyProfile = (user_id) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/companyProfile/${user_id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Create Student Profile
export const create_StudentProfile = (profileData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/studentProfile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Create Company Profile
export const create_CompanyProfile = (profileData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/companyProfile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Student account & profile
export const deleteStudentAccount = () => (dispatch) => {
  dispatch(clearErrors());
  if (window.confirm("Biztos benne, hogy törli a fiókot?")) {
    axios.delete("/api/studentProfile")
      .then((res) => 
        dispatch({
        type: SET_CURRENT_USER,
        payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
  }
};

// Delete Company account & profile
export const deleteCompanyAccount = (id) => (dispatch) => {
  dispatch(clearErrors());
  if (window.confirm("Biztos benne, hogy törli a fiókot?")) {
    axios.delete(`/api/companyProfile/${id}`)
      .then((res) => 
        dispatch({
        type: SET_CURRENT_USER,
        payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

