import React, { PureComponent } from 'react'
import { Alert, Button, Input, List, Tag } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

import styles from './Company.module.css'

import avatar from 'assets/hz.png'

const Search = Input.Search

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
]
@connect(
    state => ({}),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
            },
            dispatch,
        )
    },
)
class Home extends PureComponent {
    renderItem = () => {
        return (
            <div className={styles.itemCard}>
                <img src={avatar} alt="logo" />
                <div className={styles.intro}>
                    <p className={styles.title}>润江物业服务有限公司</p>
                    <Tag color="#108ee9">实驻企业</Tag>
                    <Tag color="#2db7f5">投资机构</Tag>
                    <Tag color="#2db7f5">高薪技术企业</Tag>
                    <Tag color="#2db7f5">香港企业港股</Tag>
                    <div className={styles.info}>
                        <div>
                            <p>
                                <b>法人：</b>
                                <span>婉如</span>
                            </p>
                            <p>
                                <b>邮箱：</b>
                                <span>123456@qq.com</span>
                            </p>
                            <p>
                                <b>公司类型：</b>
                                <span>123456@qq.com</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>注册资本：</b>
                                <span>5000万元人民币</span>
                            </p>
                            <p>
                                <b>电话：</b>
                                <span>010-123456</span>
                            </p>
                            <p>
                                <b>所属行业：</b>
                                <span>123456@qq.com</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>成立时间：</b>
                                <span>2019-10-23</span>
                            </p>
                            <p>
                                <b>官网：</b>
                                <a href="http://www.hzpark.com">http://www.hzpark.com</a>
                            </p>
                            <p>
                                <b>企业地址：</b>
                                <span>123456@qq.com</span>
                            </p>
                        </div>
                        <ul className={styles.status}>
                            <Tag color="green">在线</Tag>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.searchBox}>
                    <Search
                        placeholder="请输入企业名称"
                        onSearch={value => console.log(value)}
                        enterButton
                        size="large"
                    />
                </div>
                <div className={styles.titleChip}>
                    <Alert message="总计25个企业" type="info" showIcon />
                    <div className={styles.toolbar}>
                        <Button>批量指派</Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.props.push('newCompany/info')
                            }}
                        >
                            新增
                        </Button>
                        <Button>导入</Button>
                    </div>
                </div>

                <List dataSource={data} renderItem={this.renderItem} />
            </div>
        )
    }
}
export default Home
