import React, { PureComponent } from 'react'
import { Card, Input, Form } from 'antd'

import { FormView } from 'components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../redux/newCompany'

const { TextArea } = Input

class Suggest extends PureComponent {
    search = () => {
        alert('11')
    }
    submit = values => {
        values.companyId = sessionStorage.getItem('companyId')
        this.props.increaseSuggestion(values)
    }
    render() {
        const items = [
            {
                label: '改进建议',
                field: 'content',
                rules: [
                    {
                        required: true,
                        message: '请填写改进建议',
                    },
                ],
                component: <TextArea autosize={{ minRows: 6 }} />,
            },
        ]
        return (
            <Card title="改进建议" bordered={false}>
                <FormView items={items} onSubmit={this.submit} />
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
            increaseSuggestion: actions('increaseSuggestion'),
        },
        dispatch,
    )
}
export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Suggest),
)
