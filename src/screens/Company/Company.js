import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { actions } from 'reduxDir/company'
import moment from 'moment'
import {
    Avatar,
    Alert,
    Button,
    Checkbox,
    Input,
    Select,
    Tag,
    Modal,
    Divider,
    Steps,
    message,
    Radio,
    Upload,
    Pagination,
} from 'antd'
import { IconFont, FormView } from 'components'
import SearchChip from './SearchChip'
import TransferView from './TransferView'
import ImportTable from './ImportTable'
import styles from './Company.module.css'

import avatar from 'assets/hz.png'

const Search = Input.Search
const Step = Steps.Step
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

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
        let { column, pageSize, pageNo } = this.state
        // this.setState({
        //     keyWord,
        // })
        if (params.keyWord) {
            this.props.searchCompany({ pageNo: 1, pageSize, ...params })
        } else {
            this.props.searchCompany({ pageNo: 1, pageSize })
        }
    }
    // 分页
    onPageChange = pageNo => {
        let { keyWord, column, pageSize } = this.state
        let params = { pageNo, pageSize }
        if (keyWord) params = { ...params, keyWord }
        this.props.searchCompany(params)
    }
    onShowSizeChange = (_, pageSize) => {
        let { keyWord, column } = this.state
        let params = { pageNo: 1, pageSize }
        if (keyWord) params = { ...params, keyWord }
        this.props.searchCompany(params)
    }
    batchAssign = () => {
        this.props.getCompanyList()
        this.props.getDirectorList()
        this.setState({
            batchAssign: true,
        })
    }
    batchAssignOk = () => {
        const companyIds = this.refs.batchAssignCompany.state.targetKeys
        const { targetKeys } = this.refs.batchAssignPerson.state
        const { directorList } = this.props
        this.props.assignServiceStaff({
            companyIds: companyIds,
            userIds: targetKeys,
            userNames: directorList
                .filter(item => targetKeys.includes(item.id))
                .map(item => item.name),
        })
        this.setState({
            batchAssign: false,
        })
    }
    batchAssignCancel = () => {
        this.setState({
            batchAssign: false,
        })
    }
    assign = companyId => {
        this.props.getDirectorList(companyId)
        this.setState({
            assign: true,
            companyId: companyId,
        })
    }
    // 确认指派
    assignOk = () => {
        const { targetKeys } = this.refs.assign.state
        const { companyId } = this.state
        const { directorList } = this.props
        this.props.assignServiceStaff({
            companyIds: [companyId],
            userIds: targetKeys,
            userNames: directorList
                .filter(item => targetKeys.includes(item.id))
                .map(item => item.name),
        })
        this.setState({
            assign: false,
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
        sessionStorage.setItem('companyId', item.company_id)
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
            return (
                <div className={styles.itemCard} key={item.company_id}>
                    <Checkbox value={item.company_id} style={{ position: 'absolute' }} />
                    <Avatar className={styles.avatar} src={item.logo} shape="square" size={100} />
                    <div className={styles.intro}>
                        <div className={styles.title}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>{item.name}</span>
                                <Tag color="orange">实驻企业</Tag>
                            </div>
                            <div className={styles.toobar}>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.assign(item.company_id)
                                    }}
                                >
                                    <IconFont type="iconicon_zhipai" />
                                </Button>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.props.push(
                                            `/companyDetails/information/${
                                                item.company_id
                                            }/company`,
                                        )
                                    }}
                                >
                                    <IconFont type="icondetails" />
                                </Button>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        this.toEdit(item)
                                    }}
                                >
                                    <IconFont type="iconbianji" />
                                </Button>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div>
                                <p>
                                    <b>法人：</b>
                                    <span>{item.legal_person_name}</span>
                                </p>
                                <p>
                                    <b>邮箱：</b>
                                    <span>{item.email}</span>
                                </p>
                                <p>
                                    <b>公司类型：</b>
                                    <span>{item.company_org_type}</span>
                                </p>
                                <p>
                                    <b>企服负责人：</b>
                                    <span>{item.director_name}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <b>注册资本：</b>
                                    <span>{item.reg_capital}</span>
                                </p>
                                <p>
                                    <b>电话：</b>
                                    <span>{item.phone_number}</span>
                                </p>
                                <p>
                                    <b>所属行业：</b>
                                    <span>{item.industry}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <b>成立时间：</b>
                                    <span>
                                        {moment(parseInt(item.estiblish_time)).format('YYYY-MM-DD')}
                                    </span>
                                </p>
                                <p>
                                    <b>官网：</b>
                                    {item.website_list && (
                                        <a
                                            href={`http://${item.website_list}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {`http://${item.website_list}`}
                                        </a>
                                    )}
                                </p>
                                <p>
                                    <b>企业地址：</b>
                                    <span>{item.reg_location}</span>
                                </p>
                            </div>
                            <ul className={styles.status}>
                                <Tag color="green">{item.reg_status}</Tag>
                                {item.director_name && <Tag color="volcano">已指派</Tag>}
                                {!item.director_name && <Tag color="blue">未指派</Tag>}
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
        const chks = (company.list || []).map(item => item.company_id)
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
                    <Alert message={`总计${company.totalCount || 0}个企业`} type="info" showIcon />
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
                        <Button type="primary" onClick={this.batchAssign}>
                            批量导出
                        </Button>
                        <Button type="primary" onClick={this.batchAssign}>
                            全部导出
                        </Button>
                    </div>
                </div>
                <Checkbox
                    style={{ marginTop: '10px' }}
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
                    width={1000}
                    title="批量指派企服人员"
                    visible={this.state.batchAssign}
                    onOk={this.batchAssignOk}
                    onCancel={this.batchAssignCancel}
                    //footer={null}
                >
                    <div style={{ display: 'flex' }}>
                        <TransferView
                            titles={['源列表', '目标列表']}
                            data={companyList}
                            ref="batchAssignCompany"
                        />
                        <div style={{ marginLeft: '20px', flex: 1 }}>
                            <FormView
                                ref={form => {
                                    this.form = form
                                }}
                                formItemLayout={{ labelCol: { span: 8 }, wrapperCol: { span: 13 } }}
                                items={[
                                    {
                                        label: '招商负责人',
                                        field: 'years',
                                        component: <Select />,
                                    },
                                    {
                                        label: '招商服务模块',
                                        field: 'updateTime',
                                        component: <Select />,
                                    },
                                ]}
                                saveBtn={false}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="指派企服人员"
                    visible={this.state.assign}
                    onOk={this.assignOk}
                    onCancel={this.assignCancel}
                    //footer={null}
                >
                    <TransferView
                        titles={['选择人员', '已选人员']}
                        data={directorList}
                        ref="assign"
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
