import { combineReducers } from 'redux';

import authUser from './authUser';

const allReducers = {
    authUser
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
