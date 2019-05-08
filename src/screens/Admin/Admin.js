import React, { PureComponent, Fragment } from 'react'
import { Input, List, Tag } from 'antd'

import styles from './Admin.module.css'

import avatar from 'assets/avatar.png'

const Search = Input.Search

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
]

export default class Home extends PureComponent {
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
                </div>
            </div>
        )
    }
    render() {
        return (
            <Fragment>
                <div className={styles.searchBox}>
                    <Search
                        placeholder="请输入企业名称"
                        onSearch={value => console.log(value)}
                        enterButton
                        size="large"
                    />
                </div>
                <List dataSource={data} renderItem={this.renderItem} />
            </Fragment>
        )
    }
}
