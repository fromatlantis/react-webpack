import React, { PureComponent } from 'react'
import styles from './NotFound.module.css'
import logo from '../../assets/404.png'
export default class NotFound extends PureComponent {
    render() {
        return (
            <div className={styles.fullScreen}>
                <img src={logo} alt="404 not found" />
                <p className={styles.des}>抱歉，您访问的页面不存在!~</p>
            </div>
        )
    }
}
