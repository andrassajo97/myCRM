import {
  ADD_RESEARCH,
  EDIT_RESEARCH,
  GET_RESEARCHES,
  GET_RESEARCH,
  DELETE_RESEARCH,
  RESEARCH_LOADING,
} from "../actions/types";

const initialState = {
  researches: [],
  research: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_RESEARCHES:
      return {
        ...state,
        researches: action.payload,
        loading: false,
      };
    case GET_RESEARCH:
      return {
        ...state,
        research: action.payload,
        loading: false,
      };
    case ADD_RESEARCH:
      return {
        ...state,
        researches: [action.payload, ...state.researches],
      };
      case EDIT_RESEARCH:
        return {
          ...state,
          research: [action.payload],
        };
    case DELETE_RESEARCH:
      return {
        ...state,
        researches: state.researches.filter(
          (research) => research._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
