/**
 * 企服首页/企业详情==> News 新闻舆情
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, List, Skeleton } from 'antd'
import { Link, NavLink, Route } from 'react-router-dom'
import styles from '../CompanyDetails.module.css'

export default class News extends PureComponent {
    render() {
        const list = [
            {
                name: '雷军的金融打算盘：手握三张牌照依然亏损',
                str: '来源：新浪网',
                rightStr: '发布时间：2019-04-30',
            },
            {
                name: '雷军的金融打算盘：手握三张牌照依然亏损',
                str: '来源：新浪网',
                rightStr: '发布时间：2019-033-30',
            },
            {
                name: '雷军的金融打算盘：手握三张牌照依然亏损',
                str: '来源：新浪网',
                rightStr: '发布时间：2019-02-30',
            },
            {
                name: '雷军的金融打算盘：手握三张牌照依然亏损',
                str: '来源：新浪网',
                rightStr: '发布时间：2019-01-30',
            },
        ]
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="news"
                        title={
                            <div>
                                <span style={{ color: '#1890ff' }}>新闻舆情</span>
                                <span style={{ color: 'red' }}>（4）</span>
                            </div>
                        }
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                        // style={{ display: 'none' }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={item => (
                                <List.Item
                                    style={{ padding: '15px 100px 15px 30px' }}
                                    actions={[
                                        <NavLink exact to={`/companyDetails/newsDetails`}>
                                            details
                                        </NavLink>,
                                    ]}
                                >
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            title={
                                                <span className={styles.titleSty}>{item.name}</span>
                                            }
                                            description={item.str}
                                        />
                                        <div>{item.rightStr}</div>
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
