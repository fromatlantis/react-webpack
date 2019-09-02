import React, { PureComponent } from 'react'
import styles from './Exception.module.css'
import noauth from '../../assets/403.png'
import notfound from '../../assets/404.png'
import servererror from '../../assets/500.png'
export default class Exception extends PureComponent {
    render() {
        const status = {
            403: {
                img: noauth,
                des: '抱歉，您访问的页面不存在!~',
            },
            404: {
                img: notfound,
                des: '抱歉，您访问的页面不存在!~',
            },
            500: {
                img: servererror,
                des: '抱歉，服务器暂时无法访问!~',
            },
        }
        const { statusCode } = this.props
        const item = status[statusCode]
        return (
            <div className={styles.fullScreen}>
                <img src={item.img} alt="404 not found" />
                <p className={styles.des}>{item.des}</p>
            </div>
        )
    }
}
