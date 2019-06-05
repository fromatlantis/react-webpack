import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as repairEffects } from './repair'
import { effects as dispatchEffects } from './dispatch'
import { effects as feedbackEffects } from './feedback'
import { effects as configuration } from './configuration'
import { effects as materialManagerEffects } from './materialManager'
// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield all([
        ...effects,
        ...repairEffects,
        ...dispatchEffects,
        ...feedbackEffects,
        ...configuration,
        ...materialManagerEffects,
    ])
}
