import React, { Component } from 'react'
import styles from './Login.module.css'
import login from 'assets/login.png'
import LoginForm from './Connect'

export default class Login extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src={login} alt="启迪智慧" />
                </div>
                <div className={styles.loginCard}>
                    <LoginForm />
                </div>
            </div>
        )
    }
}
