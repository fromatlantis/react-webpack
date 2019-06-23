import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Card, Descriptions, Icon, Divider } from 'antd'
import { ImageView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meterRecord'
import { actions as meterActions } from 'reduxDir/meter'
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
        recordDetail: state.meterRecord.recordDetail,
        meterDetail: state.meter.meterDetail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRecordDetail: actions('getRecordDetail'),
            getMeterDetail: meterActions('getMeterDetail'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class RecordDetail extends PureComponent {
    componentDidMount() {
        const { params } = this.props.match
        this.props.getRecordDetail({
            recordId: params.id,
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.recordDetail !== nextProps.recordDetail) {
            if (nextProps.recordDetail.meterId) {
                this.props.getMeterDetail({
                    id: nextProps.recordDetail.meterId,
                })
            }
        }
    }
    render() {
        const { recordDetail, meterDetail } = this.props
        const items = allFields.filter(item => item.type.includes(meterDetail.areaType))
        return (
            <Card
                bordered={false}
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/energy/record">抄表记录</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>抄表详情</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Descriptions title="" column={2}>
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
                <Divider />
                <Descriptions title="" column={2}>
                    <Descriptions.Item label="上期读数">
                        {recordDetail.lastNumeric}
                    </Descriptions.Item>
                    <Descriptions.Item label="抄表人">
                        {recordDetail.transcriberName}
                    </Descriptions.Item>
                    <Descriptions.Item label="本期读数">
                        {recordDetail.numericValue}
                    </Descriptions.Item>
                    <Descriptions.Item label="抄表时间">
                        {recordDetail.readingTime}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="" column={1}>
                    <Descriptions.Item label="抄表说明">
                        <div style={{ width: '500px' }}>{recordDetail.description}</div>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="" column={1}>
                    <Descriptions.Item label="抄表图片">
                        <ImageView
                            fileList={recordDetail.images && recordDetail.images.split(',')}
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        )
    }
}
export default RecordDetail
