import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as companyEffects } from './company'
import { effects as newCompanyEffects } from './newCompany'
import { effects as financeEffects } from './finance'
import { effects as membersEffects } from './members'
// 监听action的调用，然后调用异步generate函数
export function* watchFetchData() {
    yield all([
        ...effects,
        ...companyEffects,
        ...newCompanyEffects,
        ...financeEffects,
        ...membersEffects,
    ])
}
