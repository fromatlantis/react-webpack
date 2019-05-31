import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as materialManagerEffects } from './materialManager'

// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield all([...effects, ...materialManagerEffects])
}
