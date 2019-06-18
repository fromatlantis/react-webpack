import React, { PureComponent, Fragment } from 'react'

import { Button, Select, InputNumber, Table, message } from 'antd'
import { FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/feedback'
import { actions as materialManagerActions } from 'reduxDir/materialManager'

const { Option } = Select
const mapStateToProps = state => {
    return {
        materials: state.feedback.materials,
        MaterialList: state.materialManager.MaterialList, //物料列表
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addMaterial: actions('addMaterial'),
            removeMaterial: actions('removeMaterial'),
            getMaterialList: materialManagerActions('getMaterialList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class MaterialChip extends PureComponent {
    componentDidMount() {
        this.props.getMaterialList()
    }
    addMaterial = () => {
        const { form } = this.wrappedForm.props
        const { name, count, price } = form.getFieldsValue()
        if (!name) {
            message.error('请选择物料')
        } else if (!count) {
            message.error('请填写数量')
        } else if (!price) {
            message.error('请填写价格')
        } else {
            this.props.addMaterial(form.getFieldsValue())
        }
    }
    remove = index => {
        this.props.removeMaterial(index)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.materials !== nextProps.materials) {
            this.tiggerChange(nextProps.materials)
        }
    }
    changeMaterial = value => {
        if (value) {
            const arr = value.split('-')
            if (arr.length === 2) {
                const name = arr[0]
                const size = arr[1]
                const material = this.props.MaterialList.filter(
                    item => item.name === name && item.size === size,
                )
                const { form } = this.wrappedForm.props
                form.setFieldsValue({
                    count: 1,
                    price: material[0].price,
                })
            }
        }
    }
    tiggerChange = materials => {
        const { onChange } = this.props
        if (onChange) {
            onChange(materials)
        }
    }
    render() {
        const { MaterialList } = this.props
        const items = [
            {
                label: '',
                field: 'name',
                component: (
                    <Select
                        style={{ width: 160 }}
                        showSearch
                        placeholder="请选择物料"
                        onChange={this.changeMaterial}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {(MaterialList || []).map((item, index) => (
                            <Option value={`${item.name}-${item.size}`} key={index}>{`${
                                item.name
                            }-${item.size}`}</Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '数量',
                field: 'count',
                component: <InputNumber min={1} />,
            },
            {
                label: '单价（元）',
                field: 'price',
                component: <InputNumber min={0} />,
            },
        ]
        const columns = [
            {
                title: '物料',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '数量（个）',
                dataIndex: 'count',
                key: 'count',
            },
            {
                title: '单价（元）',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: (_, __, index) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.remove(index)
                        }}
                    >
                        删除
                    </Button>
                ),
            },
        ]
        return (
            <Fragment>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <FormView
                        wrappedComponentRef={ref => {
                            this.wrappedForm = ref
                        }}
                        items={items}
                        layout="inline"
                        formItemLayout={{}}
                        saveBtn={false}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon="plus"
                        size="small"
                        onClick={this.addMaterial}
                    />
                </div>
                <Table dataSource={this.props.materials} columns={columns} pagination={false} />
            </Fragment>
        )
    }
}
export default MaterialChip
