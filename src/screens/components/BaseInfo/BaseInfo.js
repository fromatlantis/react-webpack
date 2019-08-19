import React, { PureComponent } from 'react'
import { Descriptions, Table } from 'antd'
import moment from 'moment'
import theme from 'Theme'
export default class BaseInfo extends PureComponent {
    render() {
        const baseInfoDetial = {}
        return (
            <div className={theme.detailCard}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>基本信息</span>
                    </div>
                </div>
                <Descriptions title="" bordered column={2}>
                    <Descriptions.Item label="法人">
                        {baseInfoDetial.legalPersonName}
                    </Descriptions.Item>
                    <Descriptions.Item label="注册资本">
                        {baseInfoDetial.regCapital}
                    </Descriptions.Item>
                    <Descriptions.Item label="经营状态">
                        {baseInfoDetial.regStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="实缴资本">
                        {baseInfoDetial.actualCapital}
                    </Descriptions.Item>
                    <Descriptions.Item label="统一社会信用代码">
                        {baseInfoDetial.creditCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="成立日期">
                        {baseInfoDetial.estiblishTime &&
                            moment(parseInt(baseInfoDetial.estiblishTime)).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="工商注册号">
                        {baseInfoDetial.regNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="纳税人识别号">
                        {baseInfoDetial.taxNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="公司类型">
                        {baseInfoDetial.companyOrgType}
                    </Descriptions.Item>
                    <Descriptions.Item label="组织机构代码">
                        {baseInfoDetial.orgNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="核准日期">
                        {baseInfoDetial.approvedTime &&
                            moment(parseInt(baseInfoDetial.approvedTime)).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属行业">
                        {baseInfoDetial.industry}
                    </Descriptions.Item>
                    <Descriptions.Item label="登记机关">
                        {baseInfoDetial.regInstitute}
                    </Descriptions.Item>
                    <Descriptions.Item label="曾用名">
                        {baseInfoDetial.historyNames}
                    </Descriptions.Item>
                    <Descriptions.Item label="英文名">{baseInfoDetial.property3}</Descriptions.Item>
                    <Descriptions.Item label="人员规模">
                        {baseInfoDetial.staffNumRange}
                    </Descriptions.Item>
                    <Descriptions.Item label="参保人数">
                        {baseInfoDetial.socialStaffNum}
                    </Descriptions.Item>
                    <Descriptions.Item label="企业地址">
                        {baseInfoDetial.regLocation}
                    </Descriptions.Item>
                    <Descriptions.Item label="营业期限">
                        {baseInfoDetial.fromTime &&
                            moment(parseInt(baseInfoDetial.fromTime)).format('YYYY-MM-DD')}
                        至
                        {baseInfoDetial.toTime &&
                            moment(parseInt(baseInfoDetial.toTime)).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="经营范围" span={2}>
                        {baseInfoDetial.businessScope}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}
