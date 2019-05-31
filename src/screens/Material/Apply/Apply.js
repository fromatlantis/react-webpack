/**
 * 物料管理 ==> 物料申请
 */
import React, { PureComponent } from 'react'
import { Icon, Button, Card, Input, Avatar, Divider } from 'antd'
import { FormView } from 'components'

import styles from '../Material.module.css'
import avatar from '../../../assets/avatar.png'

const { Meta } = Card

export default class Apply extends PureComponent {
    state = {
        noTitleKey: 'tool',
    }

    onTabChange = (key, type) => {
        console.log(key, type)
        this.setState({ [type]: key })
    }
    render() {
        const tabListNoTitle = [
            {
                key: 'tool',
                tab: '工具类',
            },
            {
                key: 'disposable',
                tab: '一次性消耗品',
            },
        ]
        const contentListNoTitle = {
            tool: (
                <div>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img style={{ width: 300, height: 150 }} alt="" src={avatar} />}
                    >
                        <p className={styles.cartitle}>锤子</p>
                        <p className={styles.cardStr}>
                            <span>型号：uei345768</span>
                            <span>库存：25</span>
                        </p>
                    </Card>
                </div>
            ),
            disposable: <p>一次性消耗品</p>,
        }
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey')
                    }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        )
    }
}
