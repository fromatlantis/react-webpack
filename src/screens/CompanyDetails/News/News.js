/**
 * 企服首页（企服管理）/企业详情==> News 新闻舆情
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, List, Skeleton, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/companyDetails'
import styles from '../CompanyDetails.module.css'

@connect(
    state => {
        return {
            RecentNews: state.companyDetails.RecentNews, //企业动态（新闻）
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getRecentNews: actions('getRecentNews'),
            },
            dispatch,
        )
    },
)
class News extends PureComponent {
    state = {
        //企业id
        company_id: '',
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        if (company_id) {
            this.setState({ company_id })
            this.props.getRecentNews({ companyId: company_id, limit: 5 })
        }
    }

    render() {
        const { company_id } = this.state
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="news"
                        title={
                            <div>
                                <span style={{ color: '#1890ff' }}>新闻舆情</span>
                                <span style={{ color: 'red' }}>
                                    （{this.props.RecentNews.totalCount}）
                                </span>
                            </div>
                        }
                        extra={
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getRecentNews({ companyId: company_id })
                                }}
                            >
                                展开更多>>
                            </Button>
                        }
                        className={styles.cardSty}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.RecentNews.resultList}
                            renderItem={item => (
                                <List.Item
                                    style={{ padding: '15px 100px 15px 30px' }}
                                    actions={[
                                        <NavLink
                                            exact
                                            to={`/companyDetails/newsDetails/${company_id}/details`}
                                        >
                                            详情
                                        </NavLink>,
                                    ]}
                                >
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            title={
                                                <span className={styles.titleSty}>
                                                    {item.title}
                                                </span>
                                            }
                                            description={item.website}
                                        />
                                        <div>发布时间：{item.time}</div>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default News
