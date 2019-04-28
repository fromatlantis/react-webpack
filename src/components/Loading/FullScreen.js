import React, { PureComponent } from 'react'
import { Spin, Icon } from 'antd'
import styles from './Loading.module.css'
const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />
export default class FullScreen extends PureComponent {
    render() {
        return (
            <div className={styles.fullScreen}>
                <Spin indicator={antIcon} />
            </div>
        )
    }
}
