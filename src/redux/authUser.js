import { put, call } from "redux-saga/effects";
import { replace, push } from "connected-react-router";
import request from "../utils/request";
import { blaze } from "../utils/blaze";
import { redirectLogin } from '../utils'
const model = {
    namespace: "authUser",
    state: {
        loginPath: "/home",
        auth: [],
        user: {}
    },
    actions: [
        {
            name: "login",
            *effect(action) {
                const res = yield call(request, {
                    type: "post",
                    //url: "/authuser/login",
                    url: "/authuser/login",
                    data: action.payload
                });
                if (res.data) {
                    yield put(actions("loginSuccess")(res.data));
                    yield put(replace("/home"));
                }
            }
        },
        {
            name: "loginSuccess",
            reducer: (state, action) => {
                return {
                    ...state,
                    user: action.payload.user,
                    auth: action.payload.auth
                };
            }
        },
        {
            name: 'logout',
            *effect(action) {
                // yield put(replace("/login"));
                try {
                    let res = yield call(request, {
                        url: "/authuser/logout"
                    });
                    if (res.code === 1000) {
                        yield put(actions("logoutSuccess")());
                        redirectLogin({
                            type: 0,
                            storeurl: false
                        })
                    } 
                } catch (err) { }
            }
        },
        {
            name: "logoutSuccess",
            reducer: (state, action) => {
                return {
                    ...state,
                    user: {},
                    auth: []
                };
            }
        },
        {
            name: 'storeLoginPath',
            reducer: 'loginPath'
        },
        {
            name: "getUserInfo",
            *effect(action) {
                try {
                    let res = yield call(request, {
                        url: "/authuser/userinfo"
                    });
                    if (res.data) {
                        yield put(actions("loginSuccess")(res.data));
                    } else {
                        yield put(replace("/leaseApply"));
                    }
                } catch (err) { }
            }
        }
    ]
};
const manager = blaze(model);
// reducer combineReducers使用
export default manager.reducers;
// action connect组件使用
export const actions = manager.actions;
// effects saga监听副作用函数使用
export const effects = manager.effects;
