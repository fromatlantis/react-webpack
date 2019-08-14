import { all } from 'redux-saga/effects'

import { effects } from './authUser'
import { effects as companyDetailsEffects } from './companyDetails'
import { effects as agencyRequire } from './agencyRequire'
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
import { effects as dictionaryEffects } from './dictionary'
import { effects as configureEffects } from './configure'
import { effects as qualificationEffects } from './qualification'
import { effects as revenueAndFinancingEffects } from './revenueAndFinancing'
import { effects as staffEffects } from './staff'
import { effects as revenueEffects } from './revenue'
import { effects as statOverviewEffects } from './statOverview'
import { effects as parkStaffEffects } from './parkStaff'
import { effects as knowledgeRightEffects } from './knowledgeRight'
import { effects as approvalEffects } from './approval'
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
        ...agencyRequire,
        ...dictionaryEffects,
        ...configureEffects,
        ...qualificationEffects,
        ...revenueAndFinancingEffects,
        ...staffEffects,
        ...revenueEffects,
        ...statOverviewEffects,
        ...parkStaffEffects,
        ...knowledgeRightEffects,
        ...approvalEffects,
    ])
}
