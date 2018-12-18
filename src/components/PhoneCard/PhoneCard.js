import React, { PureComponent } from 'react'
import styles from './PhoneCard.module.css'

export default class PhoneCard extends PureComponent {
    render() {
        return (
            <div className={`${styles.root} ${styles.ios}`}>
                {this.props.children}
            </div>
        )
    }
}
