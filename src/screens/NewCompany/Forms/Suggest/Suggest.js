import React, { PureComponent } from 'react'
import { Card, Input, Form } from 'antd'
import { FormView } from 'components'
import styles from '../index.module.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../redux/newCompany'
import Toolbar from '../../Toolbar/Toolbar'

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
                label: '建议内容',
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
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>需求和建议</div>
                </div>
                <div className={styles.tableSty}>
                    <FormView items={items} onSubmit={this.submit} />
                </div>
            </div>
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
