import { all } from 'redux-saga/effects'

import { effects } from './authUser'
// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield all(effects)
}
