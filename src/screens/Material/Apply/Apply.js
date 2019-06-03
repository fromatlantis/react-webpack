/**
 * 物料管理 ==> 物料申请
 */
import React, { PureComponent } from 'react'
import { Icon, Button, Card, Input, Row, Col } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Material.module.css'
import avatar from '../../../assets/avatar.png'

const { Meta } = Card

@connect(
    state => {
        return {
            MaterialList: state.materialManager.MaterialList, //物料列表
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialList: actions('getMaterialList'),
            },
            dispatch,
        )
    },
)
class Apply extends PureComponent {
    state = {
        noTitleKey: 'tool',
    }
    //生命周期
    componentDidMount = () => {
        //物料管理==>获取物料列表
        this.props.getMaterialList({ type: '工具类' })
    }

    onTabChange = (key, type) => {
        // console.log(key, type)
        this.setState({ [type]: key })
        if (key === 'tool') {
            this.props.getMaterialList({ type: '工具类' })
        } else {
            this.props.getMaterialList({ type: '一次性消耗品' })
        }
    }
    render() {
        const MaterialList = this.props.MaterialList
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
                <Row gutter={16}>
                    {MaterialList &&
                        MaterialList.map((item, i) => {
                            return (
                                <Col span={6}>
                                    <Link to={`/material/applySub/${item.id}`}>
                                        <Card
                                            key={i}
                                            hoverable
                                            style={{ width: 250, margin: '15px 0' }}
                                            cover={
                                                <img
                                                    style={{ width: 250, height: 150 }}
                                                    alt=""
                                                    src={item.image ? item.image : avatar}
                                                />
                                            }
                                        >
                                            <p className={styles.cartitle}>{item.name}</p>
                                            <p className={styles.cardStr}>
                                                <span>型号：{item.size}</span>
                                                <span>库存：{item.count}</span>
                                            </p>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })}
                </Row>
            ),
            disposable: (
                <Row gutter={16}>
                    {MaterialList &&
                        MaterialList.map((item, i) => {
                            return (
                                <Col span={6}>
                                    <Card
                                        key={-i}
                                        hoverable
                                        style={{ width: 250, margin: '15px 0' }}
                                        cover={
                                            <img
                                                style={{ width: 250, height: 150 }}
                                                alt=""
                                                src={item.image ? item.image : avatar}
                                            />
                                        }
                                    >
                                        <p className={styles.cartitle}>{item.name}</p>
                                        <p className={styles.cardStr}>
                                            <span>型号：{item.size}</span>
                                            <span>库存：{item.count}</span>
                                        </p>
                                    </Card>
                                </Col>
                            )
                        })}
                </Row>
            ),
        }
        return (
            <Card title="物料申请" bordered={false}>
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
            </Card>
        )
    }
}
export default Apply
