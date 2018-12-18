import { put, call } from 'redux-saga/effects'
import request from '../utils/request'

// Action Types
export const types = {
    login: "AuthUser_LOGIN",
    loginSuccess: "AuthUser_LOGIN_SUCCESS",
    logout: "AuthUser_LOGOUT",
    user_info: 'AuthUser_Info'
};

const initialState = {
    toPath: '/home/home',
    auth: [],
    user: {}
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.loginSuccess: {
            return {
                ...state,       
                user: action.payload.user,
                auth: action.payload.auth
            }
        }
        default:
            return state;
    }
}

// Action Creators
export const actions = {
    login: function (user) {
        //console.log(portals)
        return {
            type: types.login,
            payload: user
        };
    },
    loginSuccess: function (data) {
        return {
            type: types.loginSuccess,
            payload: data,
        }
    },
    logout: function (user) {
        return {
            type: types.logout,
            payload: user,
        }
    },
};

export const userInfo = () => {
    return {
        type: types.user_info
    }
    
}

// saga generate
export function* login(action) {
    try{
        const json = yield call(request,{
            type: 'post',
            url: '/authuser/login',
            data: action.payload
        })
        let res = json.data;
        yield put(actions.loginSuccess(res.data));
    }catch(err){
        
    }
}

export function* getUserInfo() {
    let userInfo =  yield call(request, {
        url: '/authuser/userinfo'
    })

    yield put(actions.loginSuccess(userInfo.data.data));
    // console.log(userInfo);
}