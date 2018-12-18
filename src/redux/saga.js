import { takeEvery } from "redux-saga/effects";

import { types as uTypes, login, getUserInfo } from "./authUser";

// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield [
        takeEvery(uTypes.login, login),
        takeEvery(uTypes.user_info, getUserInfo)
    ];
}
