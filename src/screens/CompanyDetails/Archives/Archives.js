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
    state = {
        //企业id
        company_id: '',
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match.params.company_id
        this.setState({ company_id })
    }
    render() {
        const { company_id } = this.state
        return (
            <Fragment>
                {company_id ? (
                    <div>
                        <Information company_id={company_id} />
                        <Investment company_id={company_id} />
                        <Relation company_id={company_id} />
                        <Property company_id={company_id} />
                        <Renew company_id={company_id} />
                        <News company_id={company_id} />
                        <Need company_id={company_id} />
                        <Advice company_id={company_id} />
                        <OtherMes company_id={company_id} />
                    </div>
                ) : (
                    <span />
                )}
            </Fragment>
        )
    }
}
