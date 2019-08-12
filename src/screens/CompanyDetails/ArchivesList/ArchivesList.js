/**
 * 档案列表
 */
import React, { PureComponent } from 'react'
import { Table, Button, Modal } from 'antd'
import moment from 'moment'
import Archives from '../Archives/Archives'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/company'

const mapStateToProps = state => {
    return {
        archives: state.company.archives,
        archivesDetail: state.company.archivesDetail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getArchivesDetail: actions('getArchivesDetail'),
            getArchivesList: actions('getArchivesList'),
        },
        dispatch,
    )
}

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class ArchivesList extends PureComponent {
    state = {
        visible: false,
    }
    componentDidMount() {
        const companyId = this.props.company_id
        if (companyId) {
            this.props.getArchivesList({
                companyId,
            })
        }
    }
    preview = keyId => {
        this.props.getArchivesDetail({
            id: keyId,
        })
        this.setState({
            visible: true,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    render() {
        const columns = [
            {
                title: '档案名称',
                dataIndex: 'shotName',
                key: 'shotName',
            },
            {
                title: '存档方式',
                dataIndex: 'type',
                key: 'type',
                render: type => <span>{type === '1' ? '手动存档' : '自动存档'}</span>,
            },
            {
                title: '存档人',
                dataIndex: 'creater',
                key: 'creater',
            },
            {
                title: '存档时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: createTime => <span>{moment(createTime).format('YYYY-MM-DD')}</span>,
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => (
                    <Button
                        size="small"
                        type="link"
                        onClick={() => {
                            this.preview(record.keyId)
                        }}
                    >
                        详情
                    </Button>
                ),
            },
        ]
        const { archives, archivesDetail } = this.props
        return (
            <div>
                <Table bordered dataSource={archives.resultList} columns={columns} />
                <Modal
                    title="档案详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1200}
                    footer={null}
                >
                    <Archives archivesDetail={archivesDetail.snapshot || {}} />
                </Modal>
            </div>
        )
    }
}
export default ArchivesList
