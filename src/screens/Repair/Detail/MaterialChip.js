import React, { PureComponent, Fragment } from 'react'

import { Button, Input, Icon, InputNumber, Table } from 'antd'
import { FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'
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

const mapStateToProps = state => {
    console.log(state.repair.materials)
    return {
        materials: state.repair.materials,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addMaterial: actions('addMaterial'),
            removeMaterial: actions('removeMaterial'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class MaterialChip extends PureComponent {
    addMaterial = () => {
        const { form } = this.wrappedForm.props
        //console.log(form.getFieldsValue())
        this.props.addMaterial(form.getFieldsValue())
    }
    remove = index => {
        this.props.removeMaterial(index)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.materials !== nextProps.materials) {
            this.tiggerChange(nextProps.materials)
        }
    }

    tiggerChange = materials => {
        const { onChange } = this.props
        if (onChange) {
            onChange(materials)
        }
    }
    render() {
        const items = [
            {
                label: '',
                field: 'name',
                component: <Input />,
            },
            {
                label: '数量',
                field: 'count',
                component: <InputNumber min={1} />,
            },
            {
                label: '单价',
                field: 'price',
                component: <InputNumber min={1} />,
            },
        ]
        const columns = [
            {
                title: '物料',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '数量',
                dataIndex: 'count',
                key: 'count',
            },
            {
                title: '单价',
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
