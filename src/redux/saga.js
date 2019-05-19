import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as companyDetailsEffects } from './companyDetails'
import { effects as companyEffects } from './company'
import { effects as newCompanyEffects } from './newCompany'
import { effects as businessEffects } from './business'
import { effects as financeEffects } from './finance'
import { effects as membersEffects } from './members'
import { effects as intermediary } from './intermediary'
import { effects as newsEffects } from './news'
import { effects as productEffects } from './product'
import { effects as eventEffects } from './event'
import { effects as outwardEffects } from './outward'
import { effects as effectsTrademark } from './trademark'
import { effects as patentEffects } from './patent'

// 监听action的调用，然后调用异步generate函数

export function* watchFetchData() {
    yield all([
        ...effects,
        ...companyEffects,
        ...newCompanyEffects,
        ...businessEffects,
        ...financeEffects,
        ...membersEffects,
        ...intermediary,
        ...companyDetailsEffects,
        ...newsEffects,
        ...productEffects,
        ...eventEffects,
        ...outwardEffects,
        ...effectsTrademark,
        ...patentEffects,
        ...intermediary,
    ])
}
