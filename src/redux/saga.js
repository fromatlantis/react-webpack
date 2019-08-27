import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as customerBillEffects } from './customerBill'
import { effects as customerEffects } from './customer'
import { effects as changesEffects } from './changes'
import { effects as billEffects } from './bill'
import { effects as recordsEffects } from './records'
import { effects as chargeEffects } from './charge'
// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield all([
        ...effects,
        ...customerBillEffects,
        ...customerEffects,
        ...changesEffects,
        ...billEffects,
        ...recordsEffects,
        ...chargeEffects,
    ])
}
