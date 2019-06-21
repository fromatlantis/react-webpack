import React, { PureComponent } from 'react'
import { Card, Descriptions } from 'antd'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meter'

const mapStateToProps = state => {
    return {
        meterDetail: state.meter.meterDetail,
        searchParams: state.meter.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterDetail: actions('getMeterDetail'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class ManageDetail extends PureComponent {
    componentDidMount() {
        const { params } = this.props.match
        this.props.getMeterDetail({
            id: params.id,
        })
    }

    render() {
        const { meterDetail } = this.props
        const categoryStr = {
            water: '水表',
            ammeter: '电表',
            fuelgas: '燃气表',
        }
        const areaType = {
            '1': '公区',
            '2': '企业',
            '3': '个人',
            '4': '其他',
        }
        return (
            <Card bordered={false}>
                <Descriptions column={2}>
                    <Descriptions.Item label="表类型">
                        {categoryStr[meterDetail.category]}
                    </Descriptions.Item>
                    <Descriptions.Item label="表编号">{meterDetail.meterNo}</Descriptions.Item>
                    <Descriptions.Item label="安装地址">{meterDetail.location}</Descriptions.Item>
                    <Descriptions.Item label="类型">
                        {areaType[meterDetail.areaType]}
                    </Descriptions.Item>
                    <Descriptions.Item label="企业名称">
                        {meterDetail.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="企业地址">
                        {meterDetail.customerAddr}
                    </Descriptions.Item>
                    <Descriptions.Item label="联系人">{meterDetail.contacts}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">
                        {meterDetail.contactsWay}
                    </Descriptions.Item>
                    <Descriptions.Item label="截止日期">
                        {meterDetail.deadlineDay}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions column={1}>
                    <Descriptions.Item label="备注说明">
                        <div style={{ width: '500px' }}>{meterDetail.remarks}</div>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        )
    }
}
export default ManageDetail
