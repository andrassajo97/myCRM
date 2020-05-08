import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import researchReducer from './researchReducer';
import stageReducer from './stageReducer';
import taskReducer from './taskReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    research: researchReducer,
    stage: stageReducer,
    task: taskReducer,
})