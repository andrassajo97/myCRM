import {
  ADD_TASK,
  GET_TASKS,
  GET_TASK,
  TASK_LOADING,
} from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TASK_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    default:
      return state;
  }
}
