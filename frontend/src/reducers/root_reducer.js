import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './session_error_reducer'
import api from './session_api_reducer'

const RootReducer = combineReducers({
    session, errors, api
});

export default RootReducer;