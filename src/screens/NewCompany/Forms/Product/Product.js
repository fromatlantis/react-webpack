import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider } from 'antd'
import { UploadImg, FormView, SearchView } from 'components'
import logo from 'assets/hz.png'
import Toolbar from '../../Toolbar/Toolbar'
import styles from '../index.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/product'

const mapStateToProps = state => {
    return {
        product: state.product.product,
        detail: state.product.detail,
        searchParams: state.product.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getProductInfoList: actions('getProductInfoList'),
            queryProductInfoDetial: actions('queryProductInfoDetial'),
            increaseProductInfo: actions('increaseProductInfo'),
            changeProductInfo: actions('changeProductInfo'),
        },
        dispatch,
    )
}

const { TextArea } = Input

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Product extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount = () => {
        this.props.getProductInfoList()
    }
    newInfo = () => {
        this.setState({
            visible: true,
            isEdit: false,
        })
    }
    handleOk = () => {
        this.newForm.validateFields((errors, values) => {
            if (!errors) {
                const { isEdit } = this.state
                const { changeProductInfo, increaseProductInfo, detail } = this.props
                if (isEdit) {
                    // 编辑
                    changeProductInfo({ ...detail, ...values })
                } else {
                    // 新增
                    increaseProductInfo(values)
                }
                this.setState({
                    visible: false,
                })
            }
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderForm = () => {
        const items = [
            {
                label: '产品图片',
                field: 'icon',
                component: <UploadImg />,
            },
            {
                label: '产品名称',
                field: 'name',
                component: <Input />,
            },
            {
                label: '产品功能',
                field: 'classes',
                component: <TextArea />,
            },
            {
                label: '产品介绍',
                field: 'brief',
                component: <TextArea />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        //const FormView = formView({ items, data: {} })
        const { detail } = this.props
        const { isEdit } = this.state
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                data={isEdit ? detail : {}}
                saveBtn={false}
            />
        )
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                console.log(values)
                values.pageNo = 1
                this.props.getProductInfoList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
    }
    // 分页
    onChange = pageNo => {
        this.props.getProductInfoList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getProductInfoList({ pageNo: 1, pageSize })
    }
    // 编辑
    edit = keyId => {
        this.props.queryProductInfoDetial(keyId)
        this.setState({
            visible: true,
            isEdit: true,
        })
    }
    render() {
        const searchItems = [
            {
                label: '产品名称',
                field: 'name',
                component: <Input />,
            },
        ]
        const columns = [
            {
                title: '产品图片',
                dataIndex: 'icon',
                key: 'icon',
                render: icon => <img src={icon} style={{ width: 100 }} alt="" />,
            },
            {
                title: '产品名称',
                dataIndex: 'name',
                key: 'name',
                width: 200,
            },
            {
                title: '产品功能',
                dataIndex: 'classes',
                key: 'classes',
            },
            {
                title: '产品介绍',
                dataIndex: 'brief',
                key: 'brief',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.edit(record.keyId)
                        }}
                    >
                        编辑
                    </Button>
                ),
            },
        ]
        const { product, searchParams } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>主要产品</div>
                    <Toolbar />
                </div>
                <div className={styles.searchBox}>
                    <FormView
                        ref={form => {
                            this.form = form
                        }}
                        formItemLayout={{}}
                        items={searchItems}
                        data={searchParams}
                        layout="inline"
                        saveBtn={false}
                    />
                    <div className={styles.toobar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            type="primary"
                            onClick={this.search}
                            style={{ background: 'rgb(50,200,100)' }}
                        >
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新增
                        </Button>
                    </div>
                </div>
                <div className={styles.tableSty}>
                    <Table
                        dataSource={product.list}
                        columns={columns}
                        pagination={{
                            current: searchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: product.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
                        }}
                    />
                </div>
                <Modal
                    title="主要产品"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderForm()}
                </Modal>
            </div>
        )
    }
}
export default Product
