import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card, Descriptions, Breadcrumb } from 'antd'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meter'
const categoryStr = {
    water: '水表',
    ammeter: '电表',
    fuelgas: '燃气表',
}
const areaTypeStr = {
    '1': '公区',
    '2': '企业',
    '3': '个人',
    '4': '其他',
}
const allFields = [
    {
        title: '表类型',
        key: 'category',
        type: [1, 2, 3, 4],
        render: category => <span>{categoryStr[category]}</span>,
    },
    {
        title: '表编号',
        key: 'meterNo',
        type: [1, 2, 3, 4],
    },
    {
        title: '安装地址',
        key: 'location',
        type: [1, 2, 3, 4],
    },
    {
        title: '类型',
        key: 'areaType',
        type: [1, 2, 3, 4],
        render: areaType => <span>{areaTypeStr[areaType]}</span>,
    },
    {
        title: '企业名称',
        key: 'customerName',
        type: [2],
    },
    {
        title: '企业地址',
        key: 'customerAddr',
        type: [2],
    },
    {
        title: '客户地址',
        key: 'customerAddr',
        type: [3],
    },
    {
        title: '联系人',
        key: 'contacts',
        type: [1, 2, 3, 4],
    },
    {
        title: '联系电话',
        key: 'contactsWay',
        type: [1, 2, 3, 4],
    },
]

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
        const items = allFields.filter(item => item.type.includes(meterDetail.areaType))
        return (
            <Card
                bordered={false}
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/energy/manage">抄表管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>抄表详情</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Descriptions column={2}>
                    {items.map(item => {
                        return (
                            <Descriptions.Item label={item.title} key={item.key}>
                                {item.render
                                    ? item.render(meterDetail[item.key])
                                    : meterDetail[item.key]}
                            </Descriptions.Item>
                        )
                    })}
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
