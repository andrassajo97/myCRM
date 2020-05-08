import axios from "axios";

import {
  ADD_TASK,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TASKS,
  GET_TASK,
  TASK_LOADING,
} from "./types";

// Add Task
export const addTask = (taskData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/task", taskData)
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      history.push("/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Task by id
export const getTask = (taskID, num) => (dispatch) => {
  dispatch(setTaskLoading());
  axios
    .get(`/api/task/${taskID}`)
    .then((res) =>
      dispatch({
        type: GET_TASK,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TASK,
        payload: err.response.data,
      })
    );
};

// Get all tasks
export const getTasks = () => (dispatch) => {
  dispatch(setTaskLoading());
  axios
    .get("/api/task/")
    .then((res) =>
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      })
    )
    /*.catch((err) =>
      dispatch({
        type: GET_TASKS,
        payload: err.response.data,
      })
    );*/
};

// Set loading task
export const setTaskLoading = () => {
  return {
    type: TASK_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
