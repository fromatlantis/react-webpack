import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import styles from './Footer.module.css'
export default class Footer extends PureComponent {
    render() {
        return (
            <Layout.Footer className={styles.footer}>
                copyright©2018 - 2022年 启迪智慧创新（北京）科技有限公司 All Rights Reserved |
                Powered by 厚载园区运营平台
            </Layout.Footer>
        )
    }
}
