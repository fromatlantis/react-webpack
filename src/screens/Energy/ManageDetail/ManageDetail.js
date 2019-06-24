import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Card, Descriptions, Breadcrumb, Tabs, Table, Tooltip } from 'antd'
import { ImageView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meter'
const { TabPane } = Tabs
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
        recordList: state.meter.recordList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterDetail: actions('getMeterDetail'),
            getRecordListByMeterId: actions('getRecordListByMeterId'),
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
        this.props.getRecordListByMeterId({
            meterId: params.id,
        })
    }

    render() {
        const { meterDetail } = this.props
        const items = allFields.filter(item => item.type.includes(meterDetail.areaType))
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ]

        const columns = [
            {
                title: '月份',
                dataIndex: 'deadline',
                key: 'deadline',
            },
            {
                title: '抄表人',
                dataIndex: 'transcriberName',
                key: 'transcriberName',
            },
            {
                title: '本期读数',
                dataIndex: 'numericValue',
                key: 'numericValue',
            },
            {
                title: '抄表时间',
                dataIndex: 'readingTime',
                key: 'readingTime',
            },
            {
                title: '备注',
                dataIndex: 'description',
                key: 'description',
                render: description => (
                    <Tooltip title={description}>
                        <span>
                            {description.length > 20
                                ? `${description.substring(0, 20)}...`
                                : description}
                        </span>
                    </Tooltip>
                ),
            },
            {
                title: '图片',
                dataIndex: 'images',
                key: 'images',
                render: images => <ImageView fileList={images.split(',')} />,
            },
        ]
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="历史抄表记录" key="1">
                        <Table dataSource={this.props.recordList} columns={columns} />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}
export default ManageDetail
