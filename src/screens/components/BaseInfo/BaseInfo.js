import React, { PureComponent } from 'react'
import { Descriptions, Table } from 'antd'
import moment from 'moment'
import theme from 'Theme'
import { connect } from 'react-redux'
@connect(state => ({
    customerBaseInfo: state.customer.customerBaseInfo,
    customerRentInfo: state.customer.customerRentInfo,
}))
class BaseInfo extends PureComponent {
    render() {
        const baseInfoDetial = this.props.customerRentInfo
        const {
            customerBaseInfo: { rentType },
        } = this.props
        console.log(baseInfoDetial)
        return (
            <div className={theme.detailCard}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>基本信息</span>
                    </div>
                </div>
                {rentType === '1' && (
                    <Descriptions title="" bordered column={2}>
                        <Descriptions.Item label="合同编号">
                            {baseInfoDetial.contractNo}
                        </Descriptions.Item>
                        <Descriptions.Item label="营业执照编号">
                            {baseInfoDetial.licenseNo}
                        </Descriptions.Item>
                        <Descriptions.Item label="签约日期">
                            {baseInfoDetial.signDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="付款方式">
                            {baseInfoDetial.payType}
                        </Descriptions.Item>
                        <Descriptions.Item label="实际面积（㎡））">
                            {baseInfoDetial.realArea}
                        </Descriptions.Item>
                        <Descriptions.Item label="租赁起始日期">
                            {baseInfoDetial.startDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="租赁终止日期">
                            {baseInfoDetial.endDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="租赁期限">
                            {baseInfoDetial.rentLimit}
                        </Descriptions.Item>
                        <Descriptions.Item label="租赁单价（元/㎡）">
                            {baseInfoDetial.realPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="免租起始日期">
                            {baseInfoDetial.freeStartDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="免租终止日期">
                            {baseInfoDetial.freeEndDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="免租期限">
                            {baseInfoDetial.freeLimit}
                        </Descriptions.Item>
                        <Descriptions.Item label="租赁押金">
                            {baseInfoDetial.deposit}
                        </Descriptions.Item>
                        <Descriptions.Item label="租金总计（元）">
                            {baseInfoDetial.realPriceTotal}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                {rentType === '2' && (
                    <Descriptions title="" bordered column={2}>
                        <Descriptions.Item label="合同编号">
                            {baseInfoDetial.contractNo}
                        </Descriptions.Item>
                        <Descriptions.Item label="营业执照编号">
                            {baseInfoDetial.licenseNo}
                        </Descriptions.Item>
                        <Descriptions.Item label="签约日期">
                            {baseInfoDetial.signDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="付款方式">
                            {baseInfoDetial.payType}
                        </Descriptions.Item>
                        <Descriptions.Item label="预售面积（㎡）">
                            {baseInfoDetial.advanceArea}
                        </Descriptions.Item>
                        <Descriptions.Item label="预售面积单价（元/㎡）">
                            {baseInfoDetial.advancePrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="预售总价（元）">
                            {baseInfoDetial.advancePriceTotal}
                        </Descriptions.Item>
                        <Descriptions.Item label="实际面积（㎡）">
                            {baseInfoDetial.realArea}
                        </Descriptions.Item>
                        <Descriptions.Item label="实际面积单价（元/㎡）">
                            {baseInfoDetial.realPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="实际最终总价（元）">
                            {baseInfoDetial.realPriceTotal}
                        </Descriptions.Item>
                        <Descriptions.Item label="交房日期">
                            {baseInfoDetial.startDate}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        )
    }
}
export default BaseInfo
