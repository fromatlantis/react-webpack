/**
 * 企服首页/企业详情==> Advice 改进建议
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import styles from '../CompanyDetails.module.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../redux/companyDetails'

@connect(
    state => {
        return {
            suggestionList: state.companyDetails.suggestionList, //指定企业投资图谱
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                getSuggestionList: actions('getSuggestionList'),
            },
            dispatch,
        )
    },
)
class Advice extends PureComponent {
    componentDidMount() {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        if (company_id) {
            this.props.getSuggestionList(company_id)
        }
    }
    render() {
        const { suggestionList } = this.props
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="advice"
                        title={<span style={{ color: '#1890ff' }}>改进建议</span>}
                        // extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            // pagination={false} //分页器
                            columns={[
                                {
                                    title: '序号',
                                    dataIndex: 'key',
                                    key: 'key',
                                    align: 'center',
                                    render: (text, record, index) => <span>{index + 1}</span>,
                                },
                                {
                                    title: '提出人',
                                    dataIndex: 'submitterName',
                                    key: 'submitterName',
                                    align: 'center',
                                },
                                {
                                    title: '提出时间',
                                    dataIndex: 'createTime',
                                    key: 'createTime',
                                    align: 'center',
                                },
                                {
                                    title: '建议内容',
                                    dataIndex: 'content',
                                    key: 'content',
                                    align: 'center',
                                },
                            ]}
                            dataSource={suggestionList}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default Advice
