/**
 * 企服首页/企业详情==> Archives 企业档案
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table } from 'antd'
import styles from '../CompanyDetails.module.css'

import Information from '../Information/Information'
import Investment from '../Investment/Investment'
import Relation from '../Relation/Relation'
import Property from '../Property/Property'
import Renew from '../Renew/Renew'
import News from '../News/News'
import Need from '../Need/Need'
import Advice from '../Advice/Advice'
import OtherMes from '../OtherMes/OtherMes'

export default class Archives extends PureComponent {
    render() {
        return (
            <Fragment>
                <Information />
                <Investment />
                <Relation />
                <Property />
                <Renew />
                <News />
                <Need />
                <Advice />
                <OtherMes />
            </Fragment>
        )
    }
}
