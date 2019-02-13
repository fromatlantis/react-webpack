import React, { PureComponent } from "react";
import styles from "./NotFound.module.css";
import logo from '../../assets/404.png'
export default class NotFound extends PureComponent {
    render() {
        return (
            <div className={styles.fullScreen}>
                <img src={logo} alt="404 not found"/>
                <h1>404 Page Not Found</h1>
            </div>
        );
    }
}
