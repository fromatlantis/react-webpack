import React, { PureComponent } from 'react'
import { Card, Input, Form } from 'antd'
import { FormView } from 'components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../redux/newCompany'

const { TextArea } = Input

class Other extends PureComponent {
    search = () => {
        alert('11')
    }
    submit = values => {
        values.companyId = sessionStorage.getItem('companyId')
        this.props.increaseOtherInfo(values)
    }
    render() {
        const items = [
            {
                label: '其他信息',
                field: 'content',
                rules: [
                    {
                        required: true,
                        message: '请填写其他信息',
                    },
                ],
                component: <TextArea autosize={{ minRows: 6 }} />,
            },
        ]
        return (
            <Card title="其他信息" bordered={false}>
                <FormView onSubmit={this.submit} items={items} />
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            increaseOtherInfo: actions('increaseOtherInfo'),
        },
        dispatch,
    )
}
export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Other),
)
