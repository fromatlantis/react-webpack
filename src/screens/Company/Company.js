import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/company'
import {
    Avatar,
    Alert,
    Button,
    Checkbox,
    Tag,
    Modal,
    Steps,
    message,
    Upload,
    Pagination,
} from 'antd'
import { IconFont } from 'components'
import SearchChip from './SearchChip'
import TransferModules from './TransferModules'
import ImportTable from './ImportTable'
import Export from './Export'
import styles from './Company.module.css'

const Step = Steps.Step
const CheckboxGroup = Checkbox.Group
const { confirm } = Modal

const steps = [
    {
        title: '上传文件',
        content: 'First-content',
        icon: <IconFont type="iconshangchuanwenjian" />,
    },
    {
        title: '预览',
        content: 'Second-content',
        icon: <IconFont type="iconyulan" />,
    },
]
const Dragger = Upload.Dragger

@connect(
    state => {
        return {
            company: state.company.company,
            directorList: state.company.directorList,
            companyList: state.company.companyList.map(item => ({
                id: item.companyId,
                name: item.name,
            })),
            importList: state.company.importList,
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                searchCompany: actions('searchCompany'),
                getDirectorList: actions('getDirectorList'),
                getCompanyList: actions('getCompanyList'),
                assignServiceStaff: actions('assignServiceStaff'),
                batchImport: actions('batchImport'),
                batchLoad: actions('batchLoad'),
                inviteCompany: actions('inviteCompany'), //邀请
            },
            dispatch,
        )
    },
)
class Home extends PureComponent {
    state = {
        batchAssign: false,
        assign: false,
        importList: false,
        current: 0,
        importResponse: [],
        companyId: null, //指派公司id
        params: {}, //查询参数
        column: 'name', //查询类型
        keyWord: '',
        pageSize: 10,
        pageNo: 1,
        allChecked: false,
        checkedList: [],
        indeterminate: true,
    }
    componentDidMount() {
        this.props.searchCompany({ pageNo: 1, pageSize: 10 })
    }
    search = params => {
        this.setState({
            params,
        })
        let { pageSize } = this.state
        if (params.keyWord) {
            this.props.searchCompany({ pageNo: 1, pageSize, ...params })
        } else {
            this.props.searchCompany({ pageNo: 1, pageSize })
        }
    }
    // 分页
    onPageChange = pageNo => {
        this.setState({
            allChecked: false,
            checkedList: [],
        })
        let { params, pageSize } = this.state
        this.props.searchCompany({
            ...params,
            pageNo,
            pageSize,
        })
    }
    onShowSizeChange = (_, pageSize) => {
        this.setState({
            allChecked: false,
            checkedList: [],
        })
        let { params } = this.state
        this.props.searchCompany({
            ...params,
            pageNo: 1,
            pageSize,
        })
    }
    batchAssign = () => {
        // this.props.getCompanyList()
        // this.props.getDirectorList()
        const { checkedList } = this.state
        if (checkedList.length === 0) {
            message.warning('请选择企业')
        } else {
            this.setState({
                batchAssign: true,
            })
        }
    }
    batchAssignOk = () => {
        this.batchTransferForm.validateFields((errors, values) => {
            if (!errors) {
                const [userId, userName] = values.person.split('-')
                const { checkedList } = this.state
                this.props.assignServiceStaff({
                    companyIds: checkedList.join(','),
                    userIds: userId,
                    userName: userName,
                    modelKeys: values.modelKeys.join(','),
                })
                this.setState({
                    batchAssign: false,
                })
            }
        })
    }
    batchAssignCancel = () => {
        this.setState({
            batchAssign: false,
        })
    }
    assign = companyId => {
        // this.props.getDirectorList(companyId)
        this.setState({
            assign: true,
            companyId: companyId,
        })
    }
    // 确认指派
    assignOk = () => {
        this.transferForm.validateFields((errors, values) => {
            if (!errors) {
                const [userId, userName] = values.person.split('-')
                const { companyId } = this.state
                this.props.assignServiceStaff({
                    companyIds: companyId,
                    userIds: userId,
                    userName: userName,
                    modelKeys: values.modelKeys.join(','),
                })
                this.setState({
                    assign: false,
                })
            }
        })
    }
    assignCancel = () => {
        this.setState({
            assign: false,
        })
    }
    importList = () => {
        this.setState({
            importList: true,
        })
    }
    importListOk = () => {
        this.setState({
            importList: false,
        })
    }
    importListCancel = () => {
        this.setState({
            importList: false,
        })
    }
    next() {
        const current = this.state.current + 1
        this.setState({ current })
    }

    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }
    toEdit = item => {
        sessionStorage.setItem('companyId', item.companyId)
        //sessionStorage.setItem('companyName', item.name)
        this.props.push('/newCompany/info')
    }
    // 选择
    onCheck = checkedList => {
        const { company } = this.props
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < company.list.length,
            allChecked: checkedList.length === company.list.length,
        })
    }
    renderItem = () => {
        const { company } = this.props
        return (company.list || []).map(item => {
            const qualification = item.companyLabels.filter(item => item.type === 'qualification')
            const industry = item.companyLabels.filter(item => item.type === 'industry')
            return (
                <div className={styles.itemCard} key={item.companyId}>
                    <Checkbox
                        value={item.companyId}
                        style={{ marginRight: '10px', alignSelf: 'center' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Avatar className={styles.avatar} src={item.logo} shape="square">
                                {item.name.substring(0, 4)}
                            </Avatar>
                            <div className={styles.levelChip}>
                                <div>实驻企业</div>
                                <div className={styles.level}>{item.companyLevel}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.intro}>
                        <div className={styles.title}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '22px',
                                }}
                            >
                                <span>{item.name}</span>
                            </div>
                            <div className={styles.toobar}>
                                <span
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.assign(item.companyId)
                                    }}
                                >
                                    <IconFont type="iconzhifeiji" />
                                    <span style={{ marginLeft: '5px' }}>指派</span>
                                </span>
                                <span
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.props.push(
                                            `/companyDetails/information/${item.companyId}/company`,
                                        )
                                    }}
                                >
                                    <IconFont type="icongengduo" />
                                    <span style={{ marginLeft: '5px' }}>详情</span>
                                </span>
                                <span
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.toEdit(item)
                                    }}
                                >
                                    <IconFont type="iconbianji" />
                                    <span style={{ marginLeft: '5px' }}>编辑</span>
                                </span>
                                <span
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        const { inviteCompany } = this.props
                                        confirm({
                                            title: '请确认是否邀请该企业？',
                                            okText: '继续',
                                            content: (
                                                <span>
                                                    <span style={{ color: '#F04134' }}>
                                                        邀请成功后，企业可登录进行信息录入，
                                                        但不会修改企服数据。
                                                    </span>
                                                    你还要继续吗？
                                                </span>
                                            ),
                                            onOk() {
                                                inviteCompany({ companyId: item.companyId })
                                            },
                                            onCancel() {
                                                // console.log('Cancel')
                                            },
                                        })
                                    }}
                                >
                                    <IconFont type="iconyaoqing" />
                                    <span style={{ marginLeft: '5px' }}>邀请</span>
                                </span>
                            </div>
                        </div>
                        <div>
                            {industry.map((item, index) => (
                                <Tag color="red" key={index}>
                                    {item.label}
                                </Tag>
                            ))}
                            {qualification.map((item, index) => (
                                <Tag color="blue" key={index}>
                                    {item.label}
                                </Tag>
                            ))}
                        </div>
                        <div className={styles.info}>
                            <div>
                                <p>
                                    <b>法人：</b>
                                    <span>{item.legalPersonName}</span>
                                </p>
                                <p>
                                    <b>邮箱：</b>
                                    <span>{item.email}</span>
                                </p>
                                <p>
                                    <b>公司类型：</b>
                                    <span>{item.companyOrgType}</span>
                                </p>
                                <p>
                                    <b>招商负责人：</b>
                                    <span>{item.commerceName}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <b>注册资本：</b>
                                    <span>{item.regCapital}</span>
                                </p>
                                <p>
                                    <b>电话：</b>
                                    <span>{item.phoneNumber}</span>
                                </p>
                                <p>
                                    <b>所属行业：</b>
                                    <span>{item.industry}</span>
                                </p>
                                <p>
                                    <b>企服负责人：</b>
                                    <span>{item.enterpriseName}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <b>成立时间：</b>
                                    <span>{item.establishTime}</span>
                                </p>
                                <p>
                                    <b>官网：</b>
                                    {item.websiteList && (
                                        <a
                                            href={`http://${item.websiteList}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {`http://${item.websiteList}`}
                                        </a>
                                    )}
                                </p>
                                <p>
                                    <b>企业地址：</b>
                                    <span>{item.regLocation}</span>
                                </p>
                            </div>
                            <ul className={styles.status}>
                                <Tag color="green">{item.regStatus}</Tag>
                                <p>
                                    {item.commerceName || item.enterpriseName ? (
                                        <Tag color="blue">已指派</Tag>
                                    ) : (
                                        <Tag color="red">未指派</Tag>
                                    )}
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        const uploadProps = {
            name: 'excelFile',
            multiple: false,
            action: '/houzai/enterprise/batchImport',
            onChange: info => {
                const status = info.file.status
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList)
                }
                if (status === 'done') {
                    message.success(`${info.file.name}上传成功`)
                    this.setState({
                        importResponse: info.file.response.data,
                    })
                } else if (status === 'error') {
                    message.error(`${info.file.name}上传失败`)
                }
            },
        }
        let { current, importResponse, allChecked } = this.state
        const { company, directorList, companyList } = this.props
        const chks = (company.list || []).map(item => item.companyId)
        return (
            <div className={styles.root}>
                <div className={styles.searchBox}>
                    <SearchChip onSearch={this.search} />
                    {/* <Search
                        addonBefore={selectBefore}
                        placeholder="请输入企业名称"
                        onSearch={this.search}
                        enterButton
                        size="large"
                    /> */}
                </div>
                <div className={styles.titleChip}>
                    <Alert
                        style={{ flex: 1 }}
                        message={`总计${company.totalCount || 0}个企业`}
                        type="info"
                        showIcon
                    />
                    <div className={styles.toolbar}>
                        <Button
                            type="primary"
                            onClick={() => {
                                // 设置companyId默认值，清除redux数据
                                sessionStorage.setItem('companyId', '000000')
                                this.props.push('newCompany/info')
                            }}
                        >
                            新增
                        </Button>
                        <Button type="primary" onClick={this.importList}>
                            导入
                        </Button>
                        <Button type="primary" onClick={this.batchAssign}>
                            批量指派
                        </Button>
                        <Export title="批量导出" ids={this.state.checkedList} />
                        <Export title="全部导出" />
                    </div>
                </div>
                <Checkbox
                    style={{ marginTop: '0.2rem' }}
                    checked={allChecked}
                    onChange={e => {
                        this.setState({
                            checkedList: e.target.checked ? chks : [],
                            allChecked: !this.state.allChecked,
                            indeterminate: false,
                        })
                    }}
                >
                    选择全部
                </Checkbox>
                <CheckboxGroup
                    style={{ width: '100%' }}
                    value={this.state.checkedList}
                    onChange={this.onCheck}
                >
                    {this.renderItem()}
                </CheckboxGroup>
                <div style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                        showQuickJumper
                        showSizeChanger
                        defaultCurrent={1}
                        total={company.totalCount}
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.onPageChange}
                    />
                </div>

                {/* <List dataSource={data} renderItem={this.renderItem} /> */}
                <Modal
                    title="批量指派"
                    visible={this.state.batchAssign}
                    onOk={this.batchAssignOk}
                    onCancel={this.batchAssignCancel}
                    bodyStyle={{ height: '390px' }}
                >
                    <div style={{ display: 'flex' }}>
                        {/* <TransferView
                            titles={['源列表', '目标列表']}
                            data={companyList}
                            ref="batchAssignCompany"
                        /> */}
                        <TransferModules
                            forwardedRef={ref => {
                                this.batchTransferForm = ref
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    title="指派"
                    width={560}
                    visible={this.state.assign}
                    onOk={this.assignOk}
                    onCancel={this.assignCancel}
                    bodyStyle={{ height: '390px' }}
                >
                    <TransferModules
                        forwardedRef={ref => {
                            this.transferForm = ref
                        }}
                    />
                </Modal>
                <Modal
                    title="导入"
                    visible={this.state.importList}
                    onOk={this.importListOk}
                    onCancel={this.importListCancel}
                    width={660}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            importList: false,
                                        })
                                        this.props.batchLoad(importResponse)
                                    }}
                                >
                                    完成
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    上一步
                                </Button>
                            )}
                        </div>
                    }
                >
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={item.icon} />
                        ))}
                    </Steps>
                    {current === 0 && (
                        <div className={styles.stepCard}>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <IconFont type="iconxls" />
                                </p>
                                <p className="ant-upload-text">将文件拖拽至此区域或点击上传文件</p>
                                <p className="ant-upload-hint">导入说明：文件必须为XLS或XLSX格式</p>
                            </Dragger>
                            <div style={{ padding: '20px', textAlign: 'right' }}>
                                没有模版？
                                <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190614/72fee9a0-c97d-4082-a889-0b575ebe376b-批量导入企业XLSX模板.xlsx">
                                    下载模版
                                </a>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <div className={styles.stepCard}>
                            <ImportTable dataSource={importResponse} />
                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}
export default Home
