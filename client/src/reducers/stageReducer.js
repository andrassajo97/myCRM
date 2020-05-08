import {
  ADD_STAGE,
  EDIT_STAGE,
  GET_STAGES,
  GET_STAGE,
  STAGE_LOADING,
} from "../actions/types";

const initialState = {
  stages: [],
  stage: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STAGES:
      return {
        ...state,
        stages: action.payload,
        loading: false,
      };
    case GET_STAGE:
      return {
        ...state,
        stage: action.payload,
        loading: false,
      };
    case ADD_STAGE:
      return {
        ...state,
        stages: [action.payload, ...state.stages],
      };
      case EDIT_STAGE:
        return {
          ...state,
          stage: [action.payload],
        };
    default:
      return state;
  }
}
