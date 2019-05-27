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

import ArchivesList from '../ArchivesList/ArchivesList'

export default class Archives extends PureComponent {
    state = {
        //企业id
        company_id: '',
        type: '',
    }
    //生命周期
    componentDidMount = () => {
        // 企服管理-预览
        if (this.props.match && this.props.match.params) {
            let { company_id, type } = this.props.match.params
            this.setState({ company_id, type })
        }
    }
    render() {
        const { company_id, type } = this.state
        if (type === 'company') {
            return (
                <div style={{ margin: '0 50px 20px' }}>
                    <ArchivesList company_id={company_id} />
                </div>
            )
        } else if (company_id) {
            return (
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
            )
        } else {
            return (
                <div>
                    <Information />
                    <Investment />
                    <Relation />
                    <Property />
                    <Renew />
                    <News />
                    <Need />
                    <Advice />
                    <OtherMes />
                </div>
            )
        }
    }
}
